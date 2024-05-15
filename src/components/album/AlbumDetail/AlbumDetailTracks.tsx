import { Box, Typography, Stack } from '@mui/material';
import CustomStar from '../../review/CustomStar';
// import { AlbumDetailType } from '../../../types/albumDetail';
import { typography } from '../../../constants/themeValue';
import { AlbumData } from '../../../types/albumData';

function AlbumDetailTracks({ data }: { data: AlbumData }) {
  // const [, setTrackRating] = useState<number[]>([]);

  const tracksByDisc = {};

  data?.albumData.tracks.items.forEach((track) => {
    const discNumber = track.disc_number || 1;
    if (!tracksByDisc[discNumber]) {
      tracksByDisc[discNumber] = [];
    }
    tracksByDisc[discNumber].push(track);
  });

  return (
    <>
      {Object.keys(tracksByDisc).map((discNumber) => (
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

                <Box display="flex">
                  <Stack spacing={1} sx={{ mr: '3px', justifyContent: 'center' }}>
                    <CustomStar
                      name="trackRating"
                      value={Number(data?.storedAverageArr[Number(discNumber) - 1]?.values[index])}
                      edit={false}
                    />
                  </Stack>
                  <Typography fontSize="12px" fontWeight="600" sx={{ alignContent: 'center' }}>
                    {data?.storedAverageArr[Number(discNumber) - 1]?.values[index] === 'NaN'
                      ? '--'
                      : data?.storedAverageArr[Number(discNumber) - 1]?.values[index]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default AlbumDetailTracks;
