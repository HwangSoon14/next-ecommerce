import { FormControl, FormHelperText, TextareaAutosize } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextAreaField = ({ name, placeholder , minRows , disabled}) => {
  const {control ,formState: { errors }} = useFormContext();
  const hasError =  errors[name];
  return (
    <FormControl fullWidth  disabled={disabled} error={!!hasError}>

      <Controller
        name={name}
        control={control}
        render={({ field  }) => (
          <TextareaAutosize
            style={{width: '100%'}}
            minRows={minRows}
            {...field}
            placeholder={placeholder}
          />
        )}
      />
        <FormHelperText sx={{maxWidth: '310px'}} error={!!hasError}>
          {errors[name]?.message}
        </FormHelperText>
    </FormControl>
  );
};

export default TextAreaField;