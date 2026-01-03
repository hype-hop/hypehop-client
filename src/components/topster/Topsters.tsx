import { Box, Grid } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';

interface TopsterGridProps {
  results: AlbumSearchResult[] | null;
  row: number;
  col: number;
}

function TopsterGrid({ results }: { results: AlbumSearchResult[] | null }) {
  return (
    <Grid container spacing={1}>
      {results?.map((album, _) => (
        <Grid sx={{ aspectRatio: '1 / 1' }} size={{ xs: 3 }}>
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

function Topsters() {
  return (
    <div>
      <TopsterGrid results={[]} />
    </div>
  );
}

export default Topsters;
