import React, { useState, useEffect } from 'react';
import { fetchbilldetails } from '../services/bill';
import Navbar from '../Navbar/Navbar';
import '../Dashboard/Dashboard.css';
import { Select, MenuItem } from '@mui/material';

function Dashboard() {
  const [billDetails, setbillDetails] = useState([]);
  const [overall, setOverall] = useState({});
  const [currentFY, setCurrentFY] = useState({});
  const [previousFY, setPreviousFY] = useState({});
  const [monthlySales, setMonthlySales] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableYears, setAvailableYears] = useState([]); // added for year dropdown
  const [selectedYear, setSelectedYear] = useState('');

  const getFinancialYear = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    return d.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const isCurrentFY = (fy) => {
    const now = new Date();
    const year = now.getFullYear();
    const current = now.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
    return fy === current;
  };

  function parseCustomDate(str) {
  const [datePart, timePart] = str.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}
const getCustomYearRange = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const fyStart = new Date(year, 9, 16); // Oct = 9 (0-indexed)
    if (d >= fyStart) {
      return `${year}-${year + 1}`; // current year onwards
    } else {
      return `${year - 1}-${year}`; // before Oct 16 → previous FY
    }
  };

  const getCurrentCustomYearRange = () => {
    const today = new Date();
    return getCustomYearRange(today);
  };

  useEffect(() => {
    const fetchbill = async () => {
      try {
        const response = await fetchbilldetails();
        if (!response) throw new Error('Failed to fetch data');
        const data = await response.json();
        const bills = data.Bill;

        let overallStats = { };
        let currentFYStats = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
        let previousFYStats = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
        let monthly = {};
        let monthlyDateMap = {};

        bills.forEach(bill => {
          const date = parseCustomDate(bill.invoice_date);
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          const fy = getFinancialYear(date);
          const fyd = getCustomYearRange(date);
          const key = `${month} ${year}`;
          const keyDate = new Date(year, date.getMonth(), 1); // First day of that month

          const beforeTax = parseFloat(bill.total_before_tax) || 0;
          const total = parseFloat(bill.grand_total) || 0;
          const weight = parseFloat(bill.totalweight) || 0;
          const gst = total - beforeTax;
          if (!overallStats[fyd]) {
            overallStats[fyd] = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
          }

          // Overall
          overallStats[fyd].total += total;
          overallStats[fyd].beforeTax += beforeTax;
          overallStats[fyd].gst += gst;
          overallStats[fyd].weight += weight;
          
          // FY Check
          if (isCurrentFY(fy)) {
            currentFYStats.total += total;
            currentFYStats.beforeTax += beforeTax;
            currentFYStats.gst += gst;
            currentFYStats.weight += weight;
          } else {
            previousFYStats.total += total;
            previousFYStats.beforeTax += beforeTax;
            previousFYStats.gst += gst;
            previousFYStats.weight += weight;
          }

          // Monthly
          if (!monthly[key]) {
            monthly[key] = { total: 0, beforeTax: 0, gst: 0, weight: 0 };
            monthlyDateMap[key] = keyDate;
          }

          monthly[key].total += total;
          monthly[key].beforeTax += beforeTax;
          monthly[key].gst += gst;
          monthly[key].weight += weight;
        });

        // Sort by date (descending) and get last 6 months
        const monthKeys = Object.keys(monthlyDateMap)
          .sort((a, b) => monthlyDateMap[b] - monthlyDateMap[a])
          .slice(0, 6);

        const today = new Date();
        const defaultMonth = today.toLocaleString('default', { month: 'short' }) + ' ' + today.getFullYear();
        const fallbackMonth = monthKeys.includes(defaultMonth) ? defaultMonth : monthKeys[0];

        
        setCurrentFY(currentFYStats);
        setPreviousFY(previousFYStats);
        setMonthlySales(monthly);
        setAvailableMonths(monthKeys);
        setSelectedMonth(fallbackMonth);
        const years = Object.keys(overallStats).sort().reverse();
        const currentYear = getCurrentCustomYearRange();
        const fallbackYear = years.includes(currentYear) ? currentYear : years[0];
        setAvailableYears(years);
        setSelectedYear(fallbackYear);
        setOverall(overallStats);

      } catch (error) {
        console.log(error.message);
      }
    };

    fetchbill();
  }, []);

  return (
    <div className='dashboard_container'>
      <div>
        <Navbar />
      </div>
      <div className="dashboard">
        <div><h3>Overall Sales</h3>
        <div style={{ marginBottom: '1rem' }}>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            displayEmpty
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
        
        {selectedYear && overall[selectedYear] && (
          <div className="analytics-section">
            <p>Sales Without Tax: ₹{overall[selectedYear].beforeTax.toFixed(2)}</p>
            <p>Sales With Tax: ₹{overall[selectedYear].total.toFixed(2)}</p>
            <p>Total GST: ₹{overall[selectedYear].gst.toFixed(2)}</p>
            <p>Total Weight: {overall[selectedYear].weight.toFixed(2)} Kgs</p>
          </div>
        )}
        </div>

        <h3>Current Financial Year</h3>
        <div className="analytics-section">
        <p>Sales Without Tax: ₹{currentFY.beforeTax?.toFixed(2)}</p>
        <p>Sales With Tax: ₹{currentFY.total?.toFixed(2)}</p>
        <p>Total GST: ₹{currentFY.gst?.toFixed(2)}</p>
        <p>Total Weight: {currentFY.weight?.toFixed(2)} Kgs</p></div>

        <h3>Previous Financial Year</h3>
        <div className="analytics-section">
        <p>Sales Without Tax: ₹{previousFY.beforeTax?.toFixed(2)}</p>
        <p>Sales With Tax: ₹{previousFY.total?.toFixed(2)}</p>
        <p>Total GST: ₹{previousFY.gst?.toFixed(2)}</p>
        <p>Total Weight: {previousFY.weight?.toFixed(2)} Kgs</p></div>

        <h3>Monthly Sales</h3>
        <div style={{ marginBottom: '1rem' }}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            displayEmpty
          >
            {availableMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </div>

        {selectedMonth && monthlySales[selectedMonth] && (
          <div>
            <strong>{selectedMonth}</strong>
            <div className="analytics-section">
            <p>Without Tax: ₹{monthlySales[selectedMonth].beforeTax.toFixed(2)}</p>
            <p>With Tax: ₹{monthlySales[selectedMonth].total.toFixed(2)}</p>
            <p>GST: ₹{monthlySales[selectedMonth].gst.toFixed(2)}</p>
            <p>Weight: {monthlySales[selectedMonth].weight.toFixed(2)} Kgs</p></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
