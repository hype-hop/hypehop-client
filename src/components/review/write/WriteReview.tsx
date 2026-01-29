'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Typography, Box, Select, MenuItem } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import BASE_URL from '../../../config';
import ensureError from '../../../utils/error';
import AlbumSearch from '../../album/AlbumSearch/AlbumSearch';
import RatingAlbum from '../RatingAlbum';
import { AlbumData } from '../../../types/albumData';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';
import { AlbumReviewWriteForm } from '../../../types/review';
import WriteReviewPlaceholder from './WriteReviewPlaceholder';
import { useAuth } from '../../../AuthenticationContext';
import TrackWrite from '../../track/TrackWrite';

const EditorBox = dynamic(() => import('../EditorBox.tsx').then((module) => module.default), { ssr: false });

interface BestTrack {
  id: string | null;
  name: string | null;
  preview_url: string | null;
}

function WriteReview() {
  const { user } = useAuth()!;
  const router = useRouter();
  const searchParams = useSearchParams();
  const albumIdParam = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [trackRating, setTrackRating] = useState<number[]>([]);
  const [albumSearchResults, setAlbumSearchResults] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);
  const [reviewTargetAlbum, setReviewTargetAlbum] = useState<AlbumData | null>(null);
  const [albumRatingState, setAlbumRatingState] = useState(0);
  const [bestTrack, setBestTrack] = useState<BestTrack | null>(null);

  useEffect(() => {
    if (Object.keys(albumIdParam).length !== 0) {
      (async () => {
        const response = await fetch(`${BASE_URL}/album/api/${albumIdParam.id}`);
        const result = await response.json();
        setReviewTargetAlbum(result);
      })();
    }
  }, [searchParams, albumIdParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedAlbum) {
          const response = await fetch(`${BASE_URL}/album/api/${selectedAlbum.id}`);
          const result = await response.json();
          setReviewTargetAlbum(result);
        }
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

  if (reviewTargetAlbum?.albumData?.tracks?.items) {
    reviewTargetAlbum.albumData.tracks.items.forEach((track, index) => {
      const discNumber = track.disc_number || 1;
      if (!tracksByDisc[discNumber]) {
        tracksByDisc[discNumber] = [];
      }
      tracksByDisc[discNumber].push(track);
      tracks.push(`disc${discNumber - 1}-${index + 1}.${track.name}`);
    });
  }

  const [reviewWriteFormData, setReviewWriteFormData] = useState<AlbumReviewWriteForm>({
    title: '',
    status: 'public',
    body: '',
    albumTitle: '',
    albumRating: 0,
    artists: [],
    albumName: '',
    albumId: null,
    thumbnail: '',
    user: null,
    albumReleaseDate: null,
    trackTitle: [],
    artistGenre: [],
    bestTrackId: '',
    bestTrackName: '',
    previewUrl: '',
  });

  useEffect(() => {
    if (user && reviewTargetAlbum) {
      setReviewWriteFormData({
        ...reviewWriteFormData,
        albumRating: albumRatingState,
        albumId: reviewTargetAlbum.albumData?.id,
        albumTitle: reviewTargetAlbum?.pageTitle,
        thumbnail: reviewTargetAlbum.albumData?.images[1]?.url,
        albumReleaseDate: reviewTargetAlbum.albumData?.release_date,
        user: user._id || '',
        trackTitle: tracks,
        artistGenre: reviewTargetAlbum?.spotify_artist_genre,
        artists: reviewTargetAlbum.albumData?.artists.map((artist) => artist.name),
        albumName: reviewTargetAlbum?.albumData?.name,
      });
      const trackRatingArray = Array(reviewTargetAlbum?.albumData?.tracks.items.length || 0).fill(null);
      setTrackRating(trackRatingArray);
    }
  }, [reviewTargetAlbum]);

  const handleFormData = (e) => {
    setReviewWriteFormData({ ...reviewWriteFormData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setSelectedAlbum(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const combinedData = {
      ...reviewWriteFormData,
      trackRating,
      body: reviewContent,
      albumRating: albumRatingState,
      bestTrackId: bestTrack?.id,
      bestTrackName: bestTrack?.name,
      previewUrl: bestTrack?.preview_url,
    };

    if (albumRatingState !== 0 && reviewWriteFormData.title !== '') {
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
          router.push(`/`);
        })
        .catch((error) => {
          const ensuredError = ensureError(error);
          return { success: false, error: ensuredError };
        });
    } else if (albumRatingState === 0) {
      alert('평점을 입력해주세요');
    } else if (reviewWriteFormData.title === '') {
      alert('앨범평을 입력해주세요');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '24px',
      }}
    >
      <Typography component="div" variant="h1" mb={2.5}>
        앨범 검색
      </Typography>
      <AlbumSearch
        results={albumSearchResults}
        setResults={setAlbumSearchResults}
        setSelectedAlbum={setSelectedAlbum}
      />
      {!reviewTargetAlbum && <WriteReviewPlaceholder />}

      {reviewTargetAlbum && !reviewTargetAlbum.reviewUser?.includes(user!._id) && (
        <>
          <Typography component="div" variant="h1" mb={2.5}>
            앨범 평점
          </Typography>
          <RatingAlbum
            album={reviewTargetAlbum.albumData!}
            rating={albumRatingState}
            setRating={(rating: number) => {
              setAlbumRatingState(rating);
            }}
          />
          <Typography component="div" variant="h1" mb={2.5}>
            트랙별 평점
          </Typography>
          <TrackWrite album={reviewTargetAlbum} trackRating={trackRating} setTrackRating={setTrackRating} />

          <div className="row">
            <Box
              className="input-field"
              sx={{
                mt: '16px',
                mb: '40px',
              }}
            >
              <label htmlFor="status">
                <Typography component="div" variant="h1" mb={2.5}>
                  공개여부
                </Typography>
              </label>

              <Select
                id="status"
                name="status"
                value={reviewWriteFormData.status}
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
            <Typography component="div" variant="h1" mb={2.5}>
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
                  value={reviewWriteFormData.title}
                  placeholder="제목을 입력하세요"
                  required
                  sx={{ mt: '16px' }}
                />
                <label htmlFor="title" />
              </div>
            </div>
            <div>
              <EditorBox onContentChange={handleContentChange} value={reviewContent} />
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
    </Box>
  );
}

export default WriteReview;
