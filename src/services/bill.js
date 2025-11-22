export const fetchgenInvoiceNumber=async()=>{
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    return await fetch (`${process.env.REACT_APP_API_URL}/lgc/generate-invoice-number`);
};
export const fetchgenBillNumber=async()=>{
    console.log("API URL:", process.env.REACT_APP_API_URL);
    
    return await fetch (`${process.env.REACT_APP_API_URL}/lgc/billnumber`);
};


export const addnewbill=async(billDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savebill`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billDetails)
    });
    return response;

    };
    export const fetchbilldetails = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchbill`);
        return response;
      };
      export const updateBill = async (invoice_no, updatedBill) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/updatebill/${invoice_no}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBill),
        });
        return response;
    };
    
export const deleteBill=async(invoice_no)=>{
     const encodedInvoiceNo = encodeURIComponent(invoice_no);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/deletebill/${encodedInvoiceNo}`, {
        method: 'DELETE',
      });
      return response;
}
// export const generateInvoiceNumber = (latestInvoice) => {
//     const today = new Date();
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1; // January is 0

//     let fyStartYear, fyEndYear;

//     // If it's before April, financial year is previousYear - currentYear
//     if (currentMonth < 4) {
//         fyStartYear = currentYear - 1;
//         fyEndYear = currentYear;
//     } else {
//         fyStartYear = currentYear;
//         fyEndYear = currentYear + 1;
//     }

//     // Format financial year as (YY-YY)
//     const formattedYear = `${fyStartYear.toString().slice(-2)}-${fyEndYear.toString().slice(-2)}`;

//     let newBillNo = "001"; // Default first invoice

//     if (latestInvoice) {
//         const latestInvoiceNo = latestInvoice; // e.g., "LGC(24-25)0001"
//         const latestYear = latestInvoiceNo.match(/\d{2}-\d{2}/)[0]; // Extract "24-25"
//         const latestSerialNo = parseInt(latestInvoiceNo.slice(-3)); // Get "0001" as number

//         // If same financial year, increment the bill number
//         if (latestYear === formattedYear) {
//             newBillNo = (latestSerialNo).toString().padStart(3, "0");
//         }
//     }

//     // Generate new invoice number
//     const newInvoiceNo = `LGC(${formattedYear})${newBillNo}`;

//     return newInvoiceNo;
// };
