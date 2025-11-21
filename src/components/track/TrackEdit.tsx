import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReviewEdit } from '../../types/review';
import { AlbumData, Track } from '../../types/albumData';
import { ReviewTracks } from '../../types/albumChart';
import { typography } from '../../constants/themeValue';
import CustomStars from '../review/CustomStar';

function TrackEdit({
  reviewData,
  albumData,
  onUpdateTrackRatingForEdit,
}: {
  reviewData: ReviewEdit;
  albumData: AlbumData;
  onUpdateTrackRatingForEdit: (updatedTrackRatingForEdit: ReviewTracks[]) => void;
}) {
  const [trackRatingForEdit, setTrackRatingForEdit] = useState<ReviewTracks[] | null>(null);
  const id = reviewData?.review.albumId;

  const handleRatingChange = (newValue, albumIndex, trackIndex) => {
    console.log('fff', newValue);
    const updatedState = [...trackRatingForEdit!];

    updatedState[albumIndex].trackRating[trackIndex] = newValue;

    setTrackRatingForEdit(updatedState);
    onUpdateTrackRatingForEdit(updatedState);
  };

  useEffect(() => {
    if (id && reviewData?.review) {
      setTrackRatingForEdit(reviewData.review.tracks!);
    }
  }, [id, reviewData, albumData]);
  return (
    <Box sx={{ backgroundColor: 'rgb(27, 27, 27)', borderRadius: '8px', p: '8px' }}>
      {trackRatingForEdit?.map(({ _id, discNumber, trackTitle, trackRating }, albumIndex) => (
        <Box key={_id} sx={{ padding: '16px 16px 16px 16px' }}>
          <Typography variant="h1">Disc {discNumber}</Typography>
          <Box sx={{ maxHeight: '335px', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {trackTitle.map((title, trackIndex) => (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 0px 16px 0px',
                  }}
                  key={trackIndex}
                >
                  <Box display="flex" columnGap="16px">
                    <Box sx={{ alignContent: 'center', minWidth: '14px' }}>
                      <Typography fontSize={typography.size.lg} fontWeight={typography.weight.medium}>
                        {trackIndex + 1}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component="div"
                        fontSize={typography.size.lg}
                        fontWeight={typography.weight.bold}
                        sx={{ mb: '4px' }}
                      >
                        {title.split('.')[1]}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{ color: 'rgb(168, 168, 168)', mt: '4px' }}
                        fontSize={typography.size.md}
                        fontWeight={typography.weight.regular}
                      >
                        {reviewData?.review.albumTitle}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" sx={{ minWidth: 'fit-content' }}>
                    <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                      <CustomStars
                        name="trackRating"
                        value={trackRating[trackIndex]}
                        onChange={(_, newValue) => handleRatingChange(newValue, albumIndex, trackIndex)}
                      />
                    </Stack>

                    <Typography fontSize="12px" fontWeight="600" sx={{ alignContent: 'center', width: '17px' }}>
                      {Number(trackRating[trackIndex]).toFixed(1)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
export default TrackEdit;
