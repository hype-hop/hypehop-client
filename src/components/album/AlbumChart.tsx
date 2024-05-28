import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useState, useEffect } from 'react';
import { AlbumCharts } from '../../types/albumChart';
import BASE_URL from '../../config';
import { typography } from '../../constants/themeValue';
import CustomStar from '../review/CustomStar';
import RoundedSkeleton from '../common/skeletons/RoundedSkeleton';

function AlbumList({ data, startIndex, endIndex }: { data: AlbumCharts | null; startIndex: number; endIndex: number }) {
  return (
    <Box
      sx={{
        display: 'grid',
        marginTop: '16px',
        gridTemplateRows: 'repeat(4, 1fr)',
      }}
    >
      {Array.isArray(data?.top5Albums) ? (
        data?.top5Albums.slice(startIndex, endIndex).map((item, index) => (
          <Link to={`/album/${item.albumId}`} key={item.albumId} style={{ textDecorationLine: 'none' }}>
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
                image={item.thumbnail}
                alt="album cover"
                sx={{
                  maxWidth: '60px',
                  minWidth: '60px',
                  borderRadius: '6.6px',
                }}
              />
              <CardContent sx={{ marginLeft: '16px' }}>
                <Typography fontSize={typography.size.lg} fontWeight="medium">
                  {index + startIndex + 1}
                </Typography>
              </CardContent>
              <CardContent sx={{ marginTop: '8px', maxWidth: '63vw' }}>
                {item.artists ? (
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
                  >
                    {item.albumName}
                  </Typography>
                ) : (
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
                  >
                    {item.albumTitle.split('-', 2)[1]}
                  </Typography>
                )}
                {item.artists ? (
                  <Typography
                    align="left"
                    fontSize={typography.size.md}
                    fontWeight={typography.weight.regular}
                    sx={{ margin: '4px 0px', color: 'rgb(168, 168, 168)' }}
                  >
                    {item.artists}
                  </Typography>
                ) : (
                  <Typography
                    align="left"
                    fontSize={typography.size.md}
                    fontWeight={typography.weight.regular}
                    sx={{ margin: '4px 0px', color: 'rgb(168, 168, 168)' }}
                  >
                    {item.albumTitle.split('-', 2)[0]}
                  </Typography>
                )}
                <Box sx={{ display: 'flex' }}>
                  <CustomStar name="half-rating-read" value={item.averageRating} edit={false} />
                  <Typography sx={{ ml: '4px', mt: '4px' }} fontSize="fontSizeXs">
                    {item.averageRating.toFixed(1)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <RoundedSkeleton />
      )}
    </Box>
  );
}

function AlbumChart() {
  const [data, setData] = useState<AlbumCharts | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ marginTop: '40px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">인기 앨범 차트</Typography>
        {/* <Box sx={{ display: 'flex' }}>
          <Button
            variant="outlined"
            sx={{
              margin: '7px',
              maxHeight: 36,
              maxWidth: 36,
              minHeight: 36,
              minWidth: 36,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              margin: '7px',
              maxHeight: 36,
              maxWidth: 36,
              minHeight: 36,
              minWidth: 36,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </Box> */}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
          columnGap: '24px',
        }}
      >
        <AlbumList data={data} startIndex={0} endIndex={4} />
        <AlbumList data={data} startIndex={4} endIndex={8} />
      </Box>
    </Box>
  );
}

export default AlbumChart;
