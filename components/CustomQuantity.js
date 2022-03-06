import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
const CustomQuantity = (props) => {
    const [value , setValue] = useState(1);
    const {onChangeValue} = props;
    const handleInputChange = (e) => {
        setValue(e.target.value)
    }
    const handleMinus = () => {
        if(value === 1) return;
        setValue(preValue => preValue - 1);
    }
    const handlePlus = () => {
        if(value === 99) return;
        setValue(preValue => preValue + 1);
    }
    useEffect(() => {
      if(onChangeValue) onChangeValue(value);
    }, [value, onChangeValue]);
    

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        p: '5px 0'
      }}
    >
      <Box sx={{  maxWidth: '100px'}}>
        <IconButton aria-label="remove" onClick={handleMinus}>
          <RemoveIcon sx={{fontSize: '28px'}}/>
        </IconButton>
      </Box>
      <Box>
          <Box min={1} max={99} sx={{maxWidth: '80px', borderRadius: '5px', p: '10px', overflow: 'hidden', m: '0 5px', textAlign: 'center', fontSize: '16px'}} value={value} type="number" component="input" onChange={(e) => handleInputChange(e)} />
      </Box>
      <Box sx={{ maxWidth: '100px'}}>
        <IconButton  aria-label="add" onClick={handlePlus}>
          <AddIcon sx={{fontSize: '28px'}}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomQuantity;
