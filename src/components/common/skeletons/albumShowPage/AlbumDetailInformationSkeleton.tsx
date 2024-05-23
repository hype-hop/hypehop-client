import { Box } from '@mui/material';
import RoundedSkeleton from '../RoundedSkeleton';

export default function AlbumDetailInformationSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        padding: '16px',
        border: '1px solid rgb(52,52,52)',
        borderRadius: '16px',
        borderTopLeftRadius: 0,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <RoundedSkeleton width="60px" height="60px" sx={{ marginRight: '20px' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, textAlign: 'left', width: '100%' }}>
          <RoundedSkeleton width="25%" />
          <RoundedSkeleton width="15%" />
          <RoundedSkeleton width="17%" />
        </Box>
      </Box>
    </Box>
  );
}
