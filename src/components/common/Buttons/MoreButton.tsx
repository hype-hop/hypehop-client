import { Button, ButtonProps } from '@mui/material';

export default function MoreButton(props: ButtonProps) {
  return (
    <Button
      sx={{
        fontSize: '12px',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
        },
        color: 'grey.lessLight',
      }}
      {...props}
    >
      더보기
    </Button>
  );
}
