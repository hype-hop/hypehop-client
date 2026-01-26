import { Box } from '@mui/material';
import Link from 'next/link';
import LogoIcon from '../../assets/icons/logo-main.svg';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '100px',
        mb: '75px',
        position: 'sticky',
        top: '100vh',
      }}
    >
      <LogoIcon width={143} height={20} />
      <Link href="mailto:hypehopcom@gmail.com" style={{ textDecoration: 'none' }} />
    </Box>
  );
}
