import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddEditModal({open,handleClose,editRestaurant,editData}) {
    const [state,setState]=useState(editData.name);






useEffect(() => {

    setState(editData.name);
  
}, [editData])

const handleClick=(id)=>{
    editRestaurant(state,id)
}


const handleEditChange=(event)=>{

  setState(event.target.value);




}

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1>Edit Modal</h1>
        <TextField id="outlined-basic" onChange={handleEditChange} label="Restaurant Name"  value={state}  variant="outlined" />
<Button variant="contained"  onClick={()=>handleClick(editData.id)}>Create</Button>
       

        </Box>
      </Modal>
    </div>
  );
}
