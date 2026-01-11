import { useEffect, useState } from 'react';
import React from 'react'
import { deleteCasting, fetchcasting, updateCasting } from '../services/Casting';
import '../CastingDisplay/CastingDisplay.css'
import Navbar from '../Navbar/Navbar';
import { Button,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,TextField,DialogActions,DialogTitle,DialogContent,Typography ,IconButton,Pagination,Dialog} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Delete,Create} from '@mui/icons-material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function CastingDisplay() {
  
  const [castingDetails,setcastingDetails]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const [deletecasting,setdeletecasting]=useState();
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);
  const [filteredCastingDetails, setFilteredCastingDetails] = useState([]); // Holds filtered data
  const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedIndex, setSelectedIndex] = useState(null); // Store selected casting index
const [userInputIndex, setUserInputIndex] = useState(""); // Track user input for confirmation
const [successMessage, setSuccessMessage] = useState(""); // 
const [openEditDialog, setOpenEditDialog] = useState(false);
const [selectedCasting, setSelectedCasting] = useState(null);
const [OriginalCasting,setOriginalCasting]=useState([]);
const [IsSavedEnabled,setIsSavedEnabled]=useState(false);


    const itemsPerPage = 10;
  
    
  const history=useNavigate();
  useEffect(() => {
      const fetchCastingDetails = async () => {
        try {
          const response = await fetchcasting();
          if (!response) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setcastingDetails(data.casting);
          setFilteredCastingDetails(data.casting);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchCastingDetails();
    }, []);
    const handleSearchChange = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
  
      if (query === '') {
        setFilteredCastingDetails(castingDetails); // Reset to all data if no search input
      } else {
        const filteredData = castingDetails.filter(casting =>
          casting.casting_name.toLowerCase().includes(query)
        );
        setFilteredCastingDetails(filteredData);
      }
    };
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCasting = filteredCastingDetails.slice(indexOfFirstItem, indexOfLastItem);
    const handleDeleteClick = (index,casting) => {
      setSelectedIndex(index); // Store the selected row index
      setdeletecasting(casting.casting_name);
      setOpenDialog(true);
    };
    const handleIndexChange = (e) => {
      const input =e.target.value;
      console.log("hey",input);
      setUserInputIndex(input);
      // Enable delete button only if input matches the selected index
      setIsDeleteEnabled(input === deletecasting);
          };
    const handleConfirmDelete =async () => {
      if (selectedIndex !== null) {
        try{
          const encodeddeletecastingName=encodeURIComponent(deletecasting);
          const response= await deleteCasting(encodeddeletecastingName);
          console.log(response);
          if(response.ok){
            console.log(`Casting Deleted Sucessfully:${deletecasting}`);
            setOpenDialog(false);
            setSelectedIndex(null);
            setUserInputIndex("");
            setIsDeleteEnabled(false);
            setSuccessMessage("Casting Deleted sucessfully");
              setTimeout(()=>{
               setSuccessMessage("");
              window.location.reload();
              },5000);
          }else{
            console.error("Error deleting casting");

          }
        }catch(error){
          console.error("Error deleting casting:", error);
        }
      }
    };
    const handleEdit=(casting)=>{
      setSelectedCasting(casting);
      setOriginalCasting({...casting}); // Store the selected casting
      setIsSavedEnabled(false);
      setOpenEditDialog(true); 
      
    }
    const handleFieldChange = (field, value) => {
      const updatedCasting = { ...selectedCasting, [field]: value };
      setSelectedCasting(updatedCasting);
  
      // Check if values are different from original
      const isChanged = Object.keys(updatedCasting).some(
          key => updatedCasting[key] !== OriginalCasting[key]
      );
      setIsSavedEnabled(isChanged);
  };
  const updateCastingDetails=async()=>{
    try {
      const encodedcastingName=encodeURIComponent(OriginalCasting.casting_name);
      const response = await updateCasting(encodedcastingName, selectedCasting);
      
      if (response.ok) {
          console.log("Casting updated successfully");
          setOpenEditDialog(false); // Close dialog after updating
          window.location.reload(); // Reload data
      } else {
          console.error("Error updating casting");
      }
  } catch (error) {
      console.error('Error updating casting:', error);
  }

    }
    const handleDownloadCastingDetails = () => {
  const selectedData = castingDetails.map((item, index) => ({
    "S.No": index + 1,
    "Casting Name": item.casting_name || '',
    "Casting Weight in Kgs": item.casting_weight || ''
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(selectedData, { origin: "A2",header: [], skipHeader: true });

  // Set header row
  const header = ["S.No", "Casting Name", "Casting Weight in Kgs"];
  XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

  // Style header row (background color)
  const headerStyle = {
    fill: { patternType: "solid", fgColor: { rgb: "D9D9D9" } }, // Light grey
    font: { bold: true }
  };

  header.forEach((_, colIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    worksheet[cellAddress].s = headerStyle;
  });

  // Create workbook and download
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Casting Details");

  // Apply style support (only works in xlsx-style-aware viewers)
  XLSX.writeFile(workbook, "Casting_Details.xlsx", { cellStyles: true });
};

  
    
  return (
    <div className="castingdisplay">
      <div><Navbar/></div>
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
            <Button variant="contained" color="primary" sx={{ fontSize: 16 }} onClick={()=>history('/invoices')} >
                 Invoices
            </Button>
            <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={()=>history('/customerdisplay')} >
                Customer
            </Button>
            <Button variant="contained" color="secondary" sx={{ fontSize: 16, ml: 2 }} onClick={()=>history('/castingdisplay')}>
                Pump
            </Button>
            <TextField 
            variant="outlined"
            placeholder="Search by Casting Name..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginLeft: 'auto', width: 300, backgroundColor: 'white', borderRadius: 1 }}
          />
        </div>    
        <TableContainer>
            <Table>
<TableHead>
<TableRow sx={{backgroundColor:'#333',}}>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        S.No
    </TableCell>
    <TableCell sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Casting Name
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Casting Weight    </TableCell>
<TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
Casting HSNCODE    </TableCell>
    
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        Action
    </TableCell>
    <TableCell  sx={{
                  color: 'white', // White text
                  fontWeight: 'bold', // Bold font for readability
                }}>
        <Button variant="contained"  onClick={handleDownloadCastingDetails}
    startIcon={<DownloadOutlinedIcon />} sx={{fontSize: 16,
      backgroundColor: '#333',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#333',
        border: '1px solid #333'},}}></Button>
    </TableCell>

</TableRow>
</TableHead>
<TableBody>
    {currentCasting.map((casting,index)=>(
        <TableRow key={index} >
            <TableCell>{indexOfFirstItem+index+1}</TableCell>
            <TableCell>{casting.casting_name}</TableCell>
            <TableCell>{casting.casting_weight}</TableCell>
            <TableCell>{casting.casting_hsn}</TableCell>
                        <TableCell>
            <IconButton onClick={()=>handleEdit(casting)}><Create sx={{color:'green'}}/></IconButton>
                <IconButton onClick={()=>handleDeleteClick(indexOfFirstItem+index+1,casting)}><Delete sx={{color:'red'}}/></IconButton>
            
            </TableCell>
            
        </TableRow>
    ))}
</TableBody>
</Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                  <Pagination
                    count={Math.ceil(filteredCastingDetails.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
                
        
        <div>
        <Dialog open={openDialog} PaperProps={{
  sx: { borderRadius: 3, padding: 2, width: 400, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
}}>
  <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
      Delete Casting
    </Typography>
  </DialogTitle>
  
  <Typography sx={{ px: 3, fontSize: 24, mb: 1 }}>
    To delete casting at index {selectedIndex}-<strong>{deletecasting}</strong>, type the index to confirm:
  </Typography>

  <DialogContent>
    <TextField
      variant="outlined"
      size="larger"
      
      onChange={handleIndexChange}
      sx={{ width: '90%', '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 25 } }}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color='secondary' sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Cancel
    </Button>
    
    <Button color='error' onClick={handleConfirmDelete} disabled={!isDeleteEnabled} sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Delete
    </Button>
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
            Edit Casting Details
        </Typography>
    </DialogTitle>

    <DialogContent>
        <TextField
            label="Casting Name"
            fullWidth
            margin="dense"
            variant="outlined"
            value={selectedCasting?.casting_name || ''}
            onChange={(e) => handleFieldChange("casting_name",e.target.value )}
        />
        <TextField
            label="Casting Weight"
            fullWidth
            margin="dense"
            variant="outlined"
            type="number"
            value={selectedCasting?.casting_weight || ''}
            onChange={(e) => handleFieldChange("casting_weight", e.target.value )}
        />
        <TextField
            label="HSN Code"
            fullWidth
            margin="dense"
            variant="outlined" type="number"
            value={selectedCasting?.casting_hsn || ''}
            onChange={(e) => handleFieldChange("casting_hsn",e.target.value )}/>
            </DialogContent>
            <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)} color='secondary' sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Cancel
    </Button>
    
    <Button color='success' onClick={updateCastingDetails} disabled={!IsSavedEnabled}  sx={{
      borderRadius: 2, textTransform: 'none', px: 3, fontSize: 20
    }}>
      Save
    </Button>
  </DialogActions>
            </Dialog>
           
</div></div></div>
  )
}

export default CastingDisplay