'use client';

import { AppBar, Box, Button, Container, Typography } from '@mui/material';

import { useAuth } from '../../../AuthenticationContext';
import LoginButton from '../Buttons/LoginButton';
import AppLogo from '../AppLogo';
import ProfileMenu from './ProfileMenu';
import Notifications from './Notification/Notifications';
import HeaderSkeleton from '../skeletons/header/HeaderSkeleton';

export default function Header() {
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
        {user === undefined && <HeaderSkeleton />}
        {user !== undefined &&
          (user === null ? (
            <LoginButton />
          ) : (
            <Box>
              <Button href="/topster" color="white" variant="text" sx={{ mr: 2, height: '30px' }}>
                탑스터 만들기
              </Button>
              <ProfileMenu />
            </Box>
          ))}
      </Container>
    </AppBar>
  );
}
