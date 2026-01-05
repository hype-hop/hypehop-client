'use client';

import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReviewMain from '../components/review/ReviewMain';
import AlbumSearch from '../components/album/AlbumSearch/AlbumSearch';
import { AlbumForReview } from '../types/albumReview';
import { AlbumSearchResult } from '../types/albumSearch';
import PopularReview from '../components/review/PopularReview';
import ReviewLanding from '../components/review/ReviewLanding';
import Footer from '../components/common/Footer';
import MoreButton from '../components/common/Buttons/MoreButton';
import MagazinePreviewList from '../components/magazine/MagazinePreviewList';
import { Magazine } from '../components/magazine/magazine';

const dummyMagazines: Magazine[] = [
  {
    title: 'Tech Trends 2023',
    src: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004',
    desc: 'Exploring the latest in technology and innovation.',
  },
  {
    title: 'Health & Wellness',
    src: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004',
    desc: 'Tips and tricks for a healthier lifestyle.',
  },
  {
    title: 'Travel the World',
    src: 'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004',
    desc: 'Discover the most beautiful places on Earth.',
  },
];

function MainPage() {
  const router = useRouter();

  const [result, setResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);

  useEffect(() => {
    if (selectedAlbum) {
      router.push(`/album/${selectedAlbum?.id}`);
    }
  }, [selectedAlbum]);

  return (
    <>
      <AlbumSearch
        result={result}
        setResult={setResult}
        setSelectedAlbum={setSelectedAlbum}
        variant="album"
      />

      <ReviewLanding />

      <Box sx={{ mt: '40px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <ReviewMain />
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography variant="h1">인기 리뷰</Typography>
            <MoreButton href="/album/review" />
          </Box>
          <PopularReview />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
            <Typography variant="h1">매거진</Typography>
            <MoreButton href="/magazines" />
          </Box>
          <MagazinePreviewList magazinePreviews={dummyMagazines} />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default MainPage;
