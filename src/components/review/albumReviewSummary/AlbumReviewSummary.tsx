'use client';

import { Card, CardActions, CardContent } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import he from 'he';
import { Review } from '../../../types/review';
import ReviewAuthorInfo from './ReviewAuthorInfo';
import ReviewContentPreview from './ReviewContentPreview';
import ReviewActions from './ReviewActions';
import { useAuth } from '../../../AuthenticationContext';

function AlbumReviewSummary({ review, isMyReview = false }: { review: Review; isMyReview?: boolean }) {
  const { user: me } = useAuth();
  const { _id, user: reviewUser, albumRating, title, createdAt, isFavorite, comments, body, thumbnail } = review;
  const strippedText = body.replace(/<[^>]+>/g, ' ');
  const plainText = he.decode(strippedText);

  const user = isMyReview ? me : reviewUser;

  return (
    <Card
      key={_id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '181px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'none',
        boxShadow: 'none',
      }}
    >
      <CardContent sx={{ width: '100%', padding: 0 }}>
        {user && (
          <ReviewAuthorInfo
            userId={user._id}
            userName={user.name || user.displayName}
            userImage={user.image}
            createdAt={createdAt}
            albumRating={albumRating}
          />
        )}

        <ReviewContentPreview reviewId={_id} title={title} plainText={plainText} />
      </CardContent>
      <CardActions disableSpacing sx={{ width: '100%', mt: '6px', padding: 0 }}>
        <ReviewActions reviewId={_id} isFavorite={isFavorite} commentsCount={comments.length} />
      </CardActions>
    </Card>
  );
}

export default AlbumReviewSummary;
