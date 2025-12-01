import { Typography } from '@mui/material';
import Link from 'next/link';
import { StyledMenu, StyledMenuItem } from '../../StyledMenu';
import { Notification } from '../../../../types/notification';
import NotificationContents from '../NotificationContents';

export default function WebNotificationModal({
  anchorNoti,
  handleCloseNoti,
  notifications,
}: {
  anchorNoti: HTMLElement | null;
  handleCloseNoti: () => void;
  notifications: Notification[];
}) {
  return (
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
  );
}
