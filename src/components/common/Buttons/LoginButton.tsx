import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { typography } from '../../../constants/themeValue';

function LoginButton() {
  return (
    <Link href="/login" style={{ textDecoration: 'none' }}>
      <Button
        sx={{
          background: 'rgb(152, 72, 255)',
          borderRadius: '4px',
          width: '69px',
          height: '32px',
        }}
      >
        <Typography
          fontSize={typography.size.lg}
          fontWeight="medium"
          sx={{
            color: 'white.main',
          }}
        >
          로그인
        </Typography>
      </Button>
    </Link>
  );
}

export default LoginButton;
