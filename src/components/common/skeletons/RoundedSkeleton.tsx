import { Skeleton, SkeletonOwnProps } from '@mui/material';

export default function RoundedSkeleton(props: SkeletonOwnProps) {
  return <Skeleton variant="rounded" height="12px" {...props} />;
}
