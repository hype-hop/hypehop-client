import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Box, Button, Skeleton, Typography } from '@mui/material';

import BASE_URL from '../config';
import MetaTag from '../components/common/Header/MetaTag';
import AlbumDetailInformation from '../components/album/AlbumDetail/AlbumDetailInformation';
// import AlbumDetailTracks from '../components/album/AlbumDetail/AlbumDetailTracks';

import AlbumReviewSummary from '../components/review/AlbumReviewSummary';
import { AlbumData } from '../types/albumData';
import { Review } from '../types/review';
import AlbumDetailInformationSkeleton from '../components/common/skeletons/albumShowPage/AlbumDetailInformationSkeleton';
import AlbumDetailTracksSkeleton from '../components/common/skeletons/albumShowPage/AlbumDetailTracksSkeleton';
import AlbumDetailTracksToggle from '../components/album/AlbumDetail/AlbumDetailTracksToggle';

function NoAlbumView({ albumId }) {
  return (
    <Box>
      <Typography mb={2}>앨범 리뷰가 없습니다. 첫 리뷰를 작성해주세요!</Typography>
      <Link to={`/album/write/${albumId}`} style={{ textDecoration: 'none' }}>
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
  );
}

function AlbumShowPage() {
  const { id } = useParams();
  const [data, setData] = useState<AlbumData | undefined>();
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`${BASE_URL}/album/api/${id}/scroll?page=${page}`);
      const result = await response.json();
      setReviews((prevReviews) => [...(prevReviews || []), ...result.reviews]);
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

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

  useEffect(() => {
    (async () => {
      try {
        // const album = await (await fetch(`${BASE_URL}/album/api/${id}/scroll?page=${1}`)).json();
        const album = await fetchData(1);

        setReviews(album.reviews);
        setTotalPage(album.totalPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPage));
    fetchData(page + 1);
  };

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
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '40px' }}>
      <MetaTag title={data?.pageTitle} description={data?.pageDescription} imgSrc={data?.albumData.images[1].url} />
      <Box>
        <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
          앨범 정보
        </Typography>

        {/*  {data?.spotify_artist_genre.map((genre) => <Typography>{genre}</Typography>)} */}

        {data ? <AlbumDetailInformation data={data} /> : <AlbumDetailInformationSkeleton />}
      </Box>

      {/*  {data ? <AlbumDetailTracks data={data} /> : <AlbumDetailTracksSkeleton />} */}
      {data ? <AlbumDetailTracksToggle data={data} /> : <AlbumDetailTracksSkeleton />}

      <Box>
        <Typography fontSize="24px" fontWeight="bold" mb="16px" align="left">
          앨범 리뷰
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(3,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4, 1fr)' },
            gap: 2,
            overflowX: { xs: 'auto' },
            maxWidth: { xs: '100%' },
          }}
        >
          {!reviews &&
            Array.from({ length: 3 }).map(() => (
              <Skeleton
                variant="rounded"
                sx={{
                  minWidth: '282px',
                  maxWidth: '282px',
                  height: '183px',
                  p: 2,
                }}
              />
            ))}
          {data && reviews && reviews.length === 0 && <NoAlbumView albumId={id} />}

          {reviews?.length > 0 &&
            reviews?.map((review) => (
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
            ))}
        </Box>
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Button
            onClick={loadMore}
            variant="outlined"
            disabled={page >= totalPage}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            }}
          >
            더보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AlbumShowPage;
