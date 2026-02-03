'use client';

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OtherAlbumReviews from './OtherAlbumReviews';
import { Review } from '../../../../types/review';
import BASE_URL from '../../../../config';

function AlbumReviewPreviews({ id }: { id: string | string[] | undefined }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
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

  return (
    <Box>
      <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
        앨범 리뷰
      </Typography>
      <OtherAlbumReviews reviews={reviews} albumId={id!.toString()} />
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
  );
}

export default AlbumReviewPreviews;
