import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Button, Box, Input } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditorBox from './EditorBox';
import BASE_URL from '../config';
import TrackListForEdit from './TrackListForEdit';

function EditReview({ data }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [parentTrackRatingForEdit, setParentTrackRatingForEdit] = useState(null);

  const handleTrackRatingForEditUpdate = (updatedTrackRatingForEdit) => {
    setParentTrackRatingForEdit(updatedTrackRatingForEdit);
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
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        title: data?.review.title,
        status: data?.review.status,
        albumRating: data?.review.albumRating,
        body: data?.review.body,
      });
      // const trackRatingArray = Array(data?.albumData.tracks.items.length || 0).fill(null);
      // setTrackRating(trackRatingArray);
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
    <div className="Edit-review">
      <Box
        component="img"
        width="60px"
        height="60px"
        src={data?.review.thumbnail}
        sx={{ borderRadius: '6.6px', marginRight: '20px' }}
      />

      <form>
        <h5>앨범 평점:</h5>

        <Stack style={{ alignItems: 'center' }} spacing={1}>
          <Rating name="albumRating" value={formData.albumRating} precision={0.5} onChange={handleFormData} />
        </Stack>

        <h5>트랙별 평점:</h5>

        <TrackListForEdit data={data} onUpdateTrackRatingForEdit={handleTrackRatingForEditUpdate} />

        <div className="row" />

        <div className="row">
          <div className="input-field">
            <select id="status" name="status" value={formData.status} onChange={handleFormData}>
              <option value="public" selected>
                공개
              </option>
              <option value="private">비공개</option>
            </select>
            <label htmlFor="status">공개 여부</label>
          </div>
        </div>

        <div style={{ margin: '50px' }} className="row">
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

        <Button variant="outlined" size="small" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default EditReview;
