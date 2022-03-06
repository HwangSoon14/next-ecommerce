import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyPage from "../components/EmptyPage";
import CartItem from "../components/cart/CartItem";
import { Box } from "@mui/system";
import CartInformation from "../components/cart/CartInformation";
import { getData , postData } from "../utils/fetchData";
import { saveAll } from "../store/slice/cartSlice";
import { addOrder } from "../store/slice/orderSlice";
import LoadingCpn from '../components/Loading';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const router = useRouter();
    const dispatch = useDispatch();
    const [callback, setCallback] = useState(false)
  const [loading , setLoading]= useState(false);
    useEffect(() => {
        const cartLocalStorage = JSON.parse(localStorage.getItem("next__cart"));
        if(cartLocalStorage.length > 0) {
            let newArray = [];
            const updateNewValueToCart = async () => {
                for(const item of cartLocalStorage) {
                    const res = await getData(`product/${item.product._id}`)
                    const {inStock, images , price, name, _id , sold} = res.product
                    if(inStock > 0){
                        newArray.push({
                            product: {
                                _id, images , price, name,sold,inStock
                            },
                            quantity: item.quantity > inStock ? inStock : item.quantity
                        })
                    }
                }
                dispatch(saveAll(newArray))
            }
            updateNewValueToCart(); 
        }
    }, [dispatch , callback])
    
    const handleSubmit = async (data) => {
      let newCart = [];
      // check quantity vs inStock with each product
      for(const item of cart) {
        const res = await getData(`product/${item.product._id}`);
        if(res.product.inStock - item.quantity >= 0){
          newCart.push(item)
        }
      }
      if(newCart.length < cart.length){
        setCallback(!callback)
        return toast.error("The product is out of stock or the quantity is insufficient.");
      }
      setLoading(true);

      postData("order",{address: data.address, cart , mobile: data.mobile, total: data.total}, token).then(res => {
        if(res.err) {
          setLoading(false);
        return toast.error(res.err);
        }
        dispatch(saveAll([]));
        dispatch(addOrder({order: res.order , user}));
        toast.success(res.msg);
        setLoading(false);
        return router.push(`/order/${res.order._id}`)
    })  
    
    
  }

  



  if (cart.length === 0) return <EmptyPage />;
  return (
    <Container>
      <Grid container spacing={2}>
        <Box sx={{ width: "100%", p: "10px", m: "20px 0 0 0", display: 'flex' , alignItems: 'center' , justifyContent: 'space-between' }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "30px",
                lg: "34px",
              },
              width: {
                xs: '100%',
                sm: 'auto'
              },
              color: "#999999",
              fontWeight: 700,
            }}
          >
            SHOPPING CART
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "24px",
                sm: "28px",
                md: "30px",
                lg: "34px",
              },
              display: {
                  xs: 'none',
                  sm: 'block'
              },
              color: "#999999",
              fontWeight: 700,
            }}
          >
            SHIPPING
          </Typography>
        </Box>
        <Grid item xs={12} md={8}>
          {cart && cart.map((item, idx) => <CartItem key={idx} item={item} />)}
        </Grid>
        <Grid item xs={12} md={4} >
                <CartInformation handleSubmit={handleSubmit}/>
        </Grid>
      </Grid>
      {loading && <LoadingCpn />}
    </Container>
  );
};

export default Cart;
