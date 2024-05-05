import { Box, Typography } from '@mui/material';

const commonBoxStyles = {
  border: '1px solid',
  backgroundColor: 'rgb(52, 52, 52)',
  opacity: '10%',
  borderRadius: '16px',
  borderColor: 'rgb(52, 52, 52)',
  pl: '16px',
  padding: '15px',
  justifyItems: 'center',
  mt: '10px',
};

const commonTypoStyles = {
  mt: '40px',
  opacity: '10%',
};
function WriteReviewBefore() {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          ...commonTypoStyles,
        }}
      >
        앨범 평점
      </Typography>
      <Box sx={{ ...commonBoxStyles }}>
        <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
      </Box>
      <Typography
        sx={{
          ...commonTypoStyles,
        }}
        variant="h1"
      >
        트랙별 평점
      </Typography>
      <Box sx={{ ...commonBoxStyles }}>
        <Typography textAlign="left">트랙리스트를 열어 확인하세요.</Typography>
      </Box>
      <Typography
        sx={{
          ...commonTypoStyles,
        }}
        variant="h1"
      >
        공개여부
      </Typography>
      <Box sx={{ ...commonBoxStyles }}>
        <Typography textAlign="left">공개</Typography>
      </Box>

      <Typography
        sx={{
          ...commonTypoStyles,
        }}
        variant="h1"
      >
        리뷰작성하기
      </Typography>
      <Box sx={{ ...commonBoxStyles }}>
        <Typography textAlign="left">제목을 입력하세요.</Typography>
      </Box>
    </>
  );
}

export default WriteReviewBefore;
