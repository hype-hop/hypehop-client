import { Box } from '@mui/material';
import RoundedSkeleton from '../RoundedSkeleton';
import MyReviewsSkeleton from './MyReviewsSkeleton';

export default function MyInformationPageSkeleton() {
  return (
    <Box>
      <Box sx={{ display: 'flex', columnGap: '24px', mb: '40px', alignItems: 'center' }}>
        <RoundedSkeleton sx={{ borderRadius: '50%', width: '100px' }} height="100px" />

        <Box sx={{ width: '70%', height: '100%' }}>
          <RoundedSkeleton width="30%" sx={{ marginBottom: 1 }} />
          <RoundedSkeleton width="30%" />
        </Box>
      </Box>
      <MyReviewsSkeleton />
    </Box>
  );
}
