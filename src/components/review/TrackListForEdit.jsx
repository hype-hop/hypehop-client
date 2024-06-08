import { useState, useEffect } from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrowUp.svg';
import { typography } from '../../constants/themeValue';
import CustomStar from './CustomStar';
import PlayPreview from '../common/PlayPreview';
import ThumbsUp from './ThumbsUp';

function TrackListForEdit({ data, onBestTrackUpdate, onUpdateTrackRatingForEdit, albumData, onHandleOpen }) {
  const [trackRatingForEdit, setTrackRatingForEdit] = useState(null);
  const [, setTrackRating] = useState(null);
  const [albumDataState, setAlbumDataState] = useState(null);
  // const [albumData] = useState(null);
  const [selectedThumb, setSelectedThumb] = useState(null);
  const [, setBestTrack] = useState([]);

  const id = data?.review.albumId;
  const tracksByDisc = {};
  const tracks = [];

  const handleThumbsUpChange = (track) => {
    setBestTrack(track);
    setSelectedThumb(track.id);
    onBestTrackUpdate(track); // Call the parent callback function
  };

  const handleRatingChange = (newValue, albumIndex, trackIndex) => {
    const updatedState = [...trackRatingForEdit];
    updatedState[albumIndex].trackRating[trackIndex] = newValue;
    setTrackRatingForEdit(updatedState);
    onUpdateTrackRatingForEdit(updatedState);
  };

  useEffect(() => {
    if (id) {
      setTrackRatingForEdit(data?.review.tracks);
      const trackRatingArray = Array(data?.review.tracks.length || 0).fill(null);
      setTrackRating(trackRatingArray);
      setAlbumDataState(albumData.albumData);
      setSelectedThumb(data?.review.bestTrackId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, albumData]);

  albumData?.albumData?.tracks.items.forEach((track, index) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
    tracks.push(`disc${discNumber - 1}-${index + 1}.${track.name}`);
  });

  return (
    <Box
      sx={{
        mt: '16px',
        background: 'rgb(22, 22, 22)',
        borderRadius: '16px',
        height: 'auto',
        overflow: 'scroll',
        border: '1px solid rgb(52, 52, 52) ',
      }}
    >
      <Box onClick={onHandleOpen} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ mt: '16px' }} fontSize="14px" fontWeight="500" ml="16px" textAlign="left">
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
          <ArrowUp />
        </Button>
      </Box>

      {trackRatingForEdit?.map((album, albumIndex) => (
        <Box key={album._id} sx={{ margin: '20px' }}>
          <Typography variant="h1" textAlign="left" sx={{ mb: '16px' }}>
            Disc {album.discNumber}
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
            {album.trackTitle.map((title, trackIndex) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '5px',
                  borderBottom: '1px solid rgb(52, 52, 52)',
                  padding: '16px 0px 16px 0px',
                }}
                key={trackIndex}
              >
                <Box display="flex" alignItems="center">
                  <Box sx={{ minWidth: '14px' }}>
                    <Typography fontSize={typography.size.lg} fontWeight={typography.weight.medium}>
                      {trackIndex + 1}
                    </Typography>
                  </Box>

                  <Box>
                    <PlayPreview previewUrl={albumDataState?.tracks.items[trackIndex].preview_url} />

                    {/* {albumDataState?.tracks.items.map((track) => <Typography> {track.preview_url} </Typography>)} */}
                  </Box>

                  <Box>
                    <Typography fontSize={typography.size.lg} fontWeight={typography.weight.bold} textAlign="left">
                      {title.split('.')[1]}
                    </Typography>
                    <Typography
                      sx={{ color: 'rgb(168, 168, 168)', mt: '4px' }}
                      fontSize={typography.size.md}
                      fontWeight={typography.weight.regular}
                      textAlign="left"
                    >
                      {data?.review.albumTitle}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', minWidth: 'fit-content' }}>
                  <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                    <CustomStar
                      name="trackRating"
                      value={album.trackRating[trackIndex]}
                      onChange={(newValue) => handleRatingChange(newValue, albumIndex, trackIndex)}
                    />
                  </Stack>
                  <Typography fontSize="12px" fontWeight="600" sx={{ alignContent: 'center', width: '17px' }}>
                    {Number(album.trackRating[trackIndex]).toFixed(1)}
                  </Typography>
                  <Typography>{albumDataState?.tracks.items[trackIndex]._id}</Typography>
                  {albumDataState?.tracks.items[trackIndex].preview_url && (
                    <ThumbsUp
                      id={albumDataState?.tracks.items[trackIndex].id}
                      track={albumDataState?.tracks.items[trackIndex]}
                      setBestTrack={handleThumbsUpChange}
                      selectedThumb={selectedThumb}
                      setSelectedThumb={setSelectedThumb}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TrackListForEdit;
