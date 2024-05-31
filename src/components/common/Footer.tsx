import { Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../assets/icons/logo-main.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '50px',
        mb: '50px',
        position: 'sticky',
        top: '100vh',
      }}
    >
      <LogoIcon width={143} height={20} />
      <Link to="mailto:hypehopcom@gmail.com" style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            color: 'rgb(174, 174, 174)',
            mt: '10px',
            mb: '16px',
          }}
        >
          hypehopcom@gmail.com
        </Typography>
      </Link>
      <IconButton href="https://www.instagram.com/hype__hop/">
        <InstagramIcon />
      </IconButton>
    </Box>
  );
}
