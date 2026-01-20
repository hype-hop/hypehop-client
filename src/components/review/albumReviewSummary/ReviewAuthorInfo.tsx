'use client';

import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import TimeSincePost from '../../album/TimeSincePost';
import CustomStar from '../CustomStar';

interface ReviewAuthorInfoProps {
  userId?: string;
  userName?: string;
  userImage?: string;
  createdAt: string;
  albumRating: number;
}

function ReviewAuthorInfo({ userId, userName, userImage, createdAt, albumRating }: ReviewAuthorInfoProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        whiteSpace: 'nowrap',
        columnGap: '7px',
      }}
    >
      <Avatar
        onClick={() => router.push(`/profile/${userId}`)}
        style={{ width: 40, height: 40, cursor: 'pointer' }}
        src={userImage}
        slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} textAlign="left">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            columnGap: '8px',
          }}
        >
          <Typography
            variant="body1"
            color="white.main"
            sx={{
              alignContent: 'center',
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography style={{ cursor: 'pointer' }} onClick={() => router.push(`/profile/${userId}`)}>
              {userName}
            </Typography>
          </Typography>

          <Typography
            lineHeight="lineHeightSm"
            sx={{
              textAlign: 'left',
              alignContent: 'center',
              color: 'rgb(168, 168, 168)',
            }}
          >
            <TimeSincePost createdAt={createdAt} />{' '}
          </Typography>
        </Box>

        <CustomStar readOnly value={albumRating} />
      </Box>
    </Box>
  );
}

export default ReviewAuthorInfo;
