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
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import StarsIcon from '@mui/icons-material/Stars'; // 임시 로고

// 목업 데이터
const notiArray: { noti: string; time: number }[] = [
  { noti: '새로운 알림이 있습니다.', time: 10 },
  { noti: '새로운 알림이 있습니다.', time: 300 },
  { noti: '새로운 알림이 있습니다.', time: 3600 },
];

const timeToString = (sec: number): string => {
  if (sec / 60 < 1) return `${sec}초전`;
  if (sec / (60 * 60) < 1) return `${sec / 60}분전`;
  if (sec / (60 * 60 * 24) < 1) return `${sec / (60 * 60)}시간전`;
  return '오래전';
};

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
  // const [auth, setAuth] = React.useState(false);
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const [anchorNoti, setAnchorNoti] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

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
              <AccountCircle sx={{ height: 30, width: 30 }} />
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
                    {timeToString(noti.time)}
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
              <HeaderMenuItem onClick={handleCloseProfile}>
                <PersonIcon sx={{ marginRight: '16px' }} />
                <Typography fontSize="md">마이프로필</Typography>
              </HeaderMenuItem>
              <HeaderMenuItem onClick={handleCloseProfile}>
                <LogoutIcon sx={{ marginRight: '16px' }} />
                <Typography fontSize="md">로그아웃</Typography>
              </HeaderMenuItem>
            </HeaderMenu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
