import { Box, Typography } from '@mui/material';
import INITIAL_RATING_VALUE from '../../../constants/rating';
import { IAlbumSearchContext, useAlbumSearchContext } from './AlbumSearchContext';
import type { AlbumSearchResultItemProps } from './types';

export default function AlbumSearchResultItem({
  album,
  setSelectedAlbum,
  setResult,
  setKeyword,
  index,
}: AlbumSearchResultItemProps) {
  const { pointedResultIndex, setPointedResultIndexDirectly } = useAlbumSearchContext() as IAlbumSearchContext;
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: `${pointedResultIndex === index ? 'rgb(46, 45, 45)' : ''}`,
      }}
      onClick={() => {
        setSelectedAlbum({ ...album, rating: INITIAL_RATING_VALUE });
        setKeyword(null);
        setResult(null);
        setPointedResultIndexDirectly(0);
      }}
      onMouseEnter={() => setPointedResultIndexDirectly(index)}
      onMouseLeave={() => setPointedResultIndexDirectly(-1)}
    >
      <Box
        component="img"
        width="60px"
        height="60px"
        src={album.images[1].url}
        sx={{ borderRadius: '6.6px', marginRight: '20px' }}
      />
      <Box sx={{ textAlign: 'left' }}>
        <Typography fontWeight="fontWeightBold">{album.name}</Typography>
        <Box sx={{ display: 'flex' }}>
          {album.artists.map((artist, index) => (
            <Typography key={`artist-${artist.id}`} color="grey.main">
              {artist.name} {album.artists.length > 1 && index < album.artists.length - 1 && '· '}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
