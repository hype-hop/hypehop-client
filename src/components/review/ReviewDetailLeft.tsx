'use client';

import { Typography, Box, Stack, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'next/navigation';
import AlbumSummary from '../album/AlbumSummary';
import TimeSincePost from '../album/TimeSincePost';

import Favorite from '../common/Favorite';
import CommentIcon from '../../assets/icons/comment.svg';
import { typography } from '../../constants/themeValue';

function ReviewDetailLeft({ data }) {
  const { id } = useParams();

  return (
    <Box sx={{ mb: '18px', width: { xs: '100%', md: '80%' } }}>
      <Stack sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h1">앨범 정보</Typography>
      </Stack>

      <AlbumSummary data={data} />
      <Box
        sx={{
          mt: '16px',
          bgcolor: 'grey.darkest',
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
            slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
          />
          <Typography
            variant="body1"
            color="white.main"
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
              alignItems: 'center',
              justifyContent: 'center',
              ml: 'auto',
              width: '46px',
              height: '20px',
              border: '1px solid rgb(86, 87, 87) ',
              borderRadius: '67px',
            }}
          >
            <StarIcon fontSize="small" sx={{ color: 'star.main', width: '13px' }} />
            <Typography
              sx={{
                alignContent: 'center',
                fontSize: '11px',
                fontWeight: '400',
                mt: '2px',
              }}
            >
              {/* eslint-disable-next-line no-unsafe-optional-chaining */}
              {data?.review?.albumRating % 1 === 0 ? `${data?.review?.albumRating}.0` : data?.review?.albumRating}
            </Typography>
          </Box>
        </Box>
        <Box width="100%" mt="16px">
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
          <Favorite reviewId={id as string} favoriteClickedUsers={data?.review?.isFavorite} />
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
    </Box>
  );
}

export default ReviewDetailLeft;
