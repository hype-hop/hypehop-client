import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Typography, Box, Stack, Rating, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TimeSincePost from './TimeSincePost';
// import Comment from './Comment';
// import Favorite from './Favorite';

function ReviewDetailLeft({ data, albumData }) {
  return (
    <Box sx={{ mb: '18px' }}>
      <Stack sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">앨범 정보</Typography>
      </Stack>

      <Card
        key={data?.review._id}
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
          <Link to={`/album/${data?.review.albumId}`} style={{ justifyContent: 'center', alignContent: 'center' }}>
            <CardMedia
              component="img"
              image={data?.review.thumbnail}
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
              fontSize="fontSizeMd"
              fontWeight="fontWeightBold"
              sx={{
                paddingTop: '4px',
                paddingLeft: '20px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              {albumData?.albumTitleOnly}
            </Typography>
            <Typography
              fontSize="fontSizeSm"
              fontWeight="fontWeightLight"
              color="grey.main"
              sx={{
                paddingLeft: '20px',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}
            >
              {albumData?.artistNameOnly}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ paddingLeft: '20px' }}>
              <Rating
                name="albumRating"
                value={Number(albumData?.albumRatingAverage)}
                precision={0.5}
                readOnly
                size="small"
                sx={{ textAlign: 'left' }}
              />
              <Typography fontSize="fontSizeSm" fontWeight="700" sx={{ alignContent: 'flex-end' }}>
                {albumData?.albumRatingAverage}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>

      <Box
        sx={{
          display: 'flex',
          mt: '68px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Avatar
          style={{ width: '28px', height: '28px', borderRadius: '50%' }}
          src={data?.review.user.image}
          alt="user"
        />
        <Typography
          variant="body1"
          color="primary"
          sx={{
            alignContent: 'center',
            ml: 1,
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Link to={`/user/${data?.review.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {data?.review.user.name || data?.review.user.displayName}
          </Link>
        </Typography>

        <Typography
          color="grey.dark"
          fontSize="fontSizeSm"
          fontWeight="fontWeightLight"
          lineHeight="lineHeightSm"
          sx={{
            ml: '4px',
            textAlign: 'left',
            alignContent: 'center',
          }}
        >
          <TimeSincePost createdAt={data?.review.createdAt} />{' '}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            ml: 'auto',
            width: '46px',
            height: '20px',
            border: '1px solid rgb(86, 87, 87) ',
            borderRadius: '67px',
          }}
        >
          <StarIcon sx={{ color: 'white.main', fontSize: 'fontSizeMd', mt: '1px' }} />
          <Typography
            sx={{
              width: '15.33px',
              alignContent: 'end',
              fontSize: '11px',
              fontWeight: '400',
            }}
          >
            {' '}
            {/* eslint-disable-next-line no-unsafe-optional-chaining */}
            {data?.review.albumRating % 1 === 0 ? `${data?.review.albumRating}.0` : data?.review.albumRating}
          </Typography>
        </Box>
      </Box>

      <Box width="100%">
        <Typography
          sx={{
            mt: '44px',
            mb: '12px',
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'left',
          }}
        >
          {data?.review.title}
        </Typography>
        <Typography textAlign="left" fontSize="fontSizeMd" fontWeight="fontWeightLight">
          {data?.review.body}
        </Typography>
      </Box>

      {/*
      <Comment comments={data?.comments} reviewId={id} />
        */}
    </Box>
  );
}

export default ReviewDetailLeft;
