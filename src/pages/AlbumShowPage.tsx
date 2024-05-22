import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import BASE_URL from '../config';

import AlbumDetailInformation from '../components/album/AlbumDetail/AlbumDetailInformation';
import AlbumDetailTracks from '../components/album/AlbumDetail/AlbumDetailTracks';
import AlbumReviewSummary from '../components/review/AlbumReviewSummary';
import { AlbumData } from '../types/albumData';
import { Review } from '../types/review';
// import { Review } from '../types/review';

function AlbumShowPage() {
  const { id } = useParams();
  const [data, setData] = useState<AlbumData | null>(null);

  const parsedReviews = (reviews: Review[]) => {
    return reviews.splice(0, 4);
  };

  useEffect(() => {
    (async () => {
      try {
        const album = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();

        if (album.reviews.length > 4) {
          album.reviews = parsedReviews(album.reviews);
        }

        setData(album);
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

  return (
    data && (
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
        <Box>
          <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
            앨범 정보
          </Typography>
          <AlbumDetailInformation data={data} />
        </Box>
        <AlbumDetailTracks data={data} />
        <Box>
          <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
            앨범 리뷰
          </Typography>

          <Box sx={{ display: 'flex', columnGap: 2, overflowX: { xs: 'auto' }, maxWidth: { xs: '100%' } }}>
            {data.reviews?.length > 0 ? (
              data.reviews?.map((review) => (
                <Box
                  key={`album-review-${review._id}`}
                  sx={{
                    minWidth: '282px',
                    maxWidth: '282px',
                    border: '1px solid rgb(52, 52, 52)',
                    borderRadius: '0px 16px 16px 16px',
                    p: 2,
                  }}
                >
                  <AlbumReviewSummary review={review} />
                </Box>
              ))
            ) : (
              <Box>
                <Typography mb={2}>앨범 리뷰가 없습니다. 첫 리뷰를 작성해주세요!</Typography>
                <Link to={`/album?keyword=${data?.id}`}>
                  <Button
                    sx={{
                      background: 'rgb(152, 72, 255)',
                      borderRadius: '4px',
                      height: '32px',
                    }}
                  >
                    작성하러 가기
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    )
  );
}

export default AlbumShowPage;
