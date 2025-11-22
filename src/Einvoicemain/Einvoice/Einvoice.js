import React,{useState} from 'react'
import { Box,Typography,TextField,TableContainer,Paper,Table,TableBody,TableHead,TableRow,TableCell} from '@mui/material'
import EHeader from '../header/EHeader';


function Einvoice() {
  const [invoice_no, setinvoice_no] = useState("");
  const [invoice_date, setinvoice_date] = useState("");
  const [state, setstate] = useState("TamilNadu");
  const [state_code, setstate_code] = useState("33");
  const [transport_name, settransport_name] = useState("");
  const [vehicle_number, setvehicle_number] = useState("");
  const [date_of_supply, setdate_of_supply] = useState("");

  const [pono_date, setpono_date] = useState("");
  const [eway_bill_no, seteway_bill_no] = useState("");
  const [receiver_name, setreceiver_name] = useState("");
  const [receiver_address, setreceiver_address] = useState("");
  const [receiver_gstin, setreceiver_gstin] = useState("");
  const [receiver_state, setreceiver_state] = useState("");
  const [receiver_state_code, setreceiver_state_code] = useState("");
  const [consignee_name, setconsignee_name] = useState("");
  const [consignee_address, setconsignee_address] = useState("");
  const [consignee_gstin, setconsignee_gstin] = useState("");
  const [consignee_state, setconsignee_state] = useState("");
  const [consignee_state_code, setconsignee_state_code] = useState("");
  
    
  return (
    <div>
        
      <TableContainer
        component={Paper}
        className="tb-container"
        sx={{ height: "550px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1.5px solid black",
                  width: "2.8%",
                  fontSize: "1rem"
                }}
              >
                SI.No
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1.5px solid black",
                  width: "20%",
                  fontSize: "1rem"
                }}
              >
                Description of Goods
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "13.375%",
                  fontSize: "1rem"
                }}
              >
                HSN/SAC
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "8%",
                  fontSize: "1rem"
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "8%",
                  fontSize: "1rem"
                }}
              >
                Weight
              </TableCell>
              
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "9%",
                  fontSize: "1rem"
                }}
              >
                Rate
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "5%",
                  fontSize: "1rem"
                }}
              >
                per
              </TableCell>
              <TableCell sx={{ padding: "2px", width: "10%",fontSize: "1rem" }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
              <TableRow>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    InputProps={{
                      sx: {
                        fontSize: "15px",
                        padding: "0px",
                        margin: "0px",
                        lineHeight: 1,
                      },
                      disableUnderline: true,
                    }}
                   
                    
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    multiline
                    sx={{ width: "200px" }}
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    padding: "2.8px",
                    borderRight: "1px solid black",
                    verticalAlign: "top",
                  }}
                >
                  <TextField
                    variant="standard"
                    sx={{ width: "40px" }}
                    InputProps={{
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                    
                  />
                </TableCell>
                <TableCell sx={{ padding: "2.8px", verticalAlign: "top" }}>
                  <TextField
                    variant="standard"
                    InputProps={{
                      padding: "4px",
                      sx: { fontSize: "15px" },
                      disableUnderline: true,
                    }}
                   
                  />
                </TableCell>
              </TableRow>
            
          </TableBody>
          <TableRow>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1.5px solid black",
                  width: "2.8%",
                  fontSize: "1rem"
                }}
              >
                              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1.5px solid black",
                  width: "20%",
                  fontSize: "1rem"
                }}
              >
                Total
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "13.375%",
                  fontSize: "1rem"
                }}
              >
                
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "8%",
                  fontSize: "1rem"
                }}
              >
                
              </TableCell>
              
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "9%",
                  fontSize: "1rem"
                }}
              >
               
              </TableCell>
              <TableCell
                sx={{
                  padding: "2px",
                  borderRight: "1px solid black",
                  width: "5%",
                  fontSize: "1rem"
                }}
              >
                             </TableCell>
              <TableCell sx={{ padding: "2px", width: "10%",fontSize: "1rem" }}>
                
              </TableCell>
            </TableRow>

        </Table>
      </TableContainer>
       
                    </div>
    
    
  )
}

export default Einvoice