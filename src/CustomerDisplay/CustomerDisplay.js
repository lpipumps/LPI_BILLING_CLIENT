import React, { useState, useEffect } from 'react'
import '../CustomerDisplay/CustomerDisplay.css'
import { deleteCustomer, fetchcustomer, updateCustomer } from '../services/Customer';
import Navbar from '../Navbar/Navbar';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, DialogActions, DialogTitle, DialogContent, Typography, IconButton, Pagination, Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete, Create } from '@mui/icons-material';



function CustomerDisplay() {
  const [customerDetails, setcustomerDetails] = useState([]);
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deletecustomer, setdeletecustomer] = useState();
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userInputIndex, setUserInputIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [OriginalCustomer,setOriginalCustomer]=useState([]);
  const [IsSavedEnabled,setIsSavedEnabled]=useState(false);
  
  const itemsPerPage = 10;

  const history = useNavigate();
  useEffect(() => {

    const fetchCustomerDetails = async () => {
      try {
        const response = await fetchcustomer();
        if (!response) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log("fetch customer details", data.customers);
        setcustomerDetails(data.customers);
        setFilteredCustomerDetails(data.customers)
        console.log("console", data.customers);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCustomerDetails();
  }, []);
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredCustomerDetails(customerDetails);
    } else {
      const filteredData = customerDetails.filter((customer) =>
        customer.consignee_name.toLowerCase().includes(query)
      );
      setFilteredCustomerDetails(filteredData);
    }
  };
  const handleDeleteClick = (index, customer) => {
    setSelectedIndex(index); // Store the selected row index
    setdeletecustomer(customer.consignee_name); // Store the customer name
    setOpenDialog(true); // Open the confirmation dialog
  };
  const handleIndexChange = (e) => {
    const input = e.target.value;
    setUserInputIndex(input);
  
    // Enable delete button only if input matches the selected index
    setIsDeleteEnabled(input === selectedIndex.toString());
  };
  const handleConfirmDelete = async () => {
    if (selectedIndex !== null) {
      try {
        const response = await deleteCustomer(deletecustomer);
        if (response) {
          console.log(`Customer deleted successfully: ${deleteCustomer}`);
          setOpenDialog(false);
          setSelectedIndex(null); // Reset selection
          setUserInputIndex(""); // Reset input field
          setIsDeleteEnabled(false); // Disable delete button
          setSuccessMessage("Customer deleted successfully");
  
          setTimeout(() => {
            setSuccessMessage("");
            window.location.reload(); // Refresh data
          }, 5000);
        } else {
          console.error("Error deleting customer");
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };
  const handleEdit=(customer)=>{
    setSelectedCustomer(customer);
    setOriginalCustomer({...customer}); // Store the selected casting
        setIsSavedEnabled(false);
        setOpenEditDialog(true); 
        
      }
      const handleFieldChange = (field, value) => {
        const updatedCustomer = { ...selectedCustomer, [field]: value };
        setSelectedCustomer(updatedCustomer);
    
        // Check if values are different from original
        const isChanged = Object.keys(updatedCustomer).some(
            key => updatedCustomer[key] !== OriginalCustomer[key]
        );
        setIsSavedEnabled(isChanged);
    };
    const updateCustomerDetails=async()=>{
      try {
        const response = await updateCustomer(OriginalCustomer.consignee_name, selectedCustomer);
        
        if (response.ok) {
            console.log("Customer updated successfully");
            setOpenEditDialog(false); // Close dialog after updating
            window.location.reload(); // Reload data
        } else {
            console.error("Error updating Customer");
        }
    } catch (error) {
        console.error('Error updating Customer:', error);
    }
  
      }
  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomerDetails.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='customerdisplay'>
      <div><Navbar /></div>
      {successMessage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#ffff',  // Green background
            color: 'black',               // White text
            padding: '15px',
            textAlign: 'center',
            fontWeight: 'bold',
            zIndex: 1000,                // Ensures it appears on top
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slight shadow for pop effect
          }}
        >
          {successMessage}
        </div>
      )}
      <div className='table_container'>
        <div className="table-actions">
          <Button variant="contained" color="primary" sx={{ fontSize: 16 }} onClick={() => history('/invoices')} >
            Invoices
          </Button>
          <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={() => history('/customerdisplay')} >
            Customer
          </Button>
          <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={() => history('/castingdisplay')}>
            Pump
          </Button>
          <TextField
            variant="outlined"
            placeholder="Search by Consignee Name..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginLeft: 'auto', width: 300, backgroundColor: 'white', borderRadius: 1 }}
          />
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#333', }}>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  S.No
                </TableCell>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Consignee Name
                </TableCell>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Consignee Address    </TableCell>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Consignee GSTIN    </TableCell>

                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Consignee State
                </TableCell>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Consignee State Code
                </TableCell>
                <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
                  Action
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {currentCustomers.map((customer, index) => (
                <TableRow key={index} >
                  <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>{customer.consignee_name}</TableCell>
                  <TableCell>{customer.consignee_address}</TableCell>
                  <TableCell>{customer.consignee_gstin}</TableCell>
                  <TableCell>{customer.consignee_state}</TableCell>
                  <TableCell>{customer.consignee_state_code}</TableCell>

                  <TableCell>
                    <IconButton onClick={()=>handleEdit(customer)}><Create sx={{ color: 'green' }} /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(indexOfFirstItem + index + 1, customer)}><Delete sx={{ color: 'red' }} /></IconButton>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <Pagination
            count={Math.ceil(filteredCustomerDetails.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>

        <div>
          <Dialog open={openDialog} PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 2,
              width: 400,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>Delete Invoice</Typography>

            </DialogTitle>
            <Typography sx={{ px: 3, fontSize: 24, mb: 1 }}>
              To delete the Customer <strong>{selectedIndex }-{deletecustomer}</strong>, type the index number to confirm:
            </Typography>
            <DialogContent>
              <TextField variant='outlined' size="larger" onChange={handleIndexChange} sx={{
                width: '90%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: 25
                },
              }}></TextField>

            </DialogContent>
            <DialogActions>
              <Button color='secondary'onClick={()=>setOpenDialog(false)} sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                fontSize: 20
              }}>Cancel</Button>
              <Button color='error' onClick={handleConfirmDelete} disabled={!isDeleteEnabled} sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                fontSize: 20
              }}> Delete</Button>
            </DialogActions>

          </Dialog>
        </div>
        <div>
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} PaperProps={{
            sx: {
                borderRadius: 3,
                padding: 2,
                width: 400,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            },
        }}>
            <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Edit Customer Details
                </Typography>
            </DialogTitle>
        
            <DialogContent>
                <TextField
                    label="Consignee Name"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={selectedCustomer?.consignee_name || ''}
                    onChange={(e) => handleFieldChange("consignee_name",e.target.value )}
                />
                <TextField
                    label="Consignee Address"
                    fullWidth
                  multiline
                    margin="dense"
                    variant="outlined"
                  
                    value={selectedCustomer?.consignee_address || ''}
                    onChange={(e) => handleFieldChange("consignee_address", e.target.value )}
                />
                <TextField
                    label=" Consignee GSTIN"
                    fullWidth
                    margin="dense"
                    variant="outlined" 
                    value={selectedCustomer?.consignee_gstin || ''}
                    onChange={(e) => handleFieldChange("consignee_gstin",e.target.value )}/>
                    
                <TextField
                    label=" Consignee State"
                    fullWidth
                    margin="dense"
                    variant="outlined" 
                    value={selectedCustomer?.consignee_state || ''}
                    onChange={(e) => handleFieldChange("consignee_state",e.target.value )}/>
                    
                <TextField
                    label=" Consignee State Code"
                    fullWidth
                    margin="dense"
                    variant="outlined" 
                    value={selectedCustomer?.consignee_state_code || ''}
                    onChange={(e) => handleFieldChange("consignee_state_code",e.target.value )}/>
                    </DialogContent>
                    <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color='secondary' sx={{
              borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
            }}>
              Cancel
            </Button>
            
            <Button color='success'  disabled={!IsSavedEnabled} onClick={updateCustomerDetails} sx={{
              borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
            }}>
              Save
            </Button>
          </DialogActions>
                    </Dialog>
                   
        </div>
      </div>
    </div>
  )
}

export default CustomerDisplay