import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Input, Button } from '@mui/material';
import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../config';

function LoginPage() {
  const [user] = useAuth();

  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
  }

  return (
    <Container className="Login">
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          mt: '105px',
        }}
      >
        로그인
      </Typography>

      <form className="form" action={`${BASE_URL}/api/login`} method="POST">
        <Box className="flex-column">
          <label className="labels" htmlFor="email" />
          <Box className="inputForm">
            <Input
              fullWidth
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="이메일을 입력해주세요."
              sx={{
                borderRadius: '16px',
                mb: '16px',
                mt: '57px',
                backgroundColor: 'background.default',
                border: '1px solid rgb(52, 52, 52)',
              }}
            />
          </Box>
        </Box>

        <Box className="flex-column">
          <label className="labels" htmlFor="password" />
          <Box className="inputForm">
            <Input
              fullWidth
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="비밀번호를 입력해주세요."
              sx={{
                borderRadius: '16px',
                backgroundColor: 'background.default',
                border: '1px solid rgb(52, 52, 52)',
              }}
            />
          </Box>
        </Box>

        <Button
          fullWidth
          type="submit"
          className="button-submit"
          sx={{
            background: 'rgb(131, 36, 254)',
            borderRadius: '16px',
            height: '60px',
            mt: '31px',
          }}
        >
          <Typography>로그인</Typography>
        </Button>
      </form>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '16px',
        }}
      >
        <Typography sx={{ mr: '5px' }}>계정이 없으신가요?</Typography>
        <Link to="/join" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography sx={{ color: 'rgb(131, 36, 254)' }}>회원가입</Typography>{' '}
        </Link>
      </Box>
    </Container>
  );
}

export default LoginPage;
