import { Box } from '@mui/material';
import RoundedSkeleton from '../RoundedSkeleton';

export default function AlbumDetailTracksSkeleton() {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            key={index}
          >
            <Box display="flex" width="100%">
              <RoundedSkeleton width="50%" />

              <Box>
                <RoundedSkeleton width="50%" />
                <RoundedSkeleton width="50%" />
              </Box>
            </Box>

            <RoundedSkeleton width="10%" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
