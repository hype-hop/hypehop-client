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

function TopsterSearchResult({ result, setSelectedAlbum }: TopsterSearchResultProps) {
  if (!result || result.length === 0) {
    return <InitialTopterGrid />;
  }

  return (
    <Grid sx={{ cursor: 'pointer' }} width="100%" container spacing={1}>
      {result.map((album, index) => (
        <Grid
          key={album.id || index}
          sx={{ minWidth: { sm: '116px' }, aspectRatio: '1 / 1' }}
          size={{ xs: 4 }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(album));
            e.dataTransfer.effectAllowed = 'copy';
          }}
          onDragEnd={() => {
            setSelectedAlbum((prev) => [...prev!, album]);
          }}
        >
          <Box sx={{ aspectRatio: '1 / 1', cursor: 'grab', '&:active': { cursor: 'grabbing' } }}>
            <img src={album?.images[0].url} alt={album.images[0].url} style={{ width: '100%' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopsterSearchResult;
