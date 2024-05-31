import { Container } from '@mui/material';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      sx={{
        '@media (min-width:900px)': {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
        '@media (min-width:0px)': { paddingLeft: '16px', paddingRight: '16px' },
        pt: 5,
      }}
    >
      {children}
    </Container>
  );
}
