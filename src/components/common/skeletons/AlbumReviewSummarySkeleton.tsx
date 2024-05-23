import { Box } from '@mui/material';
import RoundedSkeleton from './RoundedSkeleton';

export default function AlbumReviewSummarySkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '181px',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            whiteSpace: 'nowrap',
            columnGap: '7px',
            mb: '12px',
          }}
        >
          <RoundedSkeleton sx={{ width: 40, borderRadius: '50%' }} height={40} />
          <Box
            sx={{
              display: 'flex',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: '3px',
              columnGap: '8px',
            }}
          >
            <RoundedSkeleton width="50%" />

            <RoundedSkeleton />
          </Box>
        </Box>

        <Box>
          <RoundedSkeleton sx={{ marginBottom: 2 }} />
          <RoundedSkeleton />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: '13px',
          columnGap: '8px',
        }}
      >
        <RoundedSkeleton width="10%" />
        <RoundedSkeleton width="10%" />
      </Box>
    </Box>
  );
}
