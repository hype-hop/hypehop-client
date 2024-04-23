import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  styled,
  MenuProps,
  MenuItemProps,
  Button,
  Avatar,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import StarsIcon from '@mui/icons-material/Stars'; // 임시 로고
import { useAuth } from '../AuthenticationContext';
import TimeSincePost from './TimeSincePost';

// 목업 데이터
const notiArray: { noti: string; time: Date }[] = [
  { noti: '새로운 알림이 있습니다.', time: new Date(2024, 3, 23, 22, 0) },
  { noti: '새로운 알림이 있습니다.', time: new Date(2024, 3, 20, 10, 0) },
  { noti: '새로운 알림이 있습니다.', time: new Date(2023, 3, 23, 10, 0) },
];

const HeaderMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))(({ theme }) => ({
  '& .MuiMenu-paper': {
    borderRadius: 16,
    minWidth: 256,
    boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.4)',
    backgroundColor: theme.palette.background.default,
    outline: '1px solid rgb(47, 47, 47)',
  },
  '& .MuiMenu-list': {
    padding: 8,
  },
}));

const HeaderMenuItem = styled((props: MenuItemProps) => (
  <MenuItem
    sx={{ borderRadius: '8px', ':hover': { backgroundColor: 'rgb(46, 45, 45)' } }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
))();

export default function MenuAppBar() {
  const [auth, setAuth] = useAuth();
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const [anchorNoti, setAnchorNoti] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenuProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleMenuNoti = (event) => {
    setAnchorNoti(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };

  const handleCloseNoti = () => {
    setAnchorNoti(null);
  };

  return (
    <Box sx={{ flexGrow: 1, height: 60 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          height: 60,
          backgroundColor: 'rgb(25,25,25)',
          borderBottom: '1px solid rgb(47,47,47)',
          padding: { lg: '0% 7% 0% 7%' },
          justifyContent: { md: 'space-between' },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/">
            <StarsIcon sx={{ color: 'white.main' }} />
          </Link>

          {auth ? (
            <div>
              <IconButton
                aria-label="notifications"
                aria-controls="menu-notifications"
                aria-haspopup="true"
                onClick={handleMenuNoti}
                color="primary"
              >
                <NotificationsIcon sx={{ height: 25, width: 25 }} />
              </IconButton>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuProfile}
                color="primary"
              >
                <Avatar
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                  src={auth.image}
                  alt="user"
                />
              </IconButton>

              <HeaderMenu
                id="menu-notifications"
                anchorEl={anchorNoti}
                open={Boolean(anchorNoti)}
                onClose={handleCloseNoti}
              >
                {notiArray.map((noti) => (
                  <HeaderMenuItem onClick={handleCloseNoti}>
                    <Typography fontSize="md">{noti.noti}</Typography>
                    <Typography
                      fontWeight="light"
                      fontSize="md"
                      sx={{
                        paddingLeft: '4px',
                        color: 'rgb(126, 126, 126)',
                      }}
                    >
                      <TimeSincePost createdAt={noti.time} />
                    </Typography>
                  </HeaderMenuItem>
                ))}
              </HeaderMenu>

              <HeaderMenu
                id="menu-appbar"
                anchorEl={anchorProfile}
                open={Boolean(anchorProfile)}
                onClose={handleCloseProfile}
              >
                <Link to="/dashboard" style={{ textDecorationLine: 'none' }}>
                  <HeaderMenuItem onClick={handleCloseProfile}>
                    <PersonIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                    <Typography fontSize="md" sx={{ color: 'white.main' }}>
                      마이프로필
                    </Typography>
                  </HeaderMenuItem>
                </Link>
                <Link to="/" style={{ textDecorationLine: 'none' }}>
                  <HeaderMenuItem onClick={handleChange}>
                    <LogoutIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                    <Typography fontSize="md" sx={{ color: 'white.main' }}>
                      로그아웃
                    </Typography>
                  </HeaderMenuItem>
                </Link>
              </HeaderMenu>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button
                  sx={{
                    background: 'rgb(152, 72, 255)',
                    borderRadius: '4px',
                    width: '69px',
                    height: '32px',
                  }}
                >
                  <Typography fontSize="lg" fontWeight="medium" sx={{ color: 'white.main' }}>
                    로그인
                  </Typography>
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
