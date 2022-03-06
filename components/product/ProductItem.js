import { Card, CardContent, CardMedia, Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slice/cartSlice";
import checkAddToCart from "../../utils/checkAddToCart";
import CustomButton from "../CustomButton";


const ProductItem = (props) => {
  const { product , handleOpenModal , handleCheckItem} = props;
  const {checked} = product;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  const handleAddToCart = () => {
    const isErr = checkAddToCart(product);
    if(isErr !== "") {
      toast.error(isErr, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }); 
    return;  
  }
    dispatch(addToCart({product, quantity:1}));
    toast.success("Add to cart success" , {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    }

    const userLink = () => {
        return (
          <>
            <Box
          mx={1}
          my={1}
          sx={{
            width: {
              xs: "90%",
              sm: "50%",
            },
          }}
        >
          <CustomButton>
            <Link href={`/product/${product._id}`}>
              <a>View</a>
            </Link>
          </CustomButton>
        </Box>
        <Box
          sx={{
            width: {
              xs: "90%",
              sm: "50%",
            },
          }}
          mx={1}
          my={1}
        >
          <CustomButton 
          disabled={product.inStock === 0}
          onClick={handleAddToCart}
          >
              <a>Buy</a>
          </CustomButton>
        </Box>
          </>
        ) 
    }
    const adminLink = () => {
        return (
          <>
            <Box
          mx={2}
          my={2}
          sx={{
            width: {
              xs: "100%",
              sm: "50%",
            },
           
          }}
        >
          <CustomButton>
            <Link href={`/create/${product._id}`}>
              <a>Edit</a>
            </Link>
          </CustomButton>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "50%",
            },
          }}
          mx={2}
          my={2}
        >
          <CustomButton 
          onClick={() => handleOpenModal(product._id)}
           >
              Delete
          </CustomButton>
        </Box>
          </>
        )
    }
  return (
    <Card sx={{ width: "100%", position: 'relative', height: 570}}> 
      {
        user.role === "admin" && <Box sx={{position: 'absolute' , zIndex: 2 }}>
      <Checkbox color="error" sx={{color: "white"}} checked={checked || false} onChange={() => handleCheckItem(product._id)}/>
      </Box>
      }
      <CardMedia
        component="img"
        height="280"
        image={product.images[0].url}
        alt="img"
        sx={{ objectFit: "cover", objectPosition: "top" }}
      />
      <CardContent sx={{height: {
        xs: 150,
        sm: 200,
      },
      overflowY: 'scroll',
      "scrollbarWidth": "none",
      }}
      className="hidden-scrollbar"
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "700", fontSize: "22px" }}
        >
          {product.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          my={1}
        >
          <Typography component="span" sx={{ display: "inline-block" }}>
            Price:{" "}
            <span style={{ color: "red", fontSize: "16px" }}>
              {product.price}$
            </span>
          </Typography>
          <Typography component="span">
            {product.inStock > 0 ? (
              <Typography>
                In Stock:{" "}
                <span style={{ color: "red", fontSize: "16px" }}>
                  {product.inStock}
                </span>
              </Typography>
            ) : (
              <Typography>Out Stock</Typography>
            )}{" "}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-3-line"
          sx={{ lineHeight: "1.7"}}
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {user.role === "admin" ? adminLink() : userLink()}
      </Box>
    </Card>
  );
};

export default ProductItem;
