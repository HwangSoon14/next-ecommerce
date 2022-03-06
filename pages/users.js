import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Container, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CustomModal from '../components/CustomModal';
import LoadingCpn from '../components/Loading'
import { removeUser } from '../store/slice/usersSlice';
import { deleteData } from '../utils/fetchData';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const [openModal , setOpenModal] = useState(false);
    const [userId , setUserId] = useState({});
    const [loading , setLoading] = useState(false);
    const handleOpenModal = (id) => {
        setUserId(id);
        setOpenModal(true);
    }
    const onConfirmDeleteUser = () => {
        setLoading(true);
        deleteData(`user/${userId}` , token).then(res => {
            if(res.err) 
            {
                return toast.error(res.err);
                setLoading(false);
            }
            dispatch(removeUser({id: userId}))
            toast.success(res.msg);
            setLoading(false);
        })


    }

    const onConfirmUpdateUser = (data) => {
        console.log(data)
    }
    if(user.role !== "admin") return null;
    return (
        
        <Container>
        <Head>
            <title>Users</title>
        </Head>
            <Box sx={{width: '100%' , p:2  , textAlign: 'center', my: 2}}>
                <Typography sx={{fontSize: {
                    xs: '22px',
                    sm: '24px',
                    md: '26px',
                    lg: '28px'
                } , fontWeight: 500}}>USERS MANAGEMENT</Typography>
            </Box>
            <Box sx={{width: '100%'}}>
            <TableContainer component={Paper}  sx={{my: 1 ,width: {
  xs: '95%',
  sm: '100%',
}, mx: {
  xs: 'auto'
}}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: '#eeeeee'}}>
          <StyledTableRow>
            <StyledTableCell >ID</StyledTableCell>
            <StyledTableCell  align="center">AVATAR</StyledTableCell>
            <StyledTableCell  align="right">NAME</StyledTableCell>
            <StyledTableCell  align="right">EMAIL</StyledTableCell>
            <StyledTableCell  align="center">ADMIN</StyledTableCell>
            <StyledTableCell  align="center">ACTION</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody >
          {users.map((user) => (
            <StyledTableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                    {user._id}
              </StyledTableCell>
              <StyledTableCell align="center">
                  <Box component="img" alt={user.name} src={user.avatar} sx={{width: {
                      xs: '35px',
                      sm: '45px',
                      md: '55px',
                  }, height: {
                    xs: '35px',
                      sm: '45px',
                      md: '55px',
                  } , borderRadius: '50%' , objectFit: 'cover'}}></Box>
              </StyledTableCell>
              <StyledTableCell align="right">{user.name}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="center">
                  {user.role === "admin" && user.root &&
                    <Box sx={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                            <CheckIcon htmlColor='green'/>
                            <span style={{color: 'green'}}>Root</span>                    
                    </Box>
                   }
                   {user.role !== "admin" && <Typography sx={{color: '#fb4c53'}}>X</Typography>}  
                   {user.role === "admin" && !user.root  && <CheckIcon htmlColor="green"/>}
                   
                   
              </StyledTableCell>
              <StyledTableCell align="center">
                  <Box sx={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                      <Link href={`/edit/${user._id}`} passHref>
                        <IconButton disabled={user.root && user.role === "admin"}>
                          <EditIcon htmlColor='black'/>
                        </IconButton>
                      </Link>
                      <IconButton disabled={user.root && user.role === "admin"} onClick={() => handleOpenModal(user._id)}>
                          <DeleteOutlineIcon htmlColor='#fb4c53' />
                      </IconButton>
                  </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
            <CustomModal open={openModal} setOpen={setOpenModal} onConfirm={onConfirmDeleteUser} />
            {loading && <LoadingCpn />}
        </Container>
    );
};

export default Users;