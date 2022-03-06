import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const PasswordField = ({ label, name }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const { formState } = useFormContext();
  const hasError = errors[name];
  const hasTouched = formState.touchedFields[name];

  return (

        <FormControl margin="normal" fullWidth variant="outlined">
        <InputLabel error={!!hasError} htmlFor="outlined-adornment-password">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <OutlinedInput
            id="outlined-adornment-password"
            autoComplete="true"
              {...field}
              label={label}
              type={showPassword ? "text" : "password"}
              error={!!hasError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
          
        />
        <FormHelperText sx={{maxWidth: '310px'}} error={!!hasError}>
          {errors[name]?.message}
        </FormHelperText>
      </FormControl>
      
  );
};

export default PasswordField;
