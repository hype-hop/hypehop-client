'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { useParams } from 'next/navigation';
import Comment from '../../../../components/common/Comment';
import ReviewDetail from '../../../../components/review/ReviewDetail';
import BASE_URL from '../../../../config';
import PageNotFound from '../../../../components/common/Error/PageNotFound';
import AlbumDetailInformationSkeleton from '../../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumReviewSummarySkeleton from '../../../../components/common/skeletons/AlbumReviewSummarySkeleton';
import { ReviewEdit } from '../../../../types/review';

function ReviewShowPage() {
  const { id } = useParams();
  const [data, setData] = useState<ReviewEdit | null>(null);
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === 'undefined') {
          setNotFound(true);
          return;
        }
        const response = await fetch(`${BASE_URL}/album/api/review/${id}`);
        if (!response.ok) {
          setNotFound(true);
          return;
        }
        const result = await response.json();
        setData(result);
        const response2 = await fetch(`${BASE_URL}/api/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const result2 = await response2.json();
        setUser(result2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (notFound) {
    return <PageNotFound />;
  }

  return data ? (
    <div>
      <ReviewDetail data={data} />

      <Comment reviewId={id!.toString()} user={user} />
    </div>
  ) : (
    <Box>
      <Box mb={4}>
        <AlbumDetailInformationSkeleton />
      </Box>
      <AlbumReviewSummarySkeleton />
    </Box>
  );
}

export default ReviewShowPage;
