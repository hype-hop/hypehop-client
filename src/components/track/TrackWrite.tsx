import { Box, Stack, Typography } from '@mui/material';
import { AlbumData, Track } from '../../types/albumData';
import { typography } from '../../constants/themeValue';
import CustomStars from '../review/CustomStar';

const setTracksByDisc = (albumTracks: Track[], tracksByDisc: { [key: number]: Track[] }) => {
  albumTracks.reduce((acc, track) => {
    const discNumber = track.disc_number || 1;
    acc[discNumber] = acc[discNumber] || [];
    acc[discNumber].push(track);
    return acc;
  }, tracksByDisc);
};

function TrackWrite({
  album,
  trackRating,
  setTrackRating,
}: {
  album: AlbumData | null;
  trackRating: number[];
  setTrackRating: (rating: number[]) => void;
}) {
  const tracksByDisc: { [key: number]: Track[] } = {};
  const albumTracks = album?.albumData?.tracks?.items || [];
  const albumName = album?.albumData?.name || '';

  setTracksByDisc(albumTracks, tracksByDisc);

  return (
    <Box sx={{ backgroundColor: 'rgb(27, 27, 27)', borderRadius: '8px', p: '8px' }}>
      {Object.keys(tracksByDisc).map((discNumber) => (
        <Box key={discNumber} sx={{ padding: '16px 16px 16px 16px' }}>
          <Typography variant="h1">Disc {discNumber}</Typography>
          <Box sx={{ maxHeight: '335px', overflowY: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {tracksByDisc[discNumber].map((track: Track, index) => (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 0px 16px 0px',
                  }}
                  key={index}
                >
                  <Box display="flex" columnGap="16px">
                    <Box sx={{ alignContent: 'center', minWidth: '14px' }}>
                      <Typography fontSize={typography.size.lg} fontWeight={typography.weight.medium}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        component="div"
                        fontSize={typography.size.lg}
                        fontWeight={typography.weight.bold}
                        sx={{ mb: '4px' }}
                      >
                        {track.name}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{ color: 'rgb(168, 168, 168)', mt: '4px' }}
                        fontSize={typography.size.md}
                        fontWeight={typography.weight.regular}
                      >
                        {track.artists[0].name} · {albumName}
                      </Typography>
                    </Box>
                  </Box>
                  {trackRating && (
                    <Box display="flex" sx={{ minWidth: 'fit-content' }}>
                      <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                        <CustomStars
                          name="trackRating"
                          value={trackRating[index]}
                          onChange={(_, newValue) => {
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
        </Box>
      ))}
    </Box>
  );
}

export default TrackWrite;
