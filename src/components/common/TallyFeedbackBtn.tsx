import { Button, Typography } from '@mui/material';

export default function TallyFeedbackBtn() {
  return (
    // eslint-disable-next-line react/button-has-type
    <Button
      sx={{
        position: 'fixed',
        // right: '10%',
        right: { xs: '3vh', sm: '3vh', md: '15vh', lg: '15vh' },
        bottom: '5vh',
        // bottom: '1%',
        borderRadius: '100%',
        width: '60px',
        height: '60px',
        zIndex: 1,
        // background: 'rgb(152, 72, 255)',
        background: 'white',
        transition: 'all 200ms',
        ':hover': {
          background: 'white',
          boxShadow: '0px 0px 20px 0px rgba(152, 72, 255, 0.8)',
          borderRadius: '165px',
          width: '84px',
        },
      }}
      data-tally-open="3X07pj"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-auto-close="0"
    >
      <Typography variant="h1" sx={{ color: 'black' }}>
        👋
      </Typography>
    </Button>
  );
}
