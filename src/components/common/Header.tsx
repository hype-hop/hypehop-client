import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Avatar, Modal } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useEffect, useState } from 'react';
import { StyledMenu, StyledMenuItem } from './StyledMenu';

import { ReactComponent as LogoMainIcon } from '../../assets/icons/logo-main.svg';
import { ReactComponent as LogoSubIcon } from '../../assets/icons/logo-hover.svg';
import { ReactComponent as CancleIcon } from '../../assets/icons/cancle.svg';

import { useAuth } from '../../AuthenticationContext';
import { typography } from '../../constants/themeValue';
import BASE_URL from '../../config';
import fetchNotification from '../../api/notification';
import { Notification } from '../../types/notification';
import TimeSincePost from '../album/TimeSincePost';

function NotificationContents({ noti }) {
  return (
    <Box sx={{ flexDirection: 'column', margin: '8px 0px' }}>
      <Typography
        fontWeight="light"
        fontSize={typography.size.md}
        sx={{
          color: 'rgb(126, 126, 126)',
          mb: '4px',
        }}
      >
        <TimeSincePost createdAt={noti?.timestamp} />
      </Typography>
      <Typography>
        {noti?.sender_id?.name}님이&nbsp;
        {noti?.review_id?.title}에&nbsp;
        {noti?.type === '좋아요' ? `${noti?.type} 표시를 했습니다.` : `${noti?.type}을 달았습니다.`}
      </Typography>
      <Typography fontSize={typography.size.md} sx={{ mt: '4px' }}>
        {noti?.text}
      </Typography>
    </Box>
  );
}

function LogoHoverIcon() {
  const [count, setCount] = useState(false);

  useEffect(() => {
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

  const handleHoverLogoOver = () => {
    setLogoHover(true);
  };

  const handleHoverLogoOut = () => {
    setLogoHover(false);
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
    <Box>
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
            <IconButton
              onClick={handleHoverLogoOut}
              onMouseOver={handleHoverLogoOver}
              onMouseOut={handleHoverLogoOut}
              disableRipple
            >
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

              {isMobile ? (
                <Modal
                  open={Boolean(anchorNoti)}
                  onClose={handleCloseNoti}
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    height: '300px',
                    bgcolor: 'rgb(25,25,25)',
                    outline: '1px solid rgb(47, 47, 47)',
                    borderRadius: '16px 16px 0px 0px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ padding: '8px' }}>
                    <IconButton
                      onClick={handleCloseNoti}
                      sx={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 0,
                      }}
                    >
                      <CancleIcon />
                    </IconButton>
                    <Box sx={{ height: '235px', overflowY: 'auto' }}>
                      {notifications?.length === 0 ? (
                        <StyledMenuItem disabled>
                          <Typography>새로운 알림이 없습니다.</Typography>
                        </StyledMenuItem>
                      ) : (
                        notifications?.map((noti) => (
                          <Link
                            key={noti?.review_id?._id}
                            to={`/album/review/${noti?.review_id?._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <StyledMenuItem onClick={handleCloseNoti}>
                              <NotificationContents noti={noti} />
                            </StyledMenuItem>
                          </Link>
                        ))
                      )}
                      <Link
                        to="/myInformation"
                        onClick={handleCloseNoti}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'block',
                          marginTop: '16px',
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          fontSize={typography.size.sm}
                          sx={{
                            color: 'rgb(174, 174, 174)',
                            ':hover': {
                              textDecorationLine: 'underline',
                            },
                          }}
                        >
                          최근 14일 동안 받은 알림을 <br /> 모두 확인했습니다.
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Modal>
              ) : (
                <StyledMenu
                  id="menu-notifications"
                  anchorEl={anchorNoti}
                  open={Boolean(anchorNoti)}
                  onClose={handleCloseNoti}
                  width={256}
                  sx={{ height: 300 }}
                >
                  {notifications?.length === 0 ? (
                    <StyledMenuItem disabled>
                      <Typography>새로운 알림이 없습니다.</Typography>
                    </StyledMenuItem>
                  ) : (
                    notifications?.map((noti) => (
                      <Link
                        to={`/album/review/${noti?.review_id?._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <StyledMenuItem onClick={handleCloseNoti}>
                          <NotificationContents noti={noti} />
                        </StyledMenuItem>
                      </Link>
                    ))
                  )}
                  <Link
                    to="/myInformation"
                    onClick={handleCloseNoti}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <Typography
                      fontSize={typography.size.sm}
                      sx={{
                        color: 'rgb(174, 174, 174)',
                        textAlign: 'center',
                        margin: '16px 0 16px 0',
                        ':hover': {
                          textDecorationLine: 'underline',
                        },
                      }}
                    >
                      최근 14일 동안 받은 알림을 <br /> 모두 확인했습니다.
                    </Typography>
                  </Link>
                </StyledMenu>
              )}

              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorProfile}
                open={Boolean(anchorProfile)}
                onClose={handleCloseProfile}
                width={200}
              >
                <Link to="/myInformation" style={{ textDecorationLine: 'none' }}>
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
                  <Typography
                    fontSize={typography.size.lg}
                    fontWeight="medium"
                    sx={{
                      color: 'white.main',
                    }}
                  >
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
