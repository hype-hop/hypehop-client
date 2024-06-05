import React from 'react';
import { Card, Box, Typography, CardMedia, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomStar from '../review/CustomStar';

function AlbumCard({ data }) {
  const formattedDate = data?.review?.albumReleaseDate.split('T')[0];
  return (
    <Card
      key={data?.review?._id}
      sx={{
        mt: '16px',
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '846px',
        },
        height: '90px',
        paddingLeft: '22px',
        paddingTop: '15px',
        paddingBottom: '15px',
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'rgb(52,52,52)',
        borderRadius: '0px 16px 16px 16px',
      }}
    >
      <Box
        sx={{
          width: '266px',
          height: '60px',
          alignContent: 'center',
          display: 'flex',
        }}
      >
        <Link to={`/album/${data?.review?.albumId}`} style={{ justifyContent: 'center', alignContent: 'center' }}>
          <CardMedia
            component="img"
            image={data?.review?.thumbnail}
            alt="album cover"
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '6.6px',
            }}
          />
        </Link>
        <Box>
          <Typography
            fontSize="12"
            fontWeight="400"
            sx={{
              paddingTop: '4px',
              paddingLeft: '20px',
              textAlign: 'left',
            }}
          >
            {data?.review?.artists ? (
              <Typography fontSize="12px" fontWeight="700" align="left">
                {' '}
                {data?.review?.albumName}
              </Typography>
            ) : (
              <Typography fontSize="12px" fontWeight="700" align="left">
                {data.review?.albumTitle.split('-', 2)[1]}
              </Typography>
            )}
          </Typography>
          <Typography
            fontSize="12px"
            fontWeight="400"
            color="grey.main"
            sx={{
              paddingLeft: '20px',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}
          >
            <Box display="flex">
              {data?.review?.artists ? (
                <Typography fontSize="12px" fontWeight="400" align="left">
                  {' '}
                  {data?.review?.artists}
                </Typography>
              ) : (
                <Typography fontSize="12px" fontWeight="400" align="left">
                  {data.review?.albumTitle.split('-', 2)[0]}
                </Typography>
              )}
              <Typography> ·{formattedDate}</Typography>
            </Box>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ paddingLeft: '16px' }}>
            <CustomStar name="albumRating" value={Number(data?.albumRatingAverage)} edit={false} />
            <Typography fontSize="fontSizeSm" fontWeight="700" sx={{ alignContent: 'flex-end' }}>
              {data?.albumRatingAverage}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export default AlbumCard;
