import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { typography } from '../../../constants/themeValue';

function LoginButton() {
  return (
    <Link href="/login" style={{ textDecoration: 'none' }}>
      <Button
        sx={{
          borderRadius: '4px',
          width: '69px',
          height: '30px',
        }}
        color="primary"
        variant="contained"
      >
        로그인
      </Button>
    </Link>
  );
}

export default LoginButton;
