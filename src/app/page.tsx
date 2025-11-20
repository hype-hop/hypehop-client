'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReviewMain from '../components/review/ReviewMain';
import FloatingActionButton from '../components/common/FloatingActionButton';
import TallyFeedbackBtn from '../components/common/TallyFeedbackBtn';
import AlbumSearch from '../components/album/AlbumSearch/AlbumSearch';
import Banner from '../components/common/Banner/Banner';
import { AlbumForReview } from '../types/albumReview';
import { AlbumSearchResult } from '../types/albumSearch';
import ReviewChart from '../components/review/ReviewChart';
import ReviewLanding from '../components/review/ReviewLanding';

function MainPage() {
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);

  useEffect(() => {
    if (selectedAlbum) {
      router.push(`/album/${selectedAlbum?.id}`);
    }
  }, [selectedAlbum]);

  return (
    <>
      <>
        <AlbumSearch
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setSelectedAlbum={setSelectedAlbum}
        />

        <ReviewLanding />

        <Box sx={{ mt: '40px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <ReviewMain />
          {/* <Banner /> */}
          <ReviewChart />
        </Box>
      </>

      <FloatingActionButton />
      <TallyFeedbackBtn />
    </>
  );
}

export default MainPage;
