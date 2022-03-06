import { Container, Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import Order from '../components/order/order';
import ProfileInfo from '../components/profile/ProfileInfo';

const Profile = () => {

    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const router = useRouter();
    if(!user) {
        router.push("/");
        return;
    }
    return (
        <div>
            <Head>
                <title>Profile: {user.name}</title>
            </Head>
        <Container sx={{padding: '15px 0'}}>
            <Typography sx={{fontSize: {
                xs: '24px',
                sm: '28px',
                md: '32px',
                lg: '36px'
            }, fontWeight: 500 , textAlign: 'center' , my: 2}}>{user.role === "user" ? "USER PROFILE" : "ADMIN PROFILE"}</Typography> 
            <Grid container>
                <Grid item xs={12} md={5}>
                    <ProfileInfo token={token} user={user}/>
                </Grid>
                <Grid item xs={12} md={7}>
                   <Order />
                </Grid>
            </Grid>       
        </Container>
        </div>

    );
};

export default Profile;