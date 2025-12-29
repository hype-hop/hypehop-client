import { Box, Grid } from '@mui/material';
import { AlbumSearchResultListProps } from '../album/AlbumSearch/types';
import { AlbumSearchResult } from '../../types/albumSearch';

interface TopsterGridProps {
  results: AlbumSearchResult[] | null;
  row: number;
  col: number;
}

function TopsterGrid({ results }: { results: AlbumSearchResult[] | null }) {
  return (
    <Grid container spacing={1}>
      {results?.map((album, index) => (
        <Grid sx={{ aspectRatio: '1 / 1' }} size={{ xs: 4 }}>
          <Box sx={{ aspectRatio: '1 / 1' }}>
            {album?.images[0].url !== '' ? (
              <img src={album?.images[0].url} alt={album.images[0].url} style={{ width: '100%' }} />
            ) : (
              <Box sx={{ width: '100%', height: '100%', aspectRatio: '1 / 1', backgroundColor: 'grey.darkest' }} />
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
      <h1>Topsters Page</h1>
      <TopsterGrid results={[]} />
    </div>
  );
}

export default Topsters;
