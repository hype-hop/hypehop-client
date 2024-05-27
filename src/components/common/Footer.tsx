import { Box, Typography, IconButton } from '@mui/material';
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
      }}
    >
      <LogoIcon width={143} height={20} />
      <Typography
        sx={{
          color: 'rgb(174, 174, 174)',
          mt: '10px',
          mb: '16px',
        }}
      >
        test@hypehop.com
      </Typography>
      <IconButton href="https://www.instagram.com/hype__hop/">
        <InstagramIcon />
      </IconButton>
    </Box>
  );
}
