import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Input, Container, Button, Typography, Box, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import EditorBox from './EditorBox';
import ensureError from '../../utils/error';
import AlbumSearch from '../album/AlbumSearch';
import RatingAlbum from './RatingAlbum';
import { AlbumData } from '../../types/albumData';
import { AlbumSearchResult } from '../../types/albumSearch';
import { AlbumForReview } from '../../types/albumReview';
import { FormData } from '../../types/review';

function WriteReview({ userData }) {
  const navigate = useNavigate();
  const [reviewContent, setReviewContent] = useState('');
  const [trackRating, setTrackRating] = useState<number[]>([]);
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);
  const [data, setData] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/${selectedAlbum?.id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedAlbum]);

  const handleContentChange = (newContent) => {
    setReviewContent(newContent);
  };

  const tracksByDisc = {};

  const tracks: string[] = [];

  data?.albumData?.tracks.items.forEach((track, index) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
    tracks.push(`disc${discNumber - 1}-${index + 1}.${track.name}`);
  });

  const [formData, setFormData] = useState<FormData>({
    title: '',
    status: 'public',

    body: '',
    albumTitle: data?.pageTitle,
    albumRating: selectedAlbum?.rating,
    artists: [],
    albumName: data?.albumData?.name,
    albumId: data?.albumData?.id,
    thumbnail: data?.albumData?.images[1].url,
    user: userData?._id,
    albumReleaseDate: data?.albumData?.release_date,
    trackTitle: [],
    artistGenre: [],
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        albumRating: selectedAlbum?.rating,
        albumId: data.albumData?.id,
        albumTitle: data?.pageTitle,
        thumbnail: data.albumData?.images[1].url,
        albumReleaseDate: data.albumData?.release_date,
        user: userData?._id,
        trackTitle: tracks,
        artistGenre: data?.spotify_artist_genre,
        artists: data.albumData?.artists.map((artist) => artist.name),
        albumName: data?.albumData?.name,
      });
      const trackRatingArray = Array(data?.albumData?.tracks.items.length || 0).fill(null);
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
          navigate(`/album/review/`);
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
                    const updatedRating: number[] = [...trackRating];
                    updatedRating[index] = newValue!;
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
        <Typography
          variant="h1"
          sx={{
            mb: '16px',
          }}
        >
          앨범 검색
        </Typography>
        <AlbumSearch
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setSelectedAlbum={setSelectedAlbum}
        />
        <Typography
          variant="h1"
          sx={{
            mt: '40px',
          }}
        >
          앨범 평점
        </Typography>
        {selectedAlbum ? (
          <RatingAlbum
            album={selectedAlbum!}
            rating={selectedAlbum.rating!}
            setRating={(rating: number) => {
              setSelectedAlbum((prev) => ({ ...prev!, rating }));
            }}
          />
        ) : (
          <Box
            sx={{
              border: '1px solid',
              // height: '46px',
              backgroundColor: 'rgb(22, 22, 22)',
              borderRadius: '16px',
              borderColor: 'rgb(52, 52, 52)',
              mt: '10px',
              pl: '16px',
              padding: '15px',
              justifyItems: 'center',
              color: 'rgb(168, 168, 168)',
            }}
          >
            <Typography textAlign="left">앨범을 추가해 확인하세요.</Typography>
          </Box>
        )}

        <Typography
          sx={{
            mt: '40px',
          }}
          variant="h1"
        >
          트랙별 평점
        </Typography>

        {selectedAlbum ? (
          <Box>{renderTracks}</Box>
        ) : (
          <Box
            sx={{
              border: '1px solid',
              mt: '10px',
              backgroundColor: 'rgb(22, 22, 22)',
              borderRadius: '16px',
              borderColor: 'rgb(52, 52, 52)',

              pl: '16px',
              padding: '15px',
              justifyItems: 'center',
            }}
          >
            <Typography textAlign="left">트랙리스트를 열어 확인하세요.</Typography>
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
              <Typography sx={{ mb: '16px', mt: '40px' }} variant="h1">
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
        <Box>
          <Typography variant="h1" sx={{ mt: '40px' }}>
            리뷰작성하기
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
          </div>
          <div>
            <EditorBox onContentChange={handleContentChange} /* value={reviewContent}  */ />
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
        </Box>
      </form>
    </Container>
  );
}

export default WriteReview;
