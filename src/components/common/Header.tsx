import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useEffect, useState } from 'react';
import { StyledMenu, StyledMenuItem } from './StyledMenu';

import { ReactComponent as LogoMainIcon } from '../../assets/icons/logo-main.svg';
import { ReactComponent as LogoSubIcon } from '../../assets/icons/logo-hover.svg';

import { useAuth } from '../../AuthenticationContext';
import { typography } from '../../constants/themeValue';
import BASE_URL from '../../config';
import fetchNotification from '../../api/notification';
import { Notification } from '../../types/notification';
import TimeSincePost from '../album/TimeSincePost';

function LogoHoverIcon() {
  const [count, setCount] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(!count);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  });

  return count ? (
    <LogoMainIcon
      style={{
        width: 125,
        height: 20,
      }}
    />
  ) : (
    <LogoSubIcon
      style={{
        width: 125,
        height: 20,
      }}
    />
  );
}

export default function MenuAppBar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [auth, setAuth] = useAuth();
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [anchorNoti, setAnchorNoti] = useState(null);
  const [logoHover, setLogoHover] = useState(false);

  const handleHoverLogo = (event) => {
    setLogoHover(event.type === 'mouseenter');
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotification();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

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
            <IconButton onMouseEnter={handleHoverLogo} onMouseLeave={handleHoverLogo} disableRipple>
              {logoHover ? <LogoHoverIcon /> : <LogoMainIcon style={{ width: 125, height: 20 }} />}
            </IconButton>
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

              <StyledMenu
                id="menu-notifications"
                anchorEl={anchorNoti}
                open={Boolean(anchorNoti)}
                onClose={handleCloseNoti}
                width={256}
              >

                {notifications.length === 0 ? (
                  <StyledMenuItem disabled>
                    <Typography>새로운 알림이 없습니다.</Typography>
                  </StyledMenuItem>
                ) : (
                  notifications.map((noti) => (

                    <Link
                      to={`/album/review/${noti.review_id._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >

                      <StyledMenuItem onClick={handleCloseNoti}>
                        <Box sx={{ flexDirection: 'column' }}>
                          <Typography>
                            {noti.sender_id.name}님이&nbsp;
                            {noti.review_id.title}에&nbsp;
                          </Typography>
                          <Typography>
                            {noti.type === '좋아요' ? `${noti.type} 표시를 했습니다.` : `${noti.type}을 달았습니다.`}
                          </Typography>
                          <Typography fontSize={typography.size.md}>{noti.text}</Typography>
                        </Box>

                        <Typography
                          fontWeight="light"
                          fontSize={typography.size.md}
                          sx={{
                            // position: 'absolute',
                            // bottom: '8px',
                            // right: '8px',
                            paddingLeft: '4px',
                            color: 'rgb(126, 126, 126)',
                          }}
                        >


                          <TimeSincePost createdAt={noti?.timestamp} />


                        </Typography>
                      </StyledMenuItem>
                    </Link>
                  ))
                )}
                <Link
                  to="/dashboard"
                  onClick={handleCloseNoti}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Typography
                    sx={{
                      margin: '8px 0 8px 16px',
                      ':hover': {
                        textDecorationLine: 'underline',
                      },
                    }}
                  >
                    더보기
                  </Typography>
                </Link>
              </StyledMenu>

              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorProfile}
                open={Boolean(anchorProfile)}
                onClose={handleCloseProfile}
                width={200}
              >

                <Link to="/dashboard" style={{ textDecorationLine: 'none' }}>

                  <StyledMenuItem onClick={handleCloseProfile}>
                    <PersonIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                    <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
                      마이프로필
                    </Typography>
                  </StyledMenuItem>
                </Link>

                <Link to={`${BASE_URL}/api/logout`} style={{ textDecorationLine: 'none' }}>
                  <StyledMenuItem onClick={handleChange}>
                    <LogoutIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                    <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
                      로그아웃
                    </Typography>
                  </StyledMenuItem>
                </Link>
              </StyledMenu>
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
                  <Typography fontSize={typography.size.lg} fontWeight="medium" sx={{ color: 'white.main' }}>
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
