import '../Casting/Casting.css'

import { Button, TextField } from '@mui/material'
import React,{useEffect, useState} from 'react'

import Navbar from '../Navbar/Navbar'
import { savecasting } from '../services/Casting'

function Casting() {
    const [casting_name, setcasting_name] = useState('')
    const [casting_weight, setcasting_weight] = useState('')
    const [casting_hsn,setcasting_hsn]=useState('');
    const handlecasting=async()=>{
      const castingDetails={
        casting_name,
        casting_weight,
        casting_hsn
      };
      try{
        const response=await savecasting(castingDetails);
        if (response.status===201){
          console.log('Casting added');
          alert("Casting saved successfully!");
        }
        else{
          console.error('Casting not added');
        }
      }
      catch(error){
        console.error('Error',error)
      }
    }  ;
    
    
    
  return (

    <div className='container'>
      <div><Navbar/></div>
<div className='admin_form'>
       <div className='title'> ADD CASTING DETAILS</div>
        <TextField variant='outlined' label="Casting Name" sx={{backgroundColor:"#ffff",borderRadius:'5px'}} value={casting_name} onChange={(e)=>setcasting_name(e.target.value)} ></TextField>
        <TextField variant='outlined' label="Casting Weight" sx={{backgroundColor:"#ffff",borderRadius:'5px'}} value={casting_weight} onChange={(e)=>setcasting_weight(e.target.value)}></TextField>
        <TextField variant='outlined' label="Casting HSN" sx={{backgroundColor:"#ffff",borderRadius:'5px'}} value={casting_hsn} onChange={(e)=>setcasting_hsn(e.target.value)}></TextField>
        
        <Button variant='outlined'  sx={{backgroundColor:"#ffff",borderRadius:'5px',borderColor:"black",color:"black",'&:hover':{backgroundColor:'#ffff',color:"black",borderColor:"black"

}}} onClick={handlecasting}>ADD CASTING</Button>
      
    </div>
 
    </div>
  )
}

export default Casting