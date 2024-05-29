import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button, Box, Input, Typography, MenuItem, Select } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg';
import EditorBox from './EditorBox';
import BASE_URL from '../../config';
import TrackListForEdit from './TrackListForEdit';
import CustomStarEdit from './CustomStarEdit';

function EditReview({ data, albumData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [isTrackListOpened, SetTrackListOpened] = useState(false);
  const [parentTrackRatingForEdit, setParentTrackRatingForEdit] = useState(data?.review.tracks);

  const handleTrackRatingForEditUpdate = (updatedTrackRatingForEdit) => {
    setParentTrackRatingForEdit(updatedTrackRatingForEdit);
  };
  // const [trackRating, setTrackRating] = useState<(number | null)[]>([]);

  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  const handleOpen = () => {
    SetTrackListOpened(!isTrackListOpened);
  };

  const [formData, setFormData] = useState({
    title: '',
    status: 'public',
    albumRating: 0,
    body: '',
  });

  useEffect(() => {
    let reviewBodyData;
    if (data) {
      if (data.review.body === '') {
        reviewBodyData = ' ';
      } else {
        reviewBodyData = data?.review.body;
      }
      // setReviewContent(data?.review.body);
      setReviewContent(reviewBodyData);
      setFormData({
        ...formData,
        title: data?.review.title,
        status: data?.review.status,
        albumRating: data?.review?.albumRating,
        // body: data?.review.body,
        body: reviewBodyData,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.albumRating !== 0 && formData.title !== '') {
      const combinedData = {
        ...formData,
        tracks: parentTrackRatingForEdit,
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
          navigate(`/album/review/${id}`);
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
              src={data?.review.thumbnail}
              sx={{ borderRadius: '6.6px', marginRight: '20px' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
              <Typography textAlign="left">
                {data?.review?.artists ? (
                  <Typography align="left"> {data?.review?.albumName}</Typography>
                ) : (
                  <Typography align="left">{data?.review?.albumTitle.split('-', 2)[1]}</Typography>
                )}
              </Typography>
              <Typography
                fontSize="fontSizeSm"
                textAlign="left"
                fontWeight="fontWeightLight"
                sx={{ whiteSpace: 'nowrap', alignContent: 'center', color: 'grey.main' }}
              >
                {data?.review?.artists ? (
                  <Typography align="left"> {data?.review?.artists}</Typography>
                ) : (
                  <Typography align="left" fontSize="fontSizeMd">
                    {data?.review?.albumTitle.split('-', 2)[0]}
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
                <CustomStarEdit name="albumRating" value={formData.albumRating} onChange={handleFormData} />
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
      {isTrackListOpened ? (
        <TrackListForEdit
          data={data}
          onUpdateTrackRatingForEdit={handleTrackRatingForEditUpdate}
          albumData={albumData}
          onHandleOpen={handleOpen}
        />
      ) : (
        <Box
          onClick={handleOpen}
          sx={{
            mt: '16px',
            background: 'rgb(22, 22, 22)',
            borderRadius: '16px',
            border: '1px solid rgb(52, 52, 52)',
            mb: '62px',
            height: '46px',
            alignContent: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ mt: '16px' }} fontSize="14px" fontWeight="500" ml="16px" textAlign="left">
            트랙리스트 펼치기
          </Typography>
          <Button
            sx={{
              mt: '8px',
              mb: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            }}
          >
            <ArrowDown />
          </Button>
        </Box>
      )}

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
        <Link to="/myInformation">
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
            {' '}
            작성하기
          </Typography>
        </Button>
      </Box>
    </form>
  );
}

export default EditReview;
