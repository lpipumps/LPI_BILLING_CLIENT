export const savecustomer=async(customerDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savecustomer`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerDetails)
    });
    return response;
    };
    export const fetchcustomer = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchcustomer`);
        return response;
      };
      export const updateCustomer = async (consignee_name, updatedDetails) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/updatecustomer/${consignee_name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDetails)
        });
        return response;
    };
      export const deleteCustomer=async(consignee_name)=>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/deletecustomer/${consignee_name}`, {
            method: 'DELETE',
          });
          return response;
    }