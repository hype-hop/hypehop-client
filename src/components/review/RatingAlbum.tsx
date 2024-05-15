import { Box, Typography } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';
import { typography } from '../../constants/themeValue';

import CustomStar from './CustomStar';

type RatingAlbumProps = {
  album: AlbumSearchResult;
  rating: number;
  setRating: (_rating: number) => void;
};

function RatingAlbum({ album, rating, setRating }: RatingAlbumProps) {
  const { name, artists, images } = album;

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'rgb(22, 22, 22)',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'rgb(52, 52, 52)',
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: '10px',
      }}
    >
      <Box display="flex" alignItems="center">
        <Box component="img" width="60px" height="60px" src={images[1].url} sx={{ borderRadius: '6.6px' }} />
        <Box sx={{ ml: '16px' }}>
          <Typography textAlign="left" fontWeight={typography.weight.bold}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {artists.map(({ name }, index) => (
              <Typography color="grey.main">
                {name} {artists.length > 1 && index < artists.length - 1 && '· '}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Box display="flex" sx={{ minWidth: 'fit-content' }}>
        <CustomStar
          name="albumRating"
          value={rating}
          onChange={(value) => {
            setRating(value);
          }}
          activeColor="#ffd700"
        />

        <Typography
          fontSize={typography.size.md}
          fontWeight="600"
          sx={{ ml: '4px', alignContent: 'center', justifyContent: 'center', width: '17px' }}
        >
          {Number(rating).toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
}

export default RatingAlbum;
