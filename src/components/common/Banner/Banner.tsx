import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import banner from '../../../assets/banner/banner.jpg';
import bannerBg from '../../../assets/banner/bannerBg.jpg';
import bannerBtn from '../../../assets/banner/bannerBtn.png';

function Banner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Link to="/album" style={{ textDecoration: 'none' }}>
      {isMobile ? (
        <Box
          sx={{
            mt: '40px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img src={bannerBg} alt="Banner" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', top: '40px', left: '60%', transform: 'translateX(-50%)', width: '100%' }}>
            <Typography fontSize="15px" fontWeight="600" color="black">
              HYPE_HOP
            </Typography>
            <Typography
              sx={{ mt: '5px', mb: '5px' }}
              fontSize={{ xs: '30px', sm: '30px' }}
              fontWeight="900"
              color="black"
            >
              RENEWAL OPEN
            </Typography>
            <Typography fontSize={{ xs: '11px', sm: '13px', md: '15px' }} fontWeight="600" color="black">
              새롭게 단장하여 돌아온 하입합에서 좋아하는 앨범 리뷰를 남겨보세요
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', width: '100%', bottom: '45px', left: '60%', transform: 'translateX(-50%)' }}>
            <img src={bannerBtn} alt="Banner Button" style={{ width: '228px', height: '43px' }} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            mt: '40px',
            overflow: 'hidden',
          }}
        >
          <img src={banner} alt="Banner" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </Box>
      )}
    </Link>
  );
}

export default Banner;
