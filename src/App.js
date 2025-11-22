import logo from './logo.svg';
import './App.css';
import Home from './Home/Home';
import Invoice from './Invoice/Invoice';
import Customer from './Customer/Customer.js'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Casting from './Casting/Casting.js';
import Einvoice from './Einvoicemain/Einvoice/Einvoice.js';
import InvoiceDisplay from './InvoiceDisplay/InvoiceDisplay.js';
import CastingDisplay from './CastingDisplay/CastingDisplay.js';
import CustomerDisplay from './CustomerDisplay/CustomerDisplay.js';
import Dashboard from './Dashboard/Dashboard.js';
import Settings from './Settings/Settings.js';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path="/customers" element={<Customer />} />
      <Route path="/casting" element={<Casting />} />
      <Route path="/invoices" element={<InvoiceDisplay/>}/>
      <Route path='/castingdisplay' element={<CastingDisplay/>}/>
      <Route path='/customerdisplay' element={<CustomerDisplay/>}/>
      <Route path='/settings' element={<Settings/>}/>
      </Routes>
      
      </Router>
    </div>
  );
}

export default App;
