import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import { AlbumSearchResult } from '../../types/albumSearch';

interface TopsterSearchResultProps {
  results: AlbumSearchResult[] | null;
}

function InitialTopsterGrid() {
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

function TopsterSearchResult({ results }: TopsterSearchResultProps) {
  if (!results || results.length === 0) {
    return <InitialTopsterGrid />;
  }

  return (
    <Grid sx={{ cursor: 'pointer' }} width="100%" container spacing={1}>
      {results.map((album, index) => (
        <Grid
          key={album.id || index}
          sx={{
            minWidth: { sm: '116px' },
            aspectRatio: '1 / 1',
            transition: 'opacity 0.15s ease',
            '&:active': { opacity: 0.5 },
          }}
          size={{ xs: 4 }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('application/json', JSON.stringify(album));
            e.dataTransfer.effectAllowed = 'copy';
            const target = e.currentTarget as HTMLElement;
            target.style.opacity = '0.5';
          }}
          onDragEnd={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.opacity = '1';
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
