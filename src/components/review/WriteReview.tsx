// import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Input, Button, Typography, Box, Select, MenuItem } from '@mui/material';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrowUp.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg';
import BASE_URL from '../../config';
import EditorBox from './EditorBox';
import ensureError from '../../utils/error';
import AlbumSearch from '../album/AlbumSearch/AlbumSearch';
import RatingAlbum from './RatingAlbum';
import { AlbumData } from '../../types/albumData';
import { AlbumSearchResult } from '../../types/albumSearch';
import { AlbumForReview } from '../../types/albumReview';
import { FormData } from '../../types/review';
import WriteReviewBefore from './WriteReviewBefore';
import Duplicate from '../common/Modal/Duplicate';
import { typography } from '../../constants/themeValue';
import INITIAL_RATING_VALUE from '../../constants/rating';
import CustomStar from './CustomStar';

function WriteReview({ userData }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const albumIdParam = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [trackRating, setTrackRating] = useState<number[]>([]);
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);
  const [data, setData] = useState<AlbumData | null>(null);
  const [open, setOpen] = useState(true);
  const [isTrackListOpened, SetsTrackListOpened] = useState(false);
  const [albumRatingState, setAlbumRatingState] = useState(0);

  useEffect(() => {
    if (searchParams.get('keyword')) {
      (async () => {
        const response = await fetch(`${BASE_URL}/album/api/${searchParams.get('keyword')}`);
        const result = await response.json();
        setData(result);
        setSelectedAlbum({ ...result.albumData, rating: INITIAL_RATING_VALUE });
      })();
    }
    if (Object.keys(albumIdParam).length !== 0) {
      (async () => {
        const response = await fetch(`${BASE_URL}/album/api/${albumIdParam.id}`);
        const result = await response.json();
        setData(result);
        setSelectedAlbum({ ...result.albumData, rating: INITIAL_RATING_VALUE });
      })();
    }
  }, [searchParams, albumIdParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/${selectedAlbum?.id}`);
        const result = await response.json();
        setData(result);
        setOpen(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // albumRating: selectedAlbum?.rating,
    albumRating: 0,
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
        // albumRating: selectedAlbum?.rating,
        albumRating: albumRatingState,
        albumId: data.albumData?.id,
        albumTitle: data?.pageTitle,
        thumbnail: data.albumData?.images[1]?.url,
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

  const handleOpen = () => {
    SetsTrackListOpened(!isTrackListOpened);
  };
  const handleCancel = () => {
    setSelectedAlbum(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const combinedData = {
      ...formData,
      trackRating,
      body: reviewContent,
      albumRating: albumRatingState,
    };

    if (albumRatingState !== 0 && formData.title !== '') {
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
          navigate(`/`);
        })
        .catch((error) => {
          const ensuredError = ensureError(error);
          return { success: false, error: ensuredError };
        });
    } else if (albumRatingState === 0) {
      alert('평점을 입력해주세요');
    } else if (formData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  const renderTracks = Object.keys(tracksByDisc).map((discNumber) => (
    <Box key={discNumber} sx={{ padding: '16px 16px 16px 16px' }}>
      <Typography variant="h1">Disc {discNumber}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {tracksByDisc[discNumber].map((track, index) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgb(52, 52, 52)',
              padding: '16px 0px 16px 0px',
            }}
            key={index}
          >
            <Box display="flex">
              <Box sx={{ alignContent: 'center', mr: '16px' }}>
                <Typography fontSize={typography.size.lg} fontWeight={typography.weight.medium}>
                  {index + 1}{' '}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{}} fontSize={typography.size.lg} fontWeight={typography.weight.bold}>
                  {track.name}
                </Typography>
                <Typography
                  sx={{ color: 'rgb(168, 168, 168)', mt: '4px' }}
                  fontSize={typography.size.md}
                  fontWeight={typography.weight.regular}
                >
                  {track.artists[0].name} -{data?.albumData?.name}
                </Typography>
              </Box>
            </Box>
            {trackRating && (
              <Box display="flex" sx={{ minWidth: 'fit-content' }}>
                <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                  <CustomStar
                    name="trackRating"
                    value={trackRating[index]}
                    onChange={(newValue) => {
                      const updatedRating: number[] = [...trackRating];
                      updatedRating[index] = newValue!;
                      setTrackRating(updatedRating);
                    }}
                  />
                </Stack>
                <Typography fontSize="12px" fontWeight="600" sx={{ alignContent: 'center', width: '17px' }}>
                  {Number(trackRating[index]).toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  ));

  return (
    <>
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

        {selectedAlbum && !data?.reviewUser?.includes(userData._id) && (
          <>
            <Typography
              variant="h1"
              sx={{
                mt: '40px',
              }}
            >
              앨범 평점
            </Typography>
            <RatingAlbum
              album={selectedAlbum!}
              rating={albumRatingState}
              setRating={(rating: number) => {
                setAlbumRatingState(rating);
              }}

              /*
              setRating={(rating: number) => {
                setSelectedAlbum((prev) => ({ ...prev!, rating }));
              }}
              */
            />
            <Typography
              sx={{
                mt: '40px',
              }}
              variant="h1"
            >
              트랙별 평점
            </Typography>

            {isTrackListOpened ? (
              <Box
                sx={{
                  mt: '16px',
                  bgcolor: 'rgb(22, 22, 22)',
                  border: '1px solid rgb(52, 52, 52)',
                  borderRadius: '16px',
                }}
              >
                <Box onClick={handleOpen} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography
                    fontSize={typography.size.lg}
                    fontWeight={typography.weight.medium}
                    sx={{ mt: '16px', mb: '16px', ml: '16px' }}
                  >
                    트랙리스트 닫기
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
                    {isTrackListOpened ? <ArrowUp /> : <ArrowDown />}
                  </Button>
                </Box>
                {renderTracks}
              </Box>
            ) : (
              <Box
                onClick={handleOpen}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: '16px',
                  background: 'rgb(22, 22, 22)',
                  borderRadius: '16px',
                  border: '1px solid rgb(52, 52, 52)',
                  mb: '62px',
                  height: '46px',
                  alignContent: 'center',
                }}
              >
                <Typography
                  fontSize={typography.size.lg}
                  fontWeight={typography.weight.medium}
                  textAlign="left"
                  sx={{
                    alignContent: 'center',
                    ml: '16px',
                    mt: '16px',
                    mb: '16px',
                  }}
                >
                  트랙리스트 펼치기
                </Typography>
                <Button
                  sx={{
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
                  sx={{ pt: '7px' }}
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
                <Button
                  variant="outlined"
                  onClick={handleCancel}
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
                <Button
                  onClick={handleSubmit}
                  sx={{ width: '104px', height: '43px', bgcolor: 'rgb(152, 72, 255)', padding: '12px 24px 12px 24px' }}
                >
                  <Typography fontSize="16px" fontWeight="500">
                    작성하기
                  </Typography>
                </Button>
              </Box>
            </Box>
          </>
        )}
      </form>
      {!selectedAlbum && <WriteReviewBefore />}
      {selectedAlbum && data?.reviewUser?.includes(userData._id) && <Duplicate open={open} setOpen={setOpen} />}
    </>
  );
}

export default WriteReview;
