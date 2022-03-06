import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextInputField = ({ name, label }) => {
  const {control ,formState: { errors }} = useFormContext();
  const hasError =  errors[name];
  return (
      <Controller
        name={name}
        control={control}
        render={({ field}) => (
          <TextField
            fullWidth 
            {...field}
            variant="outlined"
            margin="normal"
            label={label}
            error={!!hasError}
            helperText={errors[name]?.message}
          />
        )}

      />
  );
};

export default TextInputField;