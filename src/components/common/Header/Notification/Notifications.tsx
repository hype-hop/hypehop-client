import { isMobile } from 'react-device-detect';
import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import MobileNotificationModal from './MobileNotificationModal';
import useNotification from '../../../../hooks/useNotification';
import RedDot from '../../../../assets/icons/redDot.svg';
import WebNotificationModal from './WebNotificationModal';
import { Notification } from '../../../../types/notification';
import fetchNotification from '../../../../api/notification';

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

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const { hasUnreadNoti, handleMenuNoti, anchorNoti, handleCloseNoti, setHasUnreadNoti } = useNotification();

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
  return (
    <>
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

        <NotificationsIcon sx={{ height: 25, width: 25, color: '#7E7E7E' }} />
      </IconButton>
      {isMobile ? (
        <MobileNotificationModal
          anchorNoti={anchorNoti}
          handleCloseNoti={handleCloseNoti}
          notifications={notifications}
        />
      ) : (
        <WebNotificationModal anchorNoti={anchorNoti} handleCloseNoti={handleCloseNoti} notifications={notifications} />
      )}
    </>
  );
}
