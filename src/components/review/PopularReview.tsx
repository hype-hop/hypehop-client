'use client';

import { Grid } from '@mui/material';
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
    <Grid container spacing={2}>
      {reviews?.slice(0, 8).map((review, index) => {
        return (
          <Grid key={review._id} size={{ xs: 12, sm: 6, md: 6 }}>
            <Link href={`/album/review/${review._id}`} style={{ textDecoration: 'none' }}>
              <ReviewChartCard review={review} index={index} />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ReviewChart;
