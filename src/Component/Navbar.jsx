import React from 'react';
import { Stack, Box, IconButton, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Search from './Search';
import Left from './Left';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        padding={1}
        sx={{
          position: 'sticky',
          top: 0,
          left:0,
          zIndex: 20,
          background: 'white',
          width: '100%', // Ensure the Stack fills the width
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            mr: 2,
            '&:focus': {
              outline: 'none',
            },
            '&:active': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Symbol.png" 
            alt="YouTube" 
            height={45} 
          />
        </Link>
        <Box sx={{ flex: 1, marginLeft: 2, marginRight: 2 }}>
          <Search />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <>
              <IconButton
                color="inherit"
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:active': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                <VideoCallIcon />
              </IconButton>
              <IconButton
                color="inherit"
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:active': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                <AppsIcon />
              </IconButton>
              <IconButton
                color="inherit"
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:active': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                <NotificationsIcon />
              </IconButton>
              <IconButton
                color="inherit"
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:active': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </>
          )}
        </Box>
      </Stack>
      <Box>
        <Left />
      </Box>
    </>
  );
}

export default Navbar;
