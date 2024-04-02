import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  LinearProgress,
  styled,
  LinearProgressProps,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { AlbumCharts } from '../types/albumChart';
import BASE_URL from '../config';

const StarRatingBar = styled(LinearProgress)<LinearProgressProps>(({ theme }) => ({
  height: '10px',
  width: '60px',
  backgroundColor: 'yellow',

  '& .MuiLinearProgress-barColorPrimary': {
    backgroundColor: `${theme.palette.grey}`,
  },
}));

function AlbumList(data: AlbumCharts | null, startIndex: number, endIndex: number) {
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
          <Link to={`${item.albumId}`} key={item.albumId}>
            <Card
              sx={{
                bgcolor: 'background.default',
                // width: '288px',
                // height: '60px',
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
              <CardContent sx={{ margin: '0px 12px' }}>
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
              <CardContent>
                <Typography align="left">{item.albumTitle.split('-', 2)[1]}</Typography>
                <Typography variant="body2" align="left">
                  {item.albumTitle.split('-', 2)[0]}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <StarRatingBar variant="determinate" value={item.averageRating * 20} />
                  <Typography>{item.averageRating.toFixed(1)}</Typography>
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

        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: '75px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">인기 앨범 TOP20</Typography>
        <Box sx={{ display: 'flex' }}>
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
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 2fr)' }}>
        {AlbumList(data, 0, 4)}
        {AlbumList(data, 4, 8)}
      </Box>
    </Container>

    // <div className="album-chart">
    //   <h1>앨범 차트</h1>

    //   <a href="/album?sort=alltime">All Time</a>
    //   <a href="/album?sort=yearly">1 year</a>

    //   <div className="title">
    //     <h1>인기 리뷰 앨범</h1>
    //     <p>
    //       하입합 유저들의 평가를 반영한 차트입니다.
    //       <br />
    //       앨범의 평균 평점과 평가 수를 반영합니다.
    //     </p>
    //   </div>

    //   {Array.isArray(data?.top5Albums) ? (
    //     data?.top5Albums.map((item) => (
    //       <Link to={`${item.albumId}`} key={item.albumId}>
    //         <div className="box">
    //           <div className="cover">
    //             <img src={item.thumbnail} alt="cover" />
    //           </div>

    //           <div className="name">
    //             <span>{item.averageRating}</span> {item.albumTitle}
    //           </div>
    //         </div>
    //       </Link>
    //     ))
    //   ) : (
    //     <p>Empty</p>
    //   )}
    // </div>
  );
}

export default AlbumChart;
