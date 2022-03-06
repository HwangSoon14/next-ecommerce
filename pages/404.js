import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Custom404() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{ width: {
            xs: '90%',
            md: '70%',
            lg: '50%'
        }, height: "70%" }}
        component="img"
        src="https://raw.githubusercontent.com/HwangSoon14/fakeshop/master/src/assets/error.gif"
        alt="404img"
      ></Box>
      <Typography component="h2" variant="h3" sx={{fontSize: {
          xs: '22px',
          sm: '26px',
          md: '30px',
          lg: '34px'
      }}}>SORRY ! PAGE NOT FOUND</Typography>
    </Box>
  );
}
