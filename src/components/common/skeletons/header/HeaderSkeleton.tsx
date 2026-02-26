import { Box, Skeleton } from '@mui/material';

function HeaderSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Skeleton variant="circular" width={32} height={32} />
    </Box>
  );
}
export default HeaderSkeleton;
