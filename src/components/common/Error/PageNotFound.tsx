import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { ReactComponent as NotFound } from '../../../assets/icons/notFound.svg';
import { typography } from '../../../constants/themeValue';

function PageNotFound() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <NotFound />
        <Box sx={{ mt: '31px' }}>
          <Typography variant="h1">페이지를 찾을 수 없습니다</Typography>
        </Box>
        <Box sx={{ mt: '16px' }}>
          <Typography fontSize={typography.size.md} fontWeight="300">
            페이지 진입경로를 확인후 다시 시도해 주세요!
          </Typography>
        </Box>
        <Button
          onClick={handleNavigate}
          fullWidth
          sx={{ mt: '60px', border: '1px solid rgb(52, 52, 52)', borderRadius: '16px' }}
        >
          이전 페이지로 돌아가기
        </Button>
      </Box>
    </Container>
  );
}

export default PageNotFound;
