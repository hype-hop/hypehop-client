'use client';

import { Box, Skeleton } from '@mui/material';
import RoundedSkeleton from '../RoundedSkeleton';

export default function AlbumDetailInformationSkeleton() {
  return (
    <Box sx={{ display: 'flex', columnGap: 2 }}>
      <Skeleton variant="rounded" sx={{ width: { xs: '42px', md: '60px' }, height: { xs: '42px', md: '60px' } }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, textAlign: 'left', width: '100%' }}>
        <RoundedSkeleton width="25%" />
        <RoundedSkeleton width="15%" />
        <RoundedSkeleton width="17%" />
      </Box>
    </Box>
  );
}
