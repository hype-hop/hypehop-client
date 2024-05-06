import { Box, Container } from '@mui/material';
import AlbumChart from '../components/album/AlbumChart';
import PopularReview from '../components/review/PopularReview';
import ReviewMain from '../components/review/ReviewMain';
import FloatingActionButton from '../components/common/FloatingActionButton';

function MainPage() {
  return (
    <Container className="Main">
      <Box sx={{ display: { xs: 'grid', sm: 'grid', md: 'flex', lg: 'flex' } }}>
        <Box width="100%">
          <ReviewMain />

          <AlbumChart />
        </Box>

        <Box>
          <PopularReview />
        </Box>
      </Box>

      <FloatingActionButton />
    </Container>
  );
}

export default MainPage;
