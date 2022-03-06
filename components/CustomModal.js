import { Button, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CustomModal = (props) => {
  const { open, setOpen , onConfirm , title} = props;
  
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "350px",
            sm: "400px",
          },
          boxShadow: 24,
          p: 4,
          backgroundColor: "white",
          borderRadius: '10px'
        }}
      > 
        <IconButton onClick={handleClose} sx={{position: 'absolute', top: '0', right: '0'}}>
            <HighlightOffIcon sx={{color: 'black'}} size="large"/>
        </IconButton>

        {!title ? <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center' , borderBottom: '2px solid #ccc', color: 'red'}}>
          Are you sure
        </Typography>  : 
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center' , borderBottom: '2px solid #ccc', color: 'red'}}>
          {title}
        </Typography>
        }
        
        <Typography id="modal-modal-description" sx={{ m: '20px 0' , textAlign:'center'}}>
          This item will be remove. 
        </Typography>
        <Box sx={{display: 'flex' , alignItem: 'center' , justifyContent: 'flex-end'}}>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button onClick={() => {
              onConfirm();
              handleClose();
            }}>OK</Button>
      </Box>
      </Box>
      
    </Modal>
  );
};

export default CustomModal;
