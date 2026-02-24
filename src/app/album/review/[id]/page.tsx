import { Box } from '@mui/material';

import { notFound } from 'next/navigation';
import Comment from '../../../../components/common/Comment';
import ReviewDetail from '../../../../components/review/ReviewDetail';
import AlbumDetailInformationSkeleton from '../../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumReviewSummarySkeleton from '../../../../components/common/skeletons/AlbumReviewSummarySkeleton';
import { fetchReviewById } from '../../../../api/reviews';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const data = await fetchReviewById(id);

  if (data === null) {
    return {
      title: `리뷰를 불러올 수 없습니다 - HypeHop`,
      description: `리뷰를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`,
    };
  }

  return {
    title: `${data.pageTitle} - HypeHop`,
    description: `${data.pageDescription}`,
    imgSrc: data.review?.thumbnail,
  };
}

async function ReviewShowPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (id === 'undefined') {
    notFound();
  }

  const data = await fetchReviewById(id);

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
