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

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    sender_id: {
      sender_id: 'user1',
      name: 'HipHop Critic',
      displayName: 'HipHopCritic',
    },
    recipient_id: 'current_user_id',
    type: 'comment',
    review_id: {
      title: 'DAMN. - 켄드릭 라마의 걸작에 대한 심층 분석',
      _id: '507f1f77bcf86cd799439011',
    },
    text: '회원님의 리뷰에 댓글을 달았습니다.',
    timestamp: new Date('2024-12-01T10:30:00.000Z'),
    isRead: false,
  },
  {
    sender_id: {
      sender_id: 'user2',
      name: 'Jazz Enthusiast',
      displayName: 'JazzHop',
    },
    recipient_id: 'current_user_id',
    type: 'like',
    review_id: {
      title: 'To Pimp a Butterfly: 현대 힙합의 새로운 지평',
      _id: '507f1f77bcf86cd799439012',
    },
    text: '회원님의 리뷰를 좋아합니다.',
    timestamp: new Date('2024-12-01T09:15:00.000Z'),
    isRead: false,
  },
  {
    sender_id: {
      sender_id: 'user3',
      name: 'Story Master',
      displayName: 'StoryTeller',
    },
    recipient_id: 'current_user_id',
    type: 'comment',
    review_id: {
      title: 'Good Kid, M.A.A.D City - 스토리텔링의 완성',
      _id: '507f1f77bcf86cd799439013',
    },
    text: '회원님의 리뷰에 댓글을 달았습니다.',
    timestamp: new Date('2024-11-30T16:45:00.000Z'),
    isRead: true,
  },
  {
    sender_id: {
      sender_id: 'user4',
      name: 'West Coast Legend',
      displayName: 'WestCoast',
    },
    recipient_id: 'current_user_id',
    type: 'like',
    review_id: {
      title: 'The Chronic - 닥터 드레의 전설적인 앨범',
      _id: '507f1f77bcf86cd799439014',
    },
    text: '회원님의 리뷰를 좋아합니다.',
    timestamp: new Date('2024-11-30T14:20:00.000Z'),
    isRead: true,
  },
  {
    sender_id: {
      sender_id: 'user5',
      name: 'East Coast Soul',
      displayName: 'EastCoast',
    },
    recipient_id: 'current_user_id',
    type: 'follow',
    review_id: {
      title: 'Illmatic - 나스의 불멸의 걸작',
      _id: '507f1f77bcf86cd799439015',
    },
    text: '회원님을 팔로우했습니다.',
    timestamp: new Date('2024-11-30T11:30:00.000Z'),
    isRead: true,
  },
  {
    sender_id: {
      sender_id: 'user6',
      name: 'Wu Tang Master',
      displayName: 'WuTangFan',
    },
    recipient_id: 'current_user_id',
    type: 'comment',
    review_id: {
      title: 'Enter the Wu-Tang - 무당클랜의 혁명',
      _id: '507f1f77bcf86cd799439016',
    },
    text: '회원님의 리뷰에 댓글을 달았습니다.',
    timestamp: new Date('2024-11-29T18:20:00.000Z'),
    isRead: true,
  },
  {
    sender_id: {
      sender_id: 'user7',
      name: 'Alternative Vision',
      displayName: 'JazzRap',
    },
    recipient_id: 'current_user_id',
    type: 'like',
    review_id: {
      title: 'The Low End Theory - 트라이브의 완벽한 균형',
      _id: '507f1f77bcf86cd799439017',
    },
    text: '회원님의 리뷰를 좋아합니다.',
    timestamp: new Date('2024-11-29T15:45:00.000Z'),
    isRead: true,
  },
  {
    sender_id: {
      sender_id: 'user8',
      name: 'Brooklyn Voice',
      displayName: 'BiggieFan',
    },
    recipient_id: 'current_user_id',
    type: 'mention',
    review_id: {
      title: 'Ready to Die - 비기의 데뷔작 분석',
      _id: '507f1f77bcf86cd799439018',
    },
    text: '리뷰에서 회원님을 언급했습니다.',
    timestamp: new Date('2024-11-29T13:10:00.000Z'),
    isRead: true,
  },
];

export default function MenuAppBar() {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
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
    if (user) console.log('user', Object.keys(user));
  }, [user]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotification();
        setNotifications(DUMMY_NOTIFICATIONS);
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
            {!user && <LoginButton />}

            {user && (
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
                        마이 프로필
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
