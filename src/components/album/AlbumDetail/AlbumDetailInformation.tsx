import { Box, Rating, Skeleton, Typography } from '@mui/material';
import { typography } from '../../../constants/themeValue';
import { AlbumData } from '../../../types/albumData';
import CustomStar from '../../review/CustomStar';
import PRECISION from '../../../constants/ratingPrecision';

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
          <Box sx={{ display: 'flex' }}>
            {data?.albumData.artists.map((artist, index) => (
              <Typography key={index} color="grey.main">
                {artist.name}{' '}
                {data?.albumData.artists.length > 1 && index < data!.albumData!.artists!.length - 1 && '· '}
              </Typography>
            ))}
          </Box>
          {!Number.isNaN(Number(data?.albumRatingAverage)) && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomStar value={Number(data?.albumRatingAverage)} edit={false} />
              <Typography component="div" fontSize={typography.size.md} fontWeight="medium" lineHeight={1}>
                {data?.albumRatingAverage}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', mt: '2px' }}>
            {data?.albumData.artists.length > 0 ? (
              data?.albumData.artists.map((artist, index) => (
                <Typography key={index} color="grey.main">
                  {artist.name}{' '}
                  {data?.albumData.artists.length > 1 && index < data!.albumData!.artists!.length - 1 && '· '}
                </Typography>
              ))
            ) : (
              <Skeleton variant="rounded" width="40px" />
            )}
          </Box>
          {!data?.albumRatingAverage && <Skeleton />}
          {data &&
            (Number.isNaN(data?.albumRatingAverage) ? (
              <Typography>평점이 없습니다.</Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={Number(data?.albumRatingAverage)} readOnly precision={PRECISION} />
                <Typography component="div" fontSize={typography.size.md} fontWeight="medium" lineHeight={1}>
                  {data?.albumRatingAverage}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AlbumDetailInformation;
