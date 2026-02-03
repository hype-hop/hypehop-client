import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

function NoAlbumView({ albumId }: { albumId: string | undefined }) {
  return (
    <Box
      sx={{
        minWidth: '282px',
        maxWidth: '282px',
      }}
    >
      <Typography mt={2} mb={2}>
        작성하신 리뷰가 없습니다. 리뷰를 작성해보세요!
      </Typography>
      <Link href={`/album/write/${albumId}`} style={{ textDecoration: 'none' }}>
        <Button
          sx={{
            background: 'rgb(152, 72, 255)',
            borderRadius: '4px',
            height: '32px',
          }}
        >
          작성하러 가기
        </Button>
      </Link>
    </Box>
  );
}

export default NoAlbumView;
