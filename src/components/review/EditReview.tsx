'use client';

import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button, Box, Input, Typography, MenuItem, Select, Rating } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import BASE_URL from '../../config';
import { ReviewEdit } from '../../types/review';
import { AlbumData } from '../../types/albumData';
import TrackEdit from '../track/TrackEdit';

const EditorBox = dynamic(() => import('./EditorBox.tsx').then((module) => module.default), { ssr: false });

function EditReview({ reviewData, albumData }: { reviewData: ReviewEdit; albumData: AlbumData }) {
  const router = useRouter();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [trackRatingForEdit, setTrackRatingForEdit] = useState(reviewData?.review.tracks);

  const handleTrackRatingForEditUpdate = (updatedTrackRatingForEdit) => {
    setTrackRatingForEdit(updatedTrackRatingForEdit);
  };
  // const [trackRating, setTrackRating] = useState<(number | null)[]>([]);

  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  const [formData, setFormData] = useState({
    title: '',
    status: 'public',
    albumRating: 0,
    body: '',
    bestTrackId: '',
    bestTrackName: '',
    previewUrl: '',
  });

  useEffect(() => {
    let reviewBodyData;
    if (reviewData) {
      if (reviewData.review.body === '') {
        reviewBodyData = ' ';
      } else {
        reviewBodyData = reviewData?.review.body;
      }
      // setReviewContent(reviewData?.review.body);
      setReviewContent(reviewBodyData);
      setFormData({
        ...formData,
        title: reviewData?.review.title,
        status: reviewData?.review.status || 'prviate',
        albumRating: reviewData?.review?.albumRating,
        // body: reviewData?.review.body,
        body: reviewBodyData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewData]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.albumRating !== 0 && formData.title !== '') {
      const combinedData = {
        ...formData,
        tracks: trackRatingForEdit,
        body: reviewContent,
      };

      fetch(`${BASE_URL}/album/api/review/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })
        .then((response) => response.json())
        .then(() => {
          router.push(`/album/review/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (formData.albumRating === 0) {
      if (typeof window !== 'undefined') {
        window.alert('평점을 입력해주세요');
      }
    } else if (formData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  return (
    <form>
      <Typography variant="h1">앨범 평점</Typography>
      <Box
        sx={{
          mt: '16px',
          background: 'rgb(22, 22, 22)',
          borderRadius: '16px',
          border: '1px solid rgb(52, 52, 52)',
          mb: '62px',
        }}
      >
        <Stack sx={{ height: '74px', justifyContent: 'center', ml: '20px', mr: '20px' }} spacing={1}>
          <Box sx={{ display: 'flex' }}>
            <Box
              component="img"
              width="60px"
              height="60px"
              src={reviewData?.review.thumbnail}
              sx={{ borderRadius: '6.6px', marginRight: '20px' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
              <Typography textAlign="left">
                {reviewData?.review?.artists ? (
                  <Typography align="left"> {reviewData?.review?.albumName}</Typography>
                ) : (
                  <Typography align="left">{reviewData?.review?.albumTitle.split('-', 2)[1]}</Typography>
                )}
              </Typography>
              <Typography
                fontSize="fontSizeSm"
                textAlign="left"
                fontWeight="fontWeightLight"
                sx={{ whiteSpace: 'nowrap', alignContent: 'center', color: 'grey.main' }}
              >
                {reviewData?.review?.artists ? (
                  <Typography align="left"> {reviewData?.review?.artists}</Typography>
                ) : (
                  <Typography align="left" fontSize="fontSizeMd">
                    {reviewData?.review?.albumTitle.split('-', 2)[0]}
                  </Typography>
                )}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                alignItems: 'center',
                minWidth: 'fit-content',
              }}
            >
              {formData.albumRating && (
                <Rating name="albumRating" value={formData.albumRating} precision={0.1} readOnly />
              )}

              <Typography
                fontSize="fontSizeMd"
                fontWeight="fontWeightRegular"
                sx={{ alignContent: 'center', ml: '4px', width: '17px' }}
              >
                {Number(formData.albumRating).toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h1">트랙별 평점</Typography>
      </Box>

      <TrackEdit
        reviewData={reviewData}
        albumData={albumData}
        onUpdateTrackRatingForEdit={handleTrackRatingForEditUpdate}
      />

      <div className="row">
        <Box
          className="input-field"
          sx={{
            mt: '16px',
            mb: '40px',
          }}
        >
          <label htmlFor="status">
            {' '}
            <Typography sx={{ mb: '16px' }} variant="h1">
              공개여부
            </Typography>
          </label>

          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleFormData}
            fullWidth
            inputProps={{
              sx: {
                '&:focus': {
                  border: '1px solid',
                  borderColor: 'rgb(52, 52, 52)',
                },
              },
            }}
            MenuProps={{
              sx: {
                '.MuiMenuItem-root': {
                  background: 'rgb(22, 22, 22)',
                  color: 'grey',
                  height: '48px',
                },
                '&& .Mui-selected': {
                  border: '1px solid',
                  borderColor: 'rgb(52, 52, 52)',
                  background: 'rgb(46, 45, 45)',
                },
              },
            }}
          >
            <MenuItem value="public" selected>
              <Typography textAlign="left">공개</Typography>
            </MenuItem>
            <MenuItem value="private">
              <Typography textAlign="left">비공개</Typography>
            </MenuItem>
          </Select>
        </Box>
      </div>

      <Typography sx={{ mt: '62px' }} variant="h1">
        리뷰 작성하기
      </Typography>
      <div className="row">
        <div className="input-field">
          <Input
            fullWidth
            type="text"
            id="title"
            name="title"
            onChange={handleFormData}
            value={formData.title}
            placeholder="제목을 입력하세요"
            required
            sx={{ mt: '16px' }}
          />
          <label htmlFor="title" />
        </div>

        <EditorBox onContentChange={handleContentChange} value={formData.body} />
      </div>

      <Box display="flex" justifyContent="end" sx={{ mt: '27px' }}>
        <Link href="/my-information">
          <Button
            variant="outlined"
            type="submit"
            sx={{
              mr: '16px',
              width: '104px',
              height: '43px',

              padding: '12px 24px 12px 24px',
            }}
          >
            <Typography fontSize="16px" fontWeight="500">
              취소
            </Typography>
          </Button>
        </Link>
        <Button
          type="submit"
          onClick={handleSubmit}
          sx={{ width: '104px', height: '43px', bgcolor: 'rgb(152, 72, 255)', padding: '12px 24px 12px 24px' }}
        >
          <Typography fontSize="16px" fontWeight="500">
            작성하기
          </Typography>
        </Button>
      </Box>
    </form>
  );
}

export default EditReview;
