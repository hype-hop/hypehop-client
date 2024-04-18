import { Box, Rating, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AlbumSearchResult } from '../types/albumSearch';
import INITIAL_RATING_VALUE from '../constants/rating';

const starIconStyle = {
  marginTop: '0.5px',
  marginBottom: '0.5px',
  width: '15px',
  height: '15px',
  color: 'star.main',
};

type RatingAlbumProps = {
  album: AlbumSearchResult;
  rating: number;
  setRating: (_rating: number) => void;
};

function RatingAlbum({ album, rating, setRating }: RatingAlbumProps) {
  const { name, artists } = album;
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'rgb(52,52,52)',
        borderRadius: '16px',
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography textAlign="left" fontWeight="fontWeightBold">
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

      <Rating
        name="albumRating"
        value={rating}
        icon={<StarIcon sx={{ ...starIconStyle }} />}
        emptyIcon={<StarBorderIcon sx={{ ...starIconStyle }} />}
        precision={INITIAL_RATING_VALUE}
        onChange={(_, value: number | null) => {
          setRating(value!);
        }}
      />
    </Box>
  );
}

export default RatingAlbum;
