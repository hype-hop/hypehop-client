'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewChartCard from './PopularReviewCard';
import { ReviewsRank } from '../../types/review';
import { fetchPopularReviews } from '../../api/reviews';

function ReviewChart() {
  const [reviews, setReviews] = useState<ReviewsRank[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedReviews = await fetchPopularReviews();
      setReviews(fetchedReviews || []);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        flexWrap: { xs: 'nowrap', md: 'none' },
        overflowX: { xs: 'auto', md: 'visible' },
        justifyContent: 'flex-start',
        gridTemplateColumns: { md: 'repeat(2, 1fr)' },
        gridTemplateRows: { md: 'repeat(4, auto)' },
        gridAutoFlow: { md: 'column' },
        gap: 2,
      }}
    >
      {reviews?.slice(0, 8).map((review, index) => (
        <Box key={review._id}>
          <Link href={`/album/review/${review._id}`} style={{ textDecoration: 'none' }}>
            <ReviewChartCard review={review} index={index} />
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default ReviewChart;
