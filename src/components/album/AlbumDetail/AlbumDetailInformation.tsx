import { Box, Skeleton, Typography } from '@mui/material';
import { typography } from '../../../constants/themeValue';
import { AlbumData } from '../../../types/albumData';
import CustomStar from '../../review/CustomStar';

function AlbumDetailInformation({ data }: { data?: AlbumData }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        padding: '16px',
        border: '1px solid rgb(52,52,52)',
        borderRadius: '16px',
        borderTopLeftRadius: 0,
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {data?.albumData.images ? (
          <Box
            component="img"
            width="60px"
            height="60px"
            src={data?.albumData.images[1].url}
            sx={{ borderRadius: '6.6px', marginRight: '20px' }}
          />
        ) : (
          <Skeleton variant="rounded" width="60px" height="60px" sx={{ marginRight: '20px' }} />
        )}

        <Box sx={{ textAlign: 'left' }}>
          {data?.albumData.name ? (
            <Typography fontWeight="bold">{data?.albumData.name}</Typography>
          ) : (
            <Skeleton variant="rounded" />
          )}
          <Box sx={{ display: 'flex', mt: 0.5 }}>
            {data?.albumData.artists.map((artist, index) => (
              <Typography key={index} color="grey.main">
                {artist.name}{' '}
                {data?.albumData.artists.length > 1 && index < data!.albumData!.artists!.length - 1 && '· '}
              </Typography>
            ))}
          </Box>
          {!data?.albumRatingAverage && <Skeleton />}
          {!Number.isNaN(Number(data?.albumRatingAverage)) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomStar value={Number(data?.albumRatingAverage)} edit={false} />
              <Typography component="div" fontSize={typography.size.md} fontWeight="medium" lineHeight={1}>
                {data?.albumRatingAverage}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AlbumDetailInformation;
