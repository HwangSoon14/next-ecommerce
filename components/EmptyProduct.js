import { Box } from '@mui/system';
import React from 'react';
import Image from "next/image";

const EmptyProduct = () => {
    return (
        <Box
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Image alt="empty page" src="/text.gif" priority width={1000} height={500} />
    </Box>
    );
};

export default EmptyProduct;