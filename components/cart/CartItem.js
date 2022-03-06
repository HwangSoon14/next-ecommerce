import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from '../../store/slice/cartSlice';
import CustomModal from "../CustomModal";
const CartItem = (props) => {
  const { item } = props;
  const { product, quantity } = item;
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleRemove = () => {
      dispatch(removeItem(product._id));
  } 
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        borderTop: "1px solid #cfcfcf",
        p: "10px",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "65px",
          },
          height: {
            xs: "70px",
          },
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "7px",
            border: "2px solid #ccc",
            p: "2px",
            objectFit: "cover",
          }}
          src={product.images[0].url}
          alt={product.name}
        />
      </Box>
      <Box sx={{ ml: "20px" , minWidth: '160px'}}>
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "16px",
              md: "18px",
            },
            fontWeight: 500,
          }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            color: "red",
            fontWeight: 500,
            fontSize: {
              xs: "14px",
              sm: "16px",
              md: "18px",
            },
          }}
        >
          ${product.price}
        </Typography>
        <Typography
          sx={{
            color: "red",
            fontWeight: 500,
            fontSize: {
              xs: "14px",
              sm: "16px",
              md: "18px",
            },
          }}
        >
          In Stock: {product.inStock}
        </Typography>
      </Box>
      <Box sx={{ display: {
          xs: 'none',
          sm: 'flex'
      }, alignItems: "center", ml: "auto"
      }}>
        <IconButton disabled={item.quantity <= 1} onClick={() => dispatch(decrease(product._id))}>
          <RemoveIcon  sx={{fontSize: {
              xs: '18px',
              sm: '24px',
              md: '28px'
          }}} htmlColor="black" />
        </IconButton>
        <Typography
          sx={{ border: "1px solid #ccc", p: "5px 7px", borderRadius: "4px" , fontSize: {
              xs: '12px',
              sm: '14px',
              md: '18px'
          }}}
        >
          {quantity < 10 ? `0${quantity}` : quantity}
        </Typography>
        <IconButton  disabled={item.quantity >= 99 || item.quantity >= product.inStock} onClick={() => dispatch(increase(product._id))}>
          <AddIcon sx={{fontSize: {
              xs: '18px',
              sm: '24px',
              md: '28px'
          }}} htmlColor="black" />
        </IconButton>
      </Box>
      <Box sx={{ ml: "auto", display: "flex", flexDirection: "column", display: {
          xs: 'none',
          sm: 'flex'
      } }}>
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "16px",
            },
            fontWeight: 500,
          }}
        >
          Quantity:{" "}
          <span style={{ color: "#565c61" }}>
            {quantity < 10 ? `0${quantity}` : quantity}
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handleOpenModal}>
            <DeleteOutlineIcon htmlColor="#fb4c53"/>
          </IconButton>
        </Box>

        
      </Box>
        {/* show on mobile device */}
        <Box sx={{ display: {
            xs: 'flex',
            sm: 'none',
        },
        flexDirection: 'column',
        ml: 'auto'
        }}>

<Box sx={{ display: "flex", alignItems: "center"
      }}>
        <IconButton onClick={() => dispatch(decrease(product._id))}>
          <RemoveIcon disabled={item.quantity <= 1 || item.quantity >= product.inStock} sx={{fontSize: {
              xs: '18px'
          }}} htmlColor="black" />
        </IconButton>
        <Typography
          sx={{ border: "1px solid #ccc", p: "5px 7px", borderRadius: "4px" , fontSize: {
              xs: '12px'
          }}}
        >
          {quantity < 10 ? `0${quantity}` : quantity}
        </Typography>
        <IconButton disabled={item.quantity >= 99  ||item.quantity >= product.inStock}  onClick={() => dispatch(increase(product._id))}>
          <AddIcon sx={{fontSize: {
              xs: '18px'
          }}} htmlColor="black" />
        </IconButton>
      </Box>
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handleOpenModal}>
            <DeleteOutlineIcon htmlColor="#fb4c53" />
          </IconButton>
        </Box>
        </Box>
        <CustomModal open={openModal} setOpen={setOpenModal} onConfirm={handleRemove}/>
    </Box>
  );
};

export default CartItem;
