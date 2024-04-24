import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import BASE_URL from '../config';
import { AlbumDetailType } from '../types/albumDetail';
import { useAuth } from '../AuthenticationContext';
import AlbumDetailInformation from '../components/album/AlbumDetail/AlbumDetailInformation';
// import AlbumDetailTracks from '../components/AlbumDetail/AlbumDetailTracks';
import AlbumReviewSummary from '../components/review/AlbumReviewSummary';

function AlbumShowPage() {
  const { id } = useParams();
  const [data, setData] = useState<AlbumDetailType | null>(null);

  const [user] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  /** 아티스트의 다른 앨범 가져오기 */

  // const getArtistOtherAlbum = async (id: string) => {
  //   const result = await (await fetch(`${BASE_URL}/api/artists/${id}/albums`)).json();

  //   return result;
  // };

  // useEffect(() => {
  //   (async () => {
  //     if (data) {
  //       const promiseList = data?.albumData.artists.map(({ id }) => getArtistOtherAlbum(id));
  //       await Promise.all(promiseList!);
  //     }
  //   })();
  // }, [data]);

  if (!user) {
    navigate('/login');
  }

  return (
    data && (
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
          <Box>
            <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
              앨범 정보
            </Typography>
            <AlbumDetailInformation data={data} />
          </Box>
          {/* <AlbumDetailTracks data={data} /> */}

          <Box>
            <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
              다른 리뷰
            </Typography>
            {data.reviews.map((review) => (
              <Box sx={{ width: '266px', borderRadius: '16px', backgroundColor: ' rgb(22, 22, 22);' }}>
                <AlbumReviewSummary review={review} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    )
  );
}

export default AlbumShowPage;
