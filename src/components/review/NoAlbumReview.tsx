import { Box, Button, Link, Typography } from '@mui/material';

export default function NoAlbumReview() {
  return (
    <Box mt={2}>
      <Typography mb={2}>작성한 리뷰가 없습니다. 첫 리뷰를 작성해보세요!</Typography>
      <Link href="/album" sx={{ textDecoration: 'none' }}>
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
