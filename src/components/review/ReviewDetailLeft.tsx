import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Stack, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AlbumCard from '../album/AlbumCard';
import TimeSincePost from '../album/TimeSincePost';
// import Comment from './Comment';
// import Favorite from './Favorite';

function ReviewDetailLeft({ data }) {
  return (
    <Box sx={{ mb: '18px' }}>
      <Stack sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">앨범 정보</Typography>
      </Stack>

      <AlbumCard data={data} />

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
          src={data?.review?.user.image}
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
          <Link to={`/user/${data?.review?.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {data?.review?.user.name || data?.review?.user.displayName}
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
          <TimeSincePost createdAt={data?.review?.createdAt} />{' '}
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
          <StarIcon fontSize="small" sx={{ color: 'white.main', mt: '1px' }} />
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
            {data?.review?.albumRating % 1 === 0 ? `${data?.review?.albumRating}.0` : data?.review?.albumRating}
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
          {data?.review?.title}
        </Typography>
        <Typography textAlign="left" fontSize="fontSizeMd" fontWeight="fontWeightLight">
          <div dangerouslySetInnerHTML={{ __html: data?.review?.body }} />
        </Typography>
      </Box>

      {/*
      <Comment comments={data?.comments} reviewId={id} />
        */}
    </Box>
  );
}

export default ReviewDetailLeft;
