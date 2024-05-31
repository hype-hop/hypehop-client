import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { AlbumForReview } from '../../../types/albumReview';
import { AlbumSearchResult } from '../../../types/albumSearch';
import INITIAL_RATING_VALUE from '../../../constants/rating';
import { IAlbumSearchContext, useAlbumSearchContext } from './AlbumSearchContext';

export default function AlbumSearchResultItem({
  album,
  setSelectedAlbum,
  setSearchResult,
  setKeyword,
  index,
}: {
  album: AlbumSearchResult;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  index: number;
}) {
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
        setSearchResult(null);
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
            <Typography color="grey.main">
              {artist.name} {album.artists.length > 1 && index < album.artists.length - 1 && '· '}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
