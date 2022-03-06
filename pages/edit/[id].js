import { Button, Checkbox, Container, Input, Switch, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { Box } from '@mui/system';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from '../../components/CustomButton';
import LoadingCpn from '../../components/Loading';
import { patchData } from '../../utils/fetchData';
import { toast } from 'react-toastify';
import {updateRole} from '../../store/slice/usersSlice';

const EditUser = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const router = useRouter();
    const dispatch = useDispatch();
    const [updateUser , setUpdateUser] = useState([]);
    const users = useSelector(state => state.users.users);
    const [checked , setChecked] = useState();
    const [temp , setTemp] = useState()
    const [loading , setLoading] = useState(false)
    const handleUpdateUser = (user) => {
        let role = checked ? "admin" : "user";
        setLoading(true)
        patchData(`user/${user._id}`, {role} ,token ).then(res => {
           
            if(res.err) {
                setLoading(false)
                return toast.error(res.err);}

            dispatch(updateRole({role: role , id: user._id}));
            if(res.err) return toast.success(res.msg);
            setLoading(false)
            router.push("/users")
        })
    }

    useEffect(() => {
        const arr = users.filter((user) => user._id === router.query.id);
        // console.log(arr[0]);
        setUpdateUser(arr);
        setChecked(arr[0].role === "admin" ? true : false);
        setTemp(arr[0].role === "admin" ? true : false)
      }, [users, router.query.id]);
    

    if(user.role !== "admin") return null;
    return (
        <div>
        <Head>
            <title>EDIT USER</title>
        </Head>
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
            <Box sx={{width: '100%', p:2 , textAlign: 'center', my: 2 }}>
                <Typography sx={{fontSize: {
                    xs: 22,
                    sm: 28,
                    md: 32,
                } , fontWeight: 500}}>EDIT USER</Typography>
            </Box>
            {updateUser.map((user, idx) => (
                    <Box key={idx} sx={{width: {
                xs: '90%',
                sm: 400,
                md: 500,
                lg: 400,
            }, p: 2 , mx: 'auto',  boxShadow: 3 , borderRadius: 2}}>
                   
                   <Box sx={{w: '100%', display: 'flex' , alignItem: 'center' , justifyContent: 'center', mb: 2.4}}>
                   <Box component="img" alt={user.name} src={user.avatar} sx={{width: 45 , height: 45, borderRadius: '50%', objectFit: 'cover'}}/>
                   </Box>
                   <Typography sx={{fontWeight: 500 }}>Name</Typography>
                   <Input sx={{mb: 1}} disabled value={user.name}/>
                   <Typography sx={{fontWeight: 500 }}>Email</Typography>
                   <Input sx={{mb: 1}} disabled value={user.email}/>
                
                <Typography sx={{my:1}}>IS ADMIN ?<Switch  onChange={e => setChecked(e.target.checked)} checked={checked}/></Typography>
                    <Box sx={{width: {
                        xs: 140,
                        sm: 150,
                    }, ml: 'auto', mt: 1}}>
                    <Button fullWidth variant="contained" disabled={temp === checked} onClick={() => handleUpdateUser(user)}>Update</Button>
                    </Box>
            </Box>    
                ))}
        </Container>
            {loading && <LoadingCpn />}
        </div>
    );
};

export default EditUser;