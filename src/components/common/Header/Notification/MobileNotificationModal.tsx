import { Box, IconButton, Modal, Typography } from '@mui/material';
import Link from 'next/link';
import CancleIcon from '../../../../assets/icons/cancle.svg';
import { StyledMenuItem } from '../../StyledMenu';
import { Notification } from '../../../../types/notification';
import NotificationContents from '../NotificationContents';

export default function MobileNotificationModal({
  anchorNoti,
  handleCloseNoti,
  notifications,
}: {
  anchorNoti: boolean | null;
  handleCloseNoti: () => void;
  notifications: Notification[];
}) {
  return (
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
  );
}
