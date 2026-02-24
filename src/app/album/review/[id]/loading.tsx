import { Box } from '@mui/material';
import AlbumDetailInformationSkeleton from '../../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumReviewSummarySkeleton from '../../../../components/common/skeletons/AlbumReviewSummarySkeleton';

export default function ReviewPageLoading() {
  return (
    <Box>
      <AlbumDetailInformationSkeleton />
      <AlbumReviewSummarySkeleton />
    </Box>
  );
}
