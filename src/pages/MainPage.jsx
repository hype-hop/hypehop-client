import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumChart from '../components/album/AlbumChart';
import PopularReview from '../components/review/PopularReview';
import ReviewMain from '../components/review/ReviewMain';
import FloatingActionButton from '../components/common/FloatingActionButton';
import { useAuth } from '../AuthenticationContext';
import EditProfile from '../components/common/EditProfile';
import AlbumSearch from '../components/album/AlbumSearch';

function MainPage() {
  const navigate = useNavigate();
  const [user] = useAuth();
  const [searchResult, setSearchResult] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const goToAlbum = async () => {
      try {
        navigate(`/album/${selectedAlbum.id}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    goToAlbum();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlbum]);

  return (
    <>
      {user && user?.name === undefined ? (
        <EditProfile userId={user?._id} />
      ) : (
        <>
          <Box>
            <AlbumSearch
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              setSelectedAlbum={setSelectedAlbum}
            />
          </Box>
          <Box sx={{ display: { md: 'flex', lg: 'flex' } }}>
            {/* <Box sx={{ width: { xs: '350px', sm: '100%', md: '100%', lg: '100%' } }}> */}
            <Box sx={{ mt: '40px' }}>
              <ReviewMain />
              <AlbumChart />
            </Box>
            <Box sx={{ mt: '40px' }}>
              <PopularReview />
            </Box>
          </Box>
        </>
      )}
      <FloatingActionButton />
    </>
  );
}

export default MainPage;
