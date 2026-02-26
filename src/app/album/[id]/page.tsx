import { Box } from '@mui/material';
import AlbumReviewPreviews from './albumReviewPreviews/AlbumReviewPreviews';
import AlbumInformation from './albumInformation/AlbumInformation';
import BASE_URL from '../../../config';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const album = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();

  return {
    title: `${album?.pageTitle} - HypeHop`,
    description: album?.pageDescription,
    imgSrc: album?.albumData.images[1].url,
  };
}

async function AlbumShowPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <AlbumInformation id={id} />
      <AlbumReviewPreviews id={id} />
    </Box>
  );
}

export default AlbumShowPage;
