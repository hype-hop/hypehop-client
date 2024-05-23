import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner/banner.jpg';

function Banner() {
  return (
    <Link to="/album">
      <Box
        sx={{
          mt: '40px',
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <img src={banner} alt="Banner" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
      </Box>
    </Link>
  );
}

export default Banner;
