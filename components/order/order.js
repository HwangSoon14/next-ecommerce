import { Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';


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

const Order = () => {
    const orders = useSelector(state => state.order.order);
    return (
        <Box sx={{my: 2}}>
        <Typography fontSize={22} sx={{fontWeight: 500 , ml: {
          xs: '10px'
        }}}>ORDER</Typography>
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
            <StyledTableCell  align="right">DATE</StyledTableCell>
            <StyledTableCell  align="right">TOTAL</StyledTableCell>
            <StyledTableCell  align="right">DELIVERED</StyledTableCell>
            <StyledTableCell  align="right">PAID</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody >
          {orders.map((order) => (
            <StyledTableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
              <Link href={`/order/${order._id}`}>
                <a style={{textDecoration: 'underline'}}>{order._id}</a>
                  </Link>
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(order.createdAt).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">${order.total}</StyledTableCell>
              <StyledTableCell align="right">{order.delivered ? <Typography color="green">YES</Typography> : <Typography color="red">X</Typography>}</StyledTableCell>
              <StyledTableCell align="right">{order.paid ? <Typography color="green">YES</Typography> : <Typography color="red">X</Typography>}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    );
};

export default Order;