import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Rating } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState, useEffect } from 'react';
import { AlbumCharts } from '../../types/albumChart';
import BASE_URL from '../../config';
import { typography } from '../../constants/themeValue';

function AlbumList(data: AlbumCharts | null, startIndex: number, endIndex: number) {
  // const theme = useTheme();

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
              <CardContent sx={{ marginLeft: '12px' }}>
                <Typography>{index + startIndex + 1}</Typography>
              </CardContent>
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
                  margin: '0px 20px',
                }}
              />
              <CardContent sx={{ marginTop: '8px' }}>
                {item.artists ? (
                  <Typography
                    align="left"
                    fontSize={typography.size.lg}
                    fontWeight={typography.weight.bold}
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
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
                    sx={{ color: 'rgb(168, 168, 168)' }}
                  >
                    {item.artists}
                  </Typography>
                ) : (
                  <Typography
                    align="left"
                    fontSize={typography.size.md}
                    fontWeight={typography.weight.regular}
                    sx={{ color: 'rgb(168, 168, 168)' }}
                  >
                    {item.albumTitle.split('-', 2)[0]}
                  </Typography>
                )}
                <Box sx={{ display: 'flex' }}>
                  <Rating
                    name="half-rating-read"
                    value={item.averageRating}
                    precision={0.5}
                    icon={
                      <StarIcon
                        sx={{
                          marginTop: '0.5px',
                          marginBottom: '0.5px',
                          width: '15px',
                          height: '15px',
                          color: 'star.main',
                        }}
                      />
                    }
                    emptyIcon={
                      <StarBorderIcon
                        sx={{
                          marginTop: '0.5px',
                          marginBottom: '0.5px',
                          width: '15px',
                          height: '15px',
                          color: 'star.main',
                        }}
                      />
                    }
                    sx={{ marginRight: '4px' }}
                    readOnly
                  />
                  <Typography fontSize="fontSizeXs">{item.averageRating.toFixed(1)}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Link>
        ))
      ) : (
        <Typography>List Empty</Typography>
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
    <Box sx={{ marginTop: '75px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ ml: '20px' }} variant="h1">
          인기 앨범 차트
        </Typography>
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
        }}
      >
        {AlbumList(data, 0, 4)}
        {AlbumList(data, 4, 8)}
      </Box>
    </Box>
  );
}

export default AlbumChart;
