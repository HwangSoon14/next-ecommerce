import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";

export default function EmptyPage() {
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
        }, height: {
          xs: '40%',
          sm: '50%',
        }, display: 'flex' , alignItems: 'center' , justifyContent: 'center' }}
      >
        <Image alt="empty page" src="/empty.gif" width={500} priority height={350}/>
      </Box>
      <Typography component="h2" variant="h3" sx={{fontSize: {
          xs: '22px',
          sm: '26px',
          md: '30px',
          lg: '34px',
      },
      textAlign: 'center'}}>NOTHING IN YOUR CART , GO BUY SOMETHING</Typography>
    </Box>
  );
}
