import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const SelectField = ({ name, options , label , disabled}) => {
  const {control ,formState: { errors }} = useFormContext();
  const hasError =  errors[name];
  return (
      <Controller
        name={name}
        control={control}
        render={({ field: {value , onChange, onBlur} , fieldState: {invalid, error}  }) => (
            <FormControl fullWidth margin="normal" size="medium" disabled={disabled} error={invalid} variant="outlined">
        <InputLabel id={`${name}_label`}>{label}</InputLabel>
        <Select
          labelId={`${name}_label`}
          id={`${name}_label_id`}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
        >
          <MenuItem value="">
            <em>All products</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option._id} value={option.name}>
           {option.name} 
          </MenuItem>
        ))}
          
        </Select>
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
        )}
      />
  );
};

export default SelectField;