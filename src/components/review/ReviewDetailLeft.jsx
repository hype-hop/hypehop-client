import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Stack, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AlbumCard from '../album/AlbumCard';
import TimeSincePost from '../album/TimeSincePost';
import PlayPreview from '../common/PlayPreview';
import Favorite from '../common/Favorite';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { typography } from '../../constants/themeValue';

function ReviewDetailLeft({ data }) {
  const { id } = useParams();
  const { bestTrackName, previewUrl } = data.review;

  return (
    <Box sx={{ mb: '18px' }}>
      <Stack sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">앨범 정보</Typography>
      </Stack>

      <AlbumCard data={data} />
      <Box
        sx={{
          mt: '16px',
          background: 'rgb(27, 27, 27)',
          borderRadius: '16px',
          pl: '16px',
          pr: '16px',
          pt: '16px',
          pb: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',

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
            {/* <Link to={`/user/${data?.review?.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {data?.review?.user.name || data?.review?.user.displayName}
          </Link> */}
            <Typography> {data?.review?.user.name || data?.review?.user.displayName}</Typography>
          </Typography>

          <Typography
            sx={{
              ml: '4px',
              textAlign: 'left',
              alignContent: 'center',
              color: 'rgb(168, 168, 168)',
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
            <StarIcon fontSize="small" sx={{ color: 'star.main', mt: '1px' }} />
            <Typography
              sx={{
                width: '15.33px',
                alignContent: 'center',
                mt: '4px',
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
              mt: '16px',
              mb: '12px',
              fontSize: '24px',
              fontWeight: 600,
              textAlign: 'left',
            }}
          >
            {data?.review?.title}
          </Typography>

          <Typography
            textAlign="left"
            fontSize="14px"
            fontWeight="400"
            sx={{ letterSpacing: '0.04rem', lineHeight: '1.2rem' }}
          >
            <div dangerouslySetInnerHTML={{ __html: data?.review?.body }} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Favorite reviewId={id} favoriteClickedUsers={data?.review?.isFavorite} />
          <Box sx={{ ml: '8px', alignItems: 'center', display: 'flex' }}>
            <CommentIcon />
            <Typography
              fontSize={typography.size.md}
              fontWeight={typography.weight.regular}
              sx={{ color: 'rgb(168,168,168)' }}
            >
              댓글 {data?.comments?.length}개
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: '40px' }}>
        <Typography variant="h1">추천트랙</Typography>
      </Box>
      <Box
        sx={{ mt: '14px', mb: '14px', border: '1px solid rgb(86, 87, 87)', borderRadius: '16px', padding: '16px' }}
        className="preview"
      >
        <Box display="flex" sx={{ alignItems: 'center' }}>
          <Box sx={{ height: '40px', alignContent: 'center', display: 'flex' }}>
            <img
              style={{
                top: 0,
                left: 0,
              }}
              src={data?.review.thumbnail}
              alt={bestTrackName}
            />
          </Box>

          <PlayPreview previewUrl={previewUrl} />
          <Typography>{bestTrackName}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewDetailLeft;
