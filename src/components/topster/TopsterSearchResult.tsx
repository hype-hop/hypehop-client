import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import { AlbumSearchResultListProps } from '../album/AlbumSearch/types';

function InitialTopterGrid() {
  return (
    <Grid container spacing={1}>
      {Array.from({ length: 9 }).map((_, index) => (
        <Grid sx={{ aspectRatio: '1 / 1', backgroundColor: 'grey.darkest' }} size={{ xs: 4 }} key={index} />
      ))}
    </Grid>
  );
}

function TopsterSearchResult({
  searchResult,
  setSelectedAlbum,
  setSearchResult,
  setKeyword,
}: AlbumSearchResultListProps) {
  if (searchResult?.length === 0) {
    return <InitialTopterGrid />;
  }

  return (
    <Grid container spacing={1}>
      {searchResult?.map((album, index) => (
        <Grid sx={{ aspectRatio: '1 / 1' }} size={{ xs: 4 }}>
          <Box sx={{ aspectRatio: '1 / 1' }}>
            <img src={album?.images[0].url} alt={album.images[0].url} style={{ width: '100%' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopsterSearchResult;
