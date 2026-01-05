import { Box, Grid } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';

interface TopsterGridProps {
  results: AlbumSearchResult[] | null;
  row?: number;
  col?: number;
}

function TopsterGrid({ results, row = 3, col = 3 }: TopsterGridProps) {
  return (
    <Grid container spacing={1}>
      {results?.map((album, _) => (
        <Grid sx={{ aspectRatio: '1 / 1' }} size={{ xs: row }}>
          <Box sx={{ aspectRatio: '1 / 1' }}>
            {album?.images[0].url !== '' ? (
              <img src={album?.images[0].url} alt={album.images[0].url} style={{ width: '100%' }} />
            ) : (
              <Box sx={{ width: '150px', height: '150px', aspectRatio: '1 / 1', backgroundColor: 'grey.darkest' }} />
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

function Topsters({ newSelectedAlbum }: { newSelectedAlbum: AlbumSearchResult | null }) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        padding: '11px',
        backgroundColor: 'grey.darker1',
        maxWidth: { sm: '720px' },
        minWidth: { md: '720px' },
        aspectRatio: '1 / 1',
      }}
    >
      <TopsterGrid results={newSelectedAlbum ? [newSelectedAlbum] : []} />
    </Box>
  );
}

export default Topsters;
