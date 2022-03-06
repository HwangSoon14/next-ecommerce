import { Grid } from "@mui/material";
import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ listProduct  , handleOpenModal , handleCheckItem}) => {
  return (
    <Grid container sx={{ m: "15px 0" }} rowSpacing={4} >
      {listProduct.map((item, idx) => (
        <Grid
            p={2}
          item
          xs={12}
          sm={6}
          md={4}
          xl={4}
          key={idx}
        //   sx={{ alignItems: 'center' ,justifyContent: 'center'}}
        >
          <ProductItem handleOpenModal={handleOpenModal} product={item} handleCheckItem={handleCheckItem}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
