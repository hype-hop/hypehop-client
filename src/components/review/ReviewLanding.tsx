import { Box, Button, Typography } from '@mui/material';

function ReviewLanding() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '80px 0px',
        gap: '20px',
      }}
    >
      <Box sx={{ padding: '0px 0px 0px 80px' }}>
        <Typography color="grey.main" fontSize="50px" textAlign="left">
          지금 까지
        </Typography>
        <Box>
          <Typography fontSize="50px">1320개의 리뷰가</Typography>
          <Typography color="grey.main" fontSize="50px">
            모였어요.
          </Typography>
        </Box>
      </Box>

      <Box width="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ height: '36px', fontSize: '18px', fontWeight: 'bold' }} variant="contained" color="primary">
          작성하기 →
        </Button>
      </Box>
    </Box>
  );
}
export default ReviewLanding;
