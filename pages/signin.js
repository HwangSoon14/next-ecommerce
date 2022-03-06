import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import PasswordField from "../components/form-control/PasswordField";
import TextInputField from "../components/form-control/TextField";
import LoadingCpn from "../components/Loading";
import { save } from "../store/slice/userSlice";
import { postData } from "../utils/fetchData";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please Enter Your Email !")
    .email("Please enter valid email !"),
  password: yup
    .string()
    .required("Please Enter Your Password !")
    .min(6, "Please enter at least at 6 character"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await postData("auth/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res.err) {
        toast.error(res.err, {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        return;
      }
      // save user && token to redux
      dispatch(
        save({
          user: res.user,
          access_token: res.access_token,
        })
      );

      // Set rf_token to cookie
      Cookies.set("refreshtoken", res.refresh_token, {
        path: "api/auth/accessToken",
        expires: 7,
      });
      //save first login
      localStorage.setItem("firstLogin", true);
      //Show toast success
      toast.success(res.msg, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(user).length > 0) router.push("/");
  }, [user, router]);

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        my={5}
        sx={{ color: "#028082", fontWeight: 700 }}
        variant="h4"
        component="h3"
      >
        Sign In Page
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
            <TextInputField name="email" label="Enter Your Email" />
            <PasswordField name="password" label="Enter your Password" />
            <Box sx={{ width: "100%" }} my={2}>
              <CustomButton type="submit">LOGIN</CustomButton>
            </Box>
          </form>
        </FormProvider>
        <Typography sx={{ fontSize: "18px", width: "100%" }}>
          You dont have an account?
          <Link href="/register">
          <a style={{color: 'red'}}>Register</a>
          </Link>
        </Typography>
      </Box>
      {loading && <LoadingCpn />}
    </Container>
  );
};

export default SignIn;
