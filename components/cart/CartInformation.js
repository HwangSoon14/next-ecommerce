import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from '@mui/material';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import CustomButton from '../CustomButton';
import TextInputField from '../form-control/TextField';
const schema = yup.object().shape({
    address: yup
      .string()
      .required("Please Enter Your Address !")
      .min(3, "Enter as least as 3 character"),
    mobile: yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required('A phone number is required'),
  });
  


const CartInformation = ({handleSubmit}) => {
  const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const [total , setTotal] =useState(0);
    const router = useRouter();
    const user = useSelector(state => state.user.user)
    const methods = useForm({
        mode: "onBlur",
        defaultValues: {
          address: "",
          mobile: "",
        },
        resolver: yupResolver(schema),
      });
      const onSubmit =  (data) => {
        if(!handleSubmit) return;
        handleSubmit({
          address: data.address,
          mobile: data.mobile,
          total: total,
        });
        
      }
      useEffect(() => {
        const getTotal = () => {
          const result = cart.reduce((sum , item) => {
            return sum += item.product.price * item.quantity;
          } , 0)
          setTotal(result)
        }  
        getTotal()
    }, [cart])

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: {
          xs: 'flex-start',
          md: 'flex-end'
        }}}>
        <FormProvider {...methods}>
        <Box sx={{width: {
          xs: '100%',
          sm: '50%',
          md: '80%'
        }, height: '100%'}}>

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Typography sx={{textAlign: {
              xs: 'left',
              md: 'right'
            }, fontWeight: 500}}>ADDRESS</Typography>
            <TextInputField name="address" label="ADDRESS" />
            <Typography sx={{textAlign: {
              xs: 'left',
              md: 'right'
            }, fontWeight: 500}}>PHONE NUMBER</Typography>
            <TextInputField name="mobile" label="PHONE" />
            <Typography sx={{textAlign: {
              xs: 'left',
              md: 'right'
            }, fontWeight: 500, fontSize: 28, my: '10px'}}>TOTAL: <span style={{color: 'red'}}>${total}</span></Typography>
            
            <Box sx={{ width: "100%" }} my={2}>
            { 
              Object.keys(user).length > 0 ?
              <CustomButton type="submit">PROCEED WITH PAYMENT</CustomButton>
                : 
                <Link href="/signin" passHref>
                  <CustomButton>LOGIN</CustomButton>
                </Link>
            }
            </Box>

          </form>
        </Box>
        </FormProvider>
    </Box>
    );
};

export default CartInformation;