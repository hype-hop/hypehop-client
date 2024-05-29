import { Button } from '@mui/material';

export default function TallyFeedbackBtn() {
  return (
    // eslint-disable-next-line react/button-has-type
    <Button
      sx={{
        position: 'fixed',
        left: '15%',
        bottom: '10%',
        borderRadius: '100%',
        width: '60px',
        height: '60px',
        zIndex: 1,
        background: 'rgb(152, 72, 255)',
        transition: 'all 200ms',
        ':hover': {
          background: 'rgb(152, 72, 255)',
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
      Click me
    </Button>
  );
}
