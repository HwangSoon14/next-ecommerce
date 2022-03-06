import { yupResolver } from "@hookform/resolvers/yup";
import { PhotoCamera } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { save } from "../../store/slice/userSlice";
import { patchData } from '../../utils/fetchData';
import { imageUpload } from "../../utils/imageUpload";
import CustomButton from "../CustomButton";
import PasswordField from "../form-control/PasswordField";
import LoadingCpn from '../Loading';

const schema = yup.object().shape({
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter as least as 6 character"),
    retypePassword: yup
      .string()
      .required("Please enter Confirm Password")
      .oneOf([yup.ref("password")], "Not correct , please enter again"),
  });
  
  

const ProfileInfo = (props) => {
    const [loading , setLoading] = useState(false);
    const [visible , setVisible] = useState(false);
    const [avatar , setAvatar] = useState();
    const dispatch = useDispatch();
  const { user ,token } = props;
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setLoading(true)
    try {
        const res = await patchData("user/resetPassword" , {
            password: data.password
        } , token)
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
        
    } catch(err) {
        toast.error(err.msg, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        setLoading(false)
      }
    }

    const changeAvatar = (e ) => {
        const file = e.target.files[0];
        if(!file) return toast.error("File doesn't exist")
        if(file.size > 1024 * 1024) return toast.error("The largest image size is 1mb");
        if(file.type !== "image/jpeg" && file.type !== "image/png") return toast.error("Image format is not valid")
        setAvatar(file);
        setVisible(true);
    }
    const updateInfo =  async () => {
        setLoading(true)
        try {
            let media;
        if(!!avatar) media = await imageUpload([avatar]);
        const res = await patchData("/user" , {
            avatar: avatar ? media[0].url : user.avatar 
        }, token);
        dispatch(save({
          user: res.user,
          access_token: token,
        }));
        toast.success(res.msg);
        setLoading(false);
    } catch (err) {
        toast.error("Some thing went wrong");
        setLoading(false)
        }
    }
    return (
    <Box sx={{ width: "100%", height: "100%" , display: 'flex' , flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{ width: "170px",
          position: "relative",
          height: "170px", mb: '30px'}}>
      <Box
        component="img"
        alt="avatar"
        src={avatar ? URL.createObjectURL(avatar) : user.avatar}
        sx={{
         width: '100%',
         height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      >
      </Box>
      <Box sx={{position: 'absolute', bottom: '0', left: '50%' , transform: 'translate(-50%,0%)'}}>
      <label htmlFor="icon-button-file">
        <input style={{display: 'none'}} accept="image/*" id="icon-button-file" type="file" onChange={changeAvatar}/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera htmlColor="black" sx={{fontSize: '36px'}}/>
        </IconButton>
      </label>
      </Box>
      </Box>
      {visible && <Box sx={{width: '100px', margin: '5px 0'}}><CustomButton onClick={updateInfo}>UPLOAD</CustomButton></Box>}
      <Box sx={{display: 'flex' , flexDirection: 'column', width: '80%'}}>
        <Typography sx={{textAlign: 'left', fontWeight: 500}}>Email</Typography>
        <TextField disabled fullWidth margin="normal" value={user.email}/>
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* <Typography sx={{textAlign: 'left', fontWeight: 500}}>Name</Typography>
        <TextInputField name="username" label="Enter new name" /> */}
        <Typography sx={{textAlign: 'left', fontWeight: 500}}>Password</Typography>
        <PasswordField name="password" label="Enter your password" />
        <Typography sx={{textAlign: 'left', fontWeight: 500}}>Confirm Password</Typography>
            <PasswordField name="retypePassword" label="Enter your password again" />
            <Box sx={{ width: "50%" }} my={2}>
              <CustomButton type="submit">UPDATE</CustomButton>
            </Box>
          </form>
        </FormProvider>
      </Box>
      {loading && <LoadingCpn />}
    </Box>
  );
};

export default ProfileInfo;
