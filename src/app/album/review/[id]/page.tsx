import { Box } from '@mui/material';

import { notFound } from 'next/navigation';
import Comment from '../../../../components/common/Comment';
import ReviewDetail from '../../../../components/review/ReviewDetail';
import BASE_URL from '../../../../config';
import AlbumDetailInformationSkeleton from '../../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumReviewSummarySkeleton from '../../../../components/common/skeletons/AlbumReviewSummarySkeleton';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const response = await fetch(`${BASE_URL}/album/api/review/${id}`);

  const data = await response.json();

  console.log('this is meta', data);

  return {
    title: `${data?.pageTitle} - HypeHop`,
    description: `${data?.pageDescription}`,
    imgSrc: data?.review?.thumbnail,
  };
}

async function ReviewShowPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const response = await fetch(`${BASE_URL}/album/api/review/${id}`);

  const data = await response.json();

  return data ? (
    <div>
      <ReviewDetail data={data} />
      <Comment reviewId={id!.toString()} />
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
