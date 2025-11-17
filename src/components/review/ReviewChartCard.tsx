import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { typography } from '../../constants/themeValue';
import CustomStars from './CustomStar';
import { ReviewsRank } from '../../types/review';

export default function ReviewChartCard({ review, index }: { review: ReviewsRank; index: number }) {
  const { title, user, albumRating, thumbnail } = review;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <Card
      sx={{
        bgcolor: 'background.default',
        maxWidth: { xs: '100%', sm: '300px', md: '100%', lg: '100%' },
        height: '60px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0px',
        flex: 'none',
        order: '0',
        flexGrow: '0',
        margin: '16px 0px',
        boxShadow: 'none',
      }}
    >
      <CardMedia
        component="img"
        width="60px"
        height="60px"
        image={thumbnail}
        alt="album cover"
        sx={{
          maxWidth: '60px',
          minWidth: '60px',
          borderRadius: '6.6px',
        }}
      />
      <CardContent sx={{ marginLeft: '16px' }}>
        <Typography fontSize={typography.size.lg} fontWeight="medium">
          {index + 1}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          marginTop: '8px',
          maxWidth: '63vw',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '0px',
          rowGap: '2px',
        }}
      >
        <Typography
          align="left"
          fontSize={typography.size.md}
          fontWeight={typography.weight.regular}
          sx={{ margin: '4px 0px', color: 'rgb(168, 168, 168)' }}
          component="div"
        >
          {user.displayName}
        </Typography>
        <Typography
          align="left"
          fontSize={typography.size.lg}
          fontWeight={typography.weight.bold}
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            wordBreak: 'break-all',
          }}
          component="div"
        >
          {truncateText(title, 22)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomStars name="half-rating-read" value={albumRating} readOnly />
          <Typography sx={{ ml: '4px', mt: '4px' }} fontSize="fontSizeXs">
            {albumRating.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
