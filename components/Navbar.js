import { Badge, Button, Drawer, List, ListItem } from '@mui/material';
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/slice/userSlice";
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const Navbar = () => {
  
  const badge = useSelector(state => state.cart.count);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(open);
  };


  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    Cookies.remove('refreshtoken' , {  path: 'api/auth/accessToken'})
    localStorage.removeItem("firstLogin")
    dispatch(logout());
    //show toast
    toast.success("Log out success !", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push('/signin')
  }
  const adminRouter = () => {
    return (
      (
        <Box sx={{ flexGrow: 0 , display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Avatar" src={user.avatar}  sx={{ width: 34, height: 34 }}/>
          </IconButton>
        </Tooltip>
        <Typography sx={{color: 'white' , ml: '10px',fontSize: {
          xs: '18px'
        } }}>{user.name}</Typography>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href="/profile" passHref><Typography textAlign="center">Users</Typography></Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
        
        </Menu>
      </Box>)
    )
  }
  const drawerMenu = () => {
    return (
      <Box
      sx={{ width: {
        xs: 300,
        sm: 450,
      } , height: '100%', position:'relative'}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
       <List>
        <Link href="/" passHref>

            <ListItem sx={{borderBottom: '1px solid #ccc'}}>
                HOME
            </ListItem> 
            
        </Link>
        <Link href="/cart" passHref>

            <ListItem sx={{borderBottom: '1px solid #ccc'}}>
                CART <RedeemIcon sx={{ml: 1}} />
            </ListItem> 
            
        </Link>
        {Object.keys(user).length === 0
         ?
         <Link href="/signin" passHref>
            <ListItem sx={{borderBottom: '1px solid #ccc'}}>SIGN IN<PersonOutlineIcon sx={{ml: 1}} /></ListItem> 
        </Link>
         :
        <Link href="/signin" passHref>
            <ListItem sx={{borderBottom: '1px solid #ccc'}} onClick={handleLogout}>Log Out <LogoutIcon sx={{ml :1}}/></ListItem> 
        </Link>}
      </List>
      <IconButton sx={{position:'absolute' , right: 0, top: '-10px', zIndex: 1}} onClick={() => toggleDrawer(false)}>
            <Typography component="span" sx={{color: 'white' , fontSize: {
              xs: 20,
              sm: 22,
            }, borderRadius: '50%', border: '2px solid #ccc', px: 1.2, backgroundColor: 'black'}}>X</Typography>
      </IconButton>
    </Box>
    )
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#028082",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", fontWeight: "700" },
            }}
          >
            <Link href="/">
              <a>LUZZY</a>
            </Link>
          </Typography>

            

          <Box sx={{display: {
            xs: 'block',
            md: 'none'
          }}}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon htmlColor='white' fontSize='large'/>
            </IconButton>
            <Drawer
            anchor="left"
            open={drawer}
            onClose={toggleDrawer(false)}
          >
            {drawerMenu()}
          </Drawer>
          </Box>

          
          <Box sx={{m: '0 25px 0 auto' , display: {
            xs:'none',
            md: 'flex'
          }, alignItems: 'center'}}>
            
            
            <Link href="/cart" passHref>
            
               <Typography component="span" sx={{display: 'flex' , alignItems: 'center',p: 1 ,fontWeight: 500 , cursor: 'pointer', mx: 1, ':hover': {
                 backgroundColor: 'rgba(1,1,1,0.3)',
                 borderRadius: 2,
                 transition: 'all 0.25s ease'
               }}}>
               <Badge badgeContent={badge} color="error" >
               CART <ShoppingBasketIcon sx={{ml: 1}}/>
               </Badge>
               </Typography>
            </Link>
            
            {Object.keys(user).length === 0 
            ? <Link href="/signin" passHref>
            <Typography component="span" sx={{p: 1 ,fontWeight: 500 , cursor: 'pointer', mx: 1, ':hover': {
                 backgroundColor: 'rgba(1,1,1,0.3)',
                 borderRadius: 2,
                 transition: 'all 0.25s ease'
               }}}>SIGN IN</Typography>
            </Link>
            : 
            <Link href="/signin" passHref>
            <Typography onClick={handleLogout} component="span" sx={{p: 1 ,fontWeight: 500 , cursor: 'pointer', mx: 1, ':hover': {
                 backgroundColor: 'rgba(1,1,1,0.3)',
                 borderRadius: 2,
                 transition: 'all 0.25s ease'
               }}}>LOG OUT</Typography>
            </Link>
            }
          </Box>


          

          <Box
            sx={{
              flexGrow: {
                xs: 1,
                md: 0,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {Object.keys(user).length > 0 && (
              <Box sx={{ flexGrow: 0 , display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
              <Tooltip title="Click me">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={user.avatar}  sx={{ width: 34, height: 34 }}/>
                </IconButton>
              </Tooltip>
              <Typography sx={{color: 'white' , ml: '10px',fontSize: {
                xs: '18px'
              } }}>{user.name}</Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/profile" passHref><Typography textAlign="center">Profile</Typography></Link>
                  </MenuItem>
                  
                  {user.role === "admin" && (
                    
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/users" passHref><Typography textAlign="center">Users</Typography></Link>
                  </MenuItem>
                    
                  )}
                  {user.role === "admin" && (
                    
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/categories" passHref><Typography textAlign="center">Categories</Typography></Link>
                  </MenuItem>
                    
                  )}
                  {user.role === "admin" && (
                    
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/create" passHref><Typography textAlign="center">Products</Typography></Link>
                  </MenuItem>
                    
                  )}
                  
                  
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>

              
              </Menu>
            </Box>) }
          </Box>
          
          {Object.keys(user).length === 0 && <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: "flex", md: "none", fontWeight: "700" },
              ml: 'auto', justifyContent: 'flex-end'}}
          >
            <Link href="/">
              <a>LUZZY</a>
            </Link>
          </Typography>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
