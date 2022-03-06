import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaypalBtn from "../../components/PaypalBtn";
import CustomButton from '../../components/CustomButton'
import LoadingCpn from "../../components/Loading";
import { toast } from "react-toastify";
import { patchData } from "../../utils/fetchData";
import { orderPaypal } from "../../store/slice/orderSlice";
const OrderDetail = () => {
  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState([]);
  const orders = useSelector((state) => state.order.order);
  const user = useSelector(state => state.user.user)
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const [loading , setLoading] = useState(false);
  const handleDelivered = (order) => {
    setLoading(true);
    patchData(`order/delivered/${order._id}`, null,token).then(res => {
       if(res.err) {
    setLoading(false);
    return toast.error(res.err);
  }
  dispatch(orderPaypal({paid: res.result.paid,dateOfPayment: res.result.dateOfPayment, id:order._id , method: res.result.method , delivered: res.result.delivered }));
  toast.success(res.msg);
  setLoading(false);
    })
  }

  useEffect(() => {
    const arr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(arr);
  }, [orders, router.query.id]);
  if(Object.keys(user).length === 0) return null;
  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Button
        onClick={() => router.back()}
          sx={{
            backgroundColor: "black",
            p: 1,
            color: "white",
            fontWeith: 500,
            borderRadius: "10px",
            ':hover': {
                backgroundColor: 'rgba(1,1,1,0.7)',
                transform: 'scale(107%)',
                transition: 'all 0.25s linear'
            }
          }}
          startIcon={<ArrowBackIcon />}
        >
        GO BACK
        </Button>
      </Box>
      <Box sx={{display: 'flex' , flexDirection: 'column' , mt: "40px" ,p:2 ,borderRadius: '10px' , maxWidth: {
          sx: '100%' ,
          sm: '80%',
          md: '680px'
      } , margin : '0 auto'}}>
          {orderDetail.map((order , idx) => (
            <React.Fragment key={idx}>
                <Typography sx={{fontWeight: 500 , fontSize: 24 , my: 2}}>ORDER BILL ID: <Typography sx={{display: 'inline-block' , fontSize: 24}}>{order._id}</Typography></Typography>
                <Typography sx={{textAlign: 'left' , fontWeight: 500 , color: '#565c61' ,fontSize: 20}}>SHIPPING INFO:</Typography>
                <Typography sx={{my: 1, fontWeight: 500 , fontSize: '18px', color: '#575757'}}>NAME: {order.user.name}</Typography>
                <Typography sx={{my: 1, fontWeight: 500 , fontSize: '18px', color: '#575757'}}>EMAIL: {order.user.email}</Typography>
                <Typography sx={{my: 1, fontWeight: 500 , fontSize: '18px', color: '#575757'}}>ADDRESS: {order.address}</Typography>
                <Typography sx={{my: 1, fontWeight: 500 , fontSize: '18px', color: '#575757'}}>MOBILE: {order.mobile}</Typography>
                <Box sx={{width: '100%' , display: 'flex' , flexDirection: {
                  xs: 'column',
                  sm: 'row',
                } ,alignItems: {
                  xs: 'flex-start',
                  sm: 'center'
                } , justifyContent: 'space-between'}}>
                <Typography sx={{fontWeight: 500 , fontSize: 18}}>Status:  {order.delivered ? <Typography sx={{color: 'green' , display: 'inline-block'}}>delivered at {order.updatedAt}</Typography> : <Typography sx={{display: 'inline-block' , color: 'red'}}>not delivered</Typography> }</Typography>
                {
                                user.role === 'admin' && !order.delivered &&
                                <Box sx={{width: {
                                  xs: '170px',
                                  sm: '200px'
                                }, my: 2}} >
                                <CustomButton onClick={() => handleDelivered(order)}>Mark as delivered</CustomButton>
                                </Box>
                  }
                </Box>
                <Typography sx={{fontWeight: 500 , fontSize: 18}}>Paid:  {order.paid ? <Typography sx={{color: 'green' , display: 'inline-block'}}>Paid on {order.updatedAt}</Typography> : <Typography sx={{display: 'inline-block' , color: 'red'}}>not paid</Typography> }</Typography>
                <Typography  sx={{fontWeight: 500 , fontSize: 24 , my: 2}}>PAYMENT</Typography>
                {order.method && <Typography sx={{fontWeight: 500 , fontSize: 18}}>Method: <em>{order.method}</em></Typography> } 
                {order.paymentId && <Typography sx={{fontWeight: 500 , fontSize: 18}}>Payment ID: <em>{order.paymentId}</em></Typography> } 
                <Typography  sx={{fontWeight: 500 , fontSize: 24 , my: 2}}>ORDER ITEM</Typography>
                <Box sx={{display: 'flex' , flexDirection: 'column' , width: '100%'}}>
                    {order.cart.map((x ,idx) => (
                        <Box key={idx} sx={{width: '100%' , p: 1 , display: 'flex' , alignItems: 'center'}}>
                            <Box component="img" sx={{width: {
                              xs: 40,
                              sm: 50,
                              md: 60,
                            } , height: {
                              xs: 40,
                              sm: 50,
                              md: 60,
                            } , borderRadius: 10 , objectFit: 'cover'}} alt={x.product._id} src={x.product.images[0].url} ></Box>
                            <Typography sx={{ml: '15px',  fontWeight: 500, fontSize: {
                              xs: 14,
                              sm: 16,
                              md: 18,
                            } }}>{x.product.name.toUpperCase()}</Typography>
                            <Typography sx={{ml: 'auto', fontWeight: 500 , display: 'flex' , alignItems: 'center' , fontSize: 18}}>Total: 
                                <Typography sx={{ml: 1.5 , color: '#028082' , fontSize: {
                              xs: 14,
                              sm: 16,
                              md: 18,
                            }}}>${x.product.price} x {x.quantity} = ${x.product.price * x.quantity}</Typography>
                            </Typography>
                        </Box>
                    ))}
                </Box>
                {!order.paid && user.role !== 'admin' && <Box sx={{width: {
            xs: '100%',
            sm: '300px',
          }, m: {
            xs: '30px auto 10px',
          }}}>
                <PaypalBtn total={order.total} orderProps={order}/>
          </Box>}
                
            </React.Fragment>
          ))}
          
          </Box>
          {loading && <LoadingCpn />}
    </Container>
  );
};

export default OrderDetail;
