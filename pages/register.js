import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useState , useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import PasswordField from "../components/form-control/PasswordField";
import TextInputField from "../components/form-control/TextField";
import LoadingCpn from '../components/Loading';
import { postData } from '../utils/fetchData';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Please enter your name")
    .test(
      "Please enter as least as 2 word",
      "Please enter as least as 2 word",
      (value) => {
        return value.split(" ").length >= 2;
      }
    ),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter valid email"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Please enter as least as 6 character"),
  retypePassword: yup
    .string()
    .required("Please enter Confirm Password")
    .oneOf([yup.ref("password")], "Not correct , please enter again"),
});
const Register = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await postData('auth/register', {
        email: data.email , name: data.username , password: data.password , cf_password: data.retypePassword
      })
      if(res.err) {
        toast.error(res.err, {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else {
        toast.success(res.msg, {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
      setLoading(false);
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
    
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) router.push("/");
  }, [user, router]);


  return (
   <Container sx={{
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }}>
    <Typography
        my={5}
        sx={{ color: "#028082", fontWeight: 700 }}
        variant="h4"
        component="h3"
      >
        Register Page
      </Typography>
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '550px'
          },
          height: 450,
          //   backgroundColor: "primary.main",
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextInputField name="username" label="Enter Your Email" />
            <TextInputField name="email" label="Enter Your Email" />
            <PasswordField name="password" label="Enter your Password" />
            <PasswordField name="retypePassword" label="Enter your retypePassword" />
            <Box sx={{ width: "100%" }} my={2}>
              <CustomButton type="submit">REGISTER</CustomButton>
            </Box>
          </form>
        </FormProvider>
        <Typography sx={{ fontSize: "18px", width: "100%" }}>
          You already have an account?
          <Link href="/signin">
           <a style={{color: 'red'}}>Sign In</a>
          </Link>
        </Typography>
      </Box>
      {loading && <LoadingCpn />}
   </Container>)
};

export default Register;
