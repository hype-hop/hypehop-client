import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1}}>
  
     
      <AppBar position="static" elevation={0} sx={{ height: 60, backgroundColor:'rgb(25,25,25)' ,
    borderBottom:'1px solid rgb(47,47,47)' }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2}}
          
          >
            <MenuIcon sx={{width:22.13, height:14.62}}/>
          </IconButton>
          <Typography variant="h1" color='primary' component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
      
            <div>
              <IconButton
            
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle sx={{ height: 30, width:30 }} />
              </IconButton>
              <Menu
              
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem sx={{color:'rgb(25,25,25)'}}  onClick={handleClose}>Profile</MenuItem>
                <MenuItem sx={{color:'rgb(25,25,25)'}}  onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
      
        </Toolbar>
      </AppBar>
    </Box>
  );
}