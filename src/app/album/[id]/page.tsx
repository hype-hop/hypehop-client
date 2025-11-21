'use client';

import React, { useState, useEffect } from 'react';

import { Box, Button, Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../AuthenticationContext';
import { AlbumData } from '../../../types/albumData';
import { Review } from '../../../types/review';
import BASE_URL from '../../../config';
import AlbumDetailInformation from '../../../components/album/AlbumDetail/AlbumDetailInformation';
import AlbumDetailInformationSkeleton from '../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumReviewSummary from '../../../components/review/AlbumReviewSummary';
import Tracks from '../../../components/track/Tracks';

function NoAlbumView({ albumId }) {
  return (
    <Box
      sx={{
        minWidth: '282px',
        maxWidth: '282px',
      }}
    >
      <Typography mt={2} mb={2}>
        작성하신 리뷰가 없습니다. 리뷰를 작성해보세요!
      </Typography>
      <Link href={`/album/write/${albumId}`} style={{ textDecoration: 'none' }}>
        <Button
          sx={{
            background: 'rgb(152, 72, 255)',
            borderRadius: '4px',
            height: '32px',
          }}
        >
          작성하러 가기
        </Button>
      </Link>
    </Box>
  );
}

function AlbumShowPage() {
  const { id } = useParams();
  const [data, setData] = useState<AlbumData | undefined>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useAuth();

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`${BASE_URL}/album/api/${id}/scroll?page=${page}`);
      const result = await response.json();
      setReviews((prevReviews) => [...(prevReviews || []), ...result.reviews]);
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const album = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();

        setData(album);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        // const album = await (await fetch(`${BASE_URL}/album/api/${id}/scroll?page=${1}`)).json();
        const album = await fetchData(1);

        setReviews(album.reviews);
        setTotalPage(album.totalPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPage));
    fetchData(page + 1);
  };

  const userId = user?._id;

  const hasUserReviewed = reviews?.some((review) => review?.user?._id === userId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <Box>
        <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
          앨범 정보
        </Typography>
        {data ? <AlbumDetailInformation data={data} /> : <AlbumDetailInformationSkeleton />}
      </Box>
      <Tracks album={data!} albumName={data?.albumData?.name || ''} />

      <Box>
        <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
          앨범 리뷰
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(3,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4, 1fr)' },
            gap: 2,
            overflowX: { xs: 'auto' },
            maxWidth: { xs: '100%' },
          }}
        >
          {!reviews &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={`reviews-skeleton-${index}`}
                variant="rounded"
                sx={{
                  minWidth: '282px',
                  maxWidth: '282px',
                  height: '183px',
                  p: 2,
                }}
              />
            ))}
          {/* {data && reviews && reviews.length === 0 && <NoAlbumView albumId={id} />} */}
          {data && reviews && (reviews.length === 0 || !user || !hasUserReviewed) && <NoAlbumView albumId={id} />}

          {reviews?.length > 0 &&
            reviews?.map((review) => (
              <Box
                key={`album-review-${review._id}`}
                sx={{
                  minWidth: '282px',
                  maxWidth: '282px',
                  border: '1px solid rgb(52, 52, 52)',
                  borderRadius: '0px 16px 16px 16px',
                  p: 2,
                }}
              >
                <AlbumReviewSummary review={review} />
              </Box>
            ))}
        </Box>
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Button
            onClick={loadMore}
            variant="outlined"
            disabled={page >= totalPage}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            }}
          >
            더보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AlbumShowPage;
