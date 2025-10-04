import { isMobile } from 'react-device-detect';
import { AppBar, Box, Toolbar, IconButton, Typography, Avatar, Modal, Container, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StyledMenu, StyledMenuItem } from '../StyledMenu';
import LogoMainIcon from '../../../assets/icons/logo-main.svg';
import CancleIcon from '../../../assets/icons/cancle.svg';
import { useAuth } from '../../../AuthenticationContext';
import { typography } from '../../../constants/themeValue';
import BASE_URL from '../../../config';
import fetchNotification from '../../../api/notification';
import { Notification } from '../../../types/notification';
import NotificationContents from './NotificationContents';
import LogoHoverIcon from './LogoHoverIcon';
import RedDot from '../../../assets/icons/redDot.svg';
import useNotification from '../../../hooks/useNotification';
import LoginButton from '../Buttons/LoginButton';

export default function MenuAppBar() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { hasUnreadNoti, handleMenuNoti, anchorNoti, handleCloseNoti, setHasUnreadNoti } = useNotification();
  const { user, setUser } = useAuth();
  const [anchorProfile, setAnchorProfile] = useState(null);
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

  useEffect(() => {
    const unreadNotifications = notifications?.some((noti) => {
      return !noti.isRead;
    });
    setHasUnreadNoti(unreadNotifications);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const handleChange = (event) => {
    setUser(event.target.checked);
  };

  const handleMenuProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorProfile(null);
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
        }}
      >
        <Container
          sx={{
            '@media (min-width:900px)': {
              paddingLeft: '16px',
              paddingRight: '16px',
            },
            '@media (min-width:0px)': { paddingLeft: '16px', paddingRight: '16px' },
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', paddingX: { xs: 0 } }}>
            <Link href="/">
              <IconButton
                onClick={handleHoverLogoOut}
                onMouseOver={handleHoverLogoOver}
                onMouseOut={handleHoverLogoOut}
                disableRipple
                sx={{ padding: 0 }}
              >
                {logoHover ? <LogoHoverIcon /> : <LogoMainIcon width={125} height={20} />}
              </IconButton>
            </Link>
            {user !== null && Object.keys(user).length === 0 && <LoginButton />}

            {user !== null && Object.keys(user).length > 0 && (
              <div>
                <IconButton
                  aria-label="notifications"
                  aria-controls="menu-notifications"
                  aria-haspopup="true"
                  onClick={handleMenuNoti}
                  color="primary"
                >
                  {hasUnreadNoti && (
                    <Box sx={{ position: 'absolute', right: '13px', bottom: '20px' }}>
                      <RedDot />
                    </Box>
                  )}

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
                    src={user.image}
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
                              href={`/album/review/${noti?.review_id?._id}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              <StyledMenuItem onClick={handleCloseNoti}>
                                <NotificationContents noti={noti} />
                              </StyledMenuItem>
                            </Link>
                          ))
                        )}
                        <Link
                          href="/my-information"
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
                          key={noti?.review_id?._id}
                          href={`/album/review/${noti?.review_id?._id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <StyledMenuItem onClick={handleCloseNoti}>
                            <NotificationContents noti={noti} />
                          </StyledMenuItem>
                        </Link>
                      ))
                    )}
                    <Link
                      href="/my-information"
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
                  <Link href="/my-information" style={{ textDecorationLine: 'none' }}>
                    <StyledMenuItem onClick={handleCloseProfile}>
                      <PersonIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                      <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
                        마이프로필
                      </Typography>
                    </StyledMenuItem>
                  </Link>

                  <Link href={`${BASE_URL}/api/logout`} style={{ textDecorationLine: 'none' }}>
                    <StyledMenuItem onClick={handleChange}>
                      <LogoutIcon sx={{ marginRight: '16px', color: 'white.main' }} />
                      <Typography fontSize={typography.size.md} sx={{ color: 'white.main' }}>
                        로그아웃
                      </Typography>
                    </StyledMenuItem>
                  </Link>
                </StyledMenu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
