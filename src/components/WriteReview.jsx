import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Input, Container, Button, Typography, Box } from '@mui/material';
import BASE_URL from '../config';
import EditorBox from './EditorBox';
import ensureError from '../utils/error';

function WriteReview({ data, userData }) {
  const [reviewContent, setReviewContent] = useState('');
  const [trackRating, setTrackRating] = useState([]);

  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  const tracksByDisc = {};

  const tracks = [];

  data?.albumData.tracks.items.forEach((track, index) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
    tracks.push(`disc${discNumber - 1}-${index + 1}.${track.name}`);
  });

  const [formData, setFormData] = useState({
    title: '',
    status: 'public',
    albumRating: 0,
    body: '',
    albumTitle: data?.pageTitle,
    albumId: data?.albumData.id,
    thumbnail: data?.albumData.images[1].url,
    user: userData?._id,
    albumReleaseDate: data?.albumData.release_date,
    trackTitle: [],
    artistGenre: [],
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        albumId: data.albumData.id,
        albumTitle: data?.pageTitle,
        thumbnail: data.albumData.images[1].url,
        albumReleaseDate: data.albumData.release_date,
        user: userData?._id,
        trackTitle: tracks || null,
        artistGenre: data?.spotify_artist_genre,
      });
      const trackRatingArray = Array(data?.albumData.tracks.items.length || 0).fill(null);
      setTrackRating(trackRatingArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(trackRating);

    if (formData.albumRating !== 0 && formData.title !== '') {
      const combinedData = {
        ...formData,
        trackRating,
        body: reviewContent,
      };

      fetch(`${BASE_URL}/album/api/review/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })
        .then((response) => response.json())
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          const ensuredError = ensureError(error);
          return { success: false, error: ensuredError };
        });
    } else if (formData.albumRating === 0) {
      alert('평점을 입력해주세요');
    } else if (formData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  const renderTracks = Object.keys(tracksByDisc).map((discNumber) => (
    <div key={discNumber}>
      <h3>Disc {discNumber}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {tracksByDisc[discNumber].map((track, index) => (
          <div style={{ display: 'flex' }} key={index}>
            {index + 1}. {track.name} -
            {trackRating && (
              <Stack spacing={1}>
                <Rating
                  name="trackRating"
                  value={trackRating[index]}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    const updatedRating = [...trackRating];
                    updatedRating[index] = newValue;
                    setTrackRating(updatedRating);
                  }}
                />
              </Stack>
            )}
          </div>
        ))}
      </div>
    </div>
  ));

  return (
    <Container className="Write-review">
      <form>
        <h5>앨범 평점:</h5>

        <Stack style={{ alignItems: 'center' }} spacing={1}>
          <Rating name="albumRating" value={formData.albumRating} precision={0.5} onChange={handleFormData} required />
        </Stack>

        <h5>트랙별 평점:</h5>

        {renderTracks}

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
            />
            <label htmlFor="title" />
          </div>
        </div>
        <div>
          <EditorBox onContentChange={handleContentChange} /* value={reviewContent} */ />
        </div>

        <Box display="flex" justifyContent="end" sx={{ mt: '27px' }}>
          <Button size="small" variant="outlined" type="submit" onClick={handleSubmit}>
            <Typography fontSize="16px" fontWeight="fontWeightRegular">
              Save
            </Typography>
          </Button>
          <Button
            size="small"
            variant="outlined"
            type="submit"
            // onClick={handleCancel}
            sx={{
              width: '74px',
              height: '36px',
              background: 'rgb(52, 52, 52)',
              ml: '16px',
            }}
          >
            <Typography fontSize="16px" fontWeight="fontWeightRegular">
              Cancel
            </Typography>
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default WriteReview;
