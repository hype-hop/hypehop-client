import { Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlbumData } from '../../../../types/albumData';
import BASE_URL from '../../../../config';
import AlbumDetailInformation from '../../../../components/album/AlbumDetail/AlbumDetailInformation';
import AlbumDetailInformationSkeleton from '../../../../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import Tracks from '../../../../components/track/Tracks';

export default function AlbumInformation({ id }: { id: string | string[] | undefined }) {
  const [data, setData] = useState<AlbumData | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const album = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();

        setData(album);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);
  return (
    <Box>
      <Box>
        <Typography component="div" fontSize="24px" fontWeight="bold" mb={2.5} align="left">
          앨범 정보
        </Typography>
        {data ? <AlbumDetailInformation data={data} /> : <AlbumDetailInformationSkeleton />}
      </Box>
      {data ? (
        <Tracks album={data!} albumName={data?.albumData?.name || ''} />
      ) : (
        <Skeleton variant="rounded" height="150px" />
      )}
    </Box>
  );
}
