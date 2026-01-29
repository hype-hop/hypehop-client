'use client';

import { AppBar, Box, Button, Container, Typography } from '@mui/material';

import { useAuth } from '../../../AuthenticationContext';
import LoginButton from '../Buttons/LoginButton';
import AppLogo from '../AppLogo';
import ProfileMenu from './ProfileMenu';
import Notifications from './Notification/Notifications';

export default function MenuAppBar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        height: 50,
        backgroundColor: 'rgb(25,25,25)',
        borderBottom: '1px solid rgb(47,47,47)',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          margin: 'auto',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@media (min-width:900px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          '@media (min-width:0px)': { paddingLeft: '16px', paddingRight: '16px' },
        }}
      >
        <AppLogo />
        {user !== undefined &&
          (user === null ? (
            <LoginButton />
          ) : (
            <Box>
              <Button href="/topster">
                <Typography sx={{ textDecoration: 'none' }}>탑스터</Typography>
              </Button>
              <Notifications />
              <ProfileMenu />
            </Box>
          ))}
      </Container>
    </AppBar>
  );
}
