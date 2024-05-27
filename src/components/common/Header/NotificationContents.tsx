import { Box, Typography } from '@mui/material';
import { typography } from '../../../constants/themeValue';
import TimeSincePost from '../../album/TimeSincePost';
import { Notification } from '../../../types/notification';

export default function NotificationContents({ noti }: { noti: Notification }) {
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
