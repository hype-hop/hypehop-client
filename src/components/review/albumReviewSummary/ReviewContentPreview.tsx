'use client';

import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { typography } from '../../../constants/themeValue';

interface ReviewContentPreviewProps {
  reviewId: string;
  title: string;
  plainText: string;
}

function ReviewContentPreview({ reviewId, title, plainText }: ReviewContentPreviewProps) {
  const router = useRouter();

  return (
    <Box onClick={() => router.push(`/album/review/${reviewId}`)}>
      <Typography
        color="white.main"
        fontWeight="bold"
        fontSize="16px"
        component="div"
        mt="14px"
        sx={{
          textAlign: 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Typography>
      <Typography
        color="grey.light"
        fontSize={typography.size.md}
        fontWeight="regular"
        component="div"
        mt="6px"
        sx={{
          display: '-webkit-box',
          textAlign: 'left',
          minHeight: '45px',
          lineHeight: '15px',
          overflow: 'hidden',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
        }}
      >
        {plainText}
      </Typography>
    </Box>
  );
}

export default ReviewContentPreview;
