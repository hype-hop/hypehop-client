import RoundedSkeleton from './RoundedSkeleton';

export default function AlbumCoverSkeleton() {
  return (
    <RoundedSkeleton
      sx={{
        width: '100%',
        minWidth: '200px',
        minHeight: '200px',
        aspectRatio: 1 / 1,
      }}
      height="auto"
    />
  );
}
