import { Box, Rating, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AlbumSearchResult } from '../../types/albumSearch';
import PRECISION from '../../constants/ratingPrecision';
import { typography } from '../../constants/themeValue';

const starIconStyle = {
  marginTop: '0.5px',
  marginBottom: '0.5px',
  // width: '15px',
  // height: '15px',
  color: 'star.main',
};

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
        height: '74px',
        backgroundColor: 'rgb(22, 22, 22)',
        borderRadius: '1 6px',
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

      <Box display="flex">
        <Rating
          name="albumRating"
          value={rating}
          icon={<StarIcon sx={{ ...starIconStyle }} />}
          emptyIcon={<StarBorderIcon sx={{ ...starIconStyle }} />}
          precision={PRECISION}
          onChange={(_, value: number | null) => {
            setRating(value!);
          }}
        />
        <Typography
          fontSize={typography.size.md}
          fontWeight="600"
          sx={{ ml: '2px', alignContent: 'center', justifyContent: 'center' }}
        >
          {Number(rating).toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
}

export default RatingAlbum;
