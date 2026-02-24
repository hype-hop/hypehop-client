import { Box } from '@mui/material';

import { notFound } from 'next/navigation';
import Comment from '../../../../components/common/Comment';
import ReviewDetail from '../../../../components/review/ReviewDetail';
import { fetchReviewById } from '../../../../api/reviews';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const review = await fetchReviewById(id);

  if (review === null) {
    return {
      title: `리뷰를 불러올 수 없습니다 - HypeHop`,
      description: `리뷰를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`,
    };
  }

  return {
    title: `${review.pageTitle} - HypeHop`,
    description: `${review.pageDescription}`,
    imgSrc: review.review?.thumbnail,
  };
}

async function ReviewShowPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const review = await fetchReviewById(id);

  return (
    review && (
      <Box>
        <ReviewDetail data={review} />
        <Comment reviewId={id!.toString()} />
      </Box>
    )
  );
}

export default ReviewShowPage;
