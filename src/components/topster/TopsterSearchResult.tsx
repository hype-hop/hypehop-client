import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import { TopsterSearchResultProps } from '../album/AlbumSearch/types';

function InitialTopterGrid() {
  return (
    <Grid sx={{ cursor: 'pointer' }} width="100%" container spacing={1}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid
          sx={{ minWidth: { sm: '116px' }, aspectRatio: '1 / 1', backgroundColor: 'grey.darkest' }}
          size={{ xs: 4 }}
          key={index}
        />
      ))}
    </Grid>
  );
}

function TopsterSearchResult({ searchResult }: TopsterSearchResultProps) {
  if (searchResult?.length === 0) {
    return <InitialTopterGrid />;
  }

  return (
    <Grid sx={{ cursor: 'pointer' }} width="100%" container spacing={1}>
      {searchResult?.map((album, index) => (
        <Grid sx={{ minWidth: { sm: '116px' }, aspectRatio: '1 / 1' }} size={{ xs: 4 }}>
          <Box sx={{ aspectRatio: '1 / 1' }}>
            <img src={album?.images[0].url} alt={album.images[0].url} style={{ width: '100%' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopsterSearchResult;
