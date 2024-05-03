import { useState, useEffect } from 'react';
import { Stack, Rating, Box, Typography } from '@mui/material';
// import BASE_URL from '../config';

function TrackListForEdit({ data, onUpdateTrackRatingForEdit, albumData }) {
  const [trackRatingForEdit, setTrackRatingForEdit] = useState(null);
  const [, setTrackRating] = useState(null);
  // const [albumData] = useState(null);

  const id = data?.review.albumId;
  const tracksByDisc = {};
  const tracks = [];

  const handleRatingChange = (event, newValue, albumIndex, trackIndex) => {
    const updatedState = [...trackRatingForEdit];
    updatedState[albumIndex].trackRating[trackIndex] = newValue;
    setTrackRatingForEdit(updatedState);
    onUpdateTrackRatingForEdit(updatedState);
  };

  useEffect(() => {
    if (id) {
      /*
      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/album/api/${id}`);

          const result = await response.json();
          setAlbumData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
*/
      setTrackRatingForEdit(data?.review.tracks);
      const trackRatingArray = Array(data?.review.tracks.length || 0).fill(null);
      setTrackRating(trackRatingArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data]);

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
      }}
    >
      {trackRatingForEdit?.map((album, albumIndex) => (
        <Box key={album._id} sx={{ margin: '20px' }}>
          <Typography variant="h1" textAlign="left" sx={{ mb: '5px' }}>
            Disc Number: {album.discNumber}
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
            {album.trackTitle.map((title, trackIndex) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '5px' }} key={trackIndex}>
                <Box>
                  <Typography
                    textAlign="left"
                    fontSize="fontSizeMd"
                    fontWeight="fontWeightBold"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    textAlign="left"
                    fontSize="fontSizeSm"
                    fontWeight="fontWeightLight"
                    sx={{ whiteSpace: 'nowrap', alignContent: 'center', color: 'grey.main' }}
                  >
                    {data?.review.albumTitle}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                    <Rating
                      size="small"
                      name="trackRating"
                      value={album.trackRating[trackIndex]}
                      precision={0.5}
                      onChange={(event, newValue) => handleRatingChange(event, newValue, albumIndex, trackIndex)}
                    />
                  </Stack>
                  <Typography fontSize="fontSizeMd" fontWeight="fontWeightRegular" sx={{ alignContent: 'center' }}>
                    {Number(album.trackRating[trackIndex]).toFixed(1)}
                  </Typography>
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
