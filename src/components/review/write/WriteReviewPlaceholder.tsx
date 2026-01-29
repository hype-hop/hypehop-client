import { Box, Typography } from '@mui/material';

const commonBoxStyles = {
  border: '1px solid',
  backgroundColor: 'rgb(52, 52, 52)',
  borderRadius: '16px',
  borderColor: 'rgb(52, 52, 52)',
  pl: '16px',
  padding: '15px',
  justifyItems: 'center',
  mt: '10px',
};

function WriteReviewPlaceholder() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'not-allowed',
        rowGap: '24px',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
      }}
    >
      <Box>
        <Typography variant="h1">앨범 평점</Typography>
        <Box sx={{ ...commonBoxStyles }}>
          <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h1">트랙별 평점</Typography>

        <Box sx={{ ...commonBoxStyles }}>
          <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h1">공개여부</Typography>
        <Box sx={{ ...commonBoxStyles }}>
          <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h1">리뷰작성하기</Typography>
        <Box sx={{ ...commonBoxStyles }}>
          <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WriteReviewPlaceholder;
