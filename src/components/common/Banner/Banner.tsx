import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function Banner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Link href="/album" style={{ textDecoration: 'none' }}>
      {isMobile ? (
        <Box
          sx={{
            mt: '40px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', height: '260px' }}>
            <Image src="/banner/bannerBg.jpg" alt="Banner" fill />
          </Box>
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
            <Box sx={{ position: 'relative', width: '120px', height: '40px', margin: '0 auto' }}>
              <Image fill src="/banner/bannerBtn.png" alt="Banner Button" objectFit="contain" />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '260px',
            mt: '40px',
            overflow: 'hidden',
          }}
        >
          <Image fill src="/banner/banner.jpg" alt="Banner" objectFit="contain" />
        </Box>
      )}
    </Link>
  );
}

export default Banner;
