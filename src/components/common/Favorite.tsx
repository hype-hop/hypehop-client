import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useAuth } from '../../AuthenticationContext.js';
import BASE_URL from '../../config';
import { ReactComponent as EmptyFavoriteIcon } from '../../assets/icons/empty-favorite.svg';
import FavoriteListCheckModal from './Modal/FavoriteListCheckModal';
import { FavoriteClickedUser } from '../../types/favorite';

function Favorite({
  reviewId,
  favoriteClickedUsers,
}: {
  reviewId: string;
  favoriteClickedUsers: FavoriteClickedUser[];
}) {
  const [user] = useAuth();
  const [isMyFavorite, setIsMyFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMyFavorite(Object.keys(user?.favoritesReview).includes(reviewId));
    setFavoriteCount(favoriteClickedUsers.length);
  }, [reviewId, user, favoriteClickedUsers]);

  const addToFavorite = async (e) => {
    e.stopPropagation();
    if (!user) {
      return;
    }
    setFavoriteCount((prev) => (isMyFavorite ? prev! - 1 : prev! + 1));
    setIsMyFavorite(!isMyFavorite);

    try {
      const response = await fetch(`${BASE_URL}/api/favorite/review/${reviewId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isFavorite: !isMyFavorite,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const openFavoriteListCheckModal = () => {
    if (favoriteCount === 0) return;
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1px' }}>
      <EmptyFavoriteIcon onClick={addToFavorite} fill={isMyFavorite ? 'red' : '#7e7e7e'} />
      <Typography onClick={openFavoriteListCheckModal} component="div" color="grey.main" fontSize="fontSizeSm">
        좋아요 {favoriteCount}개,
      </Typography>
      <FavoriteListCheckModal open={open} setOpen={setOpen} favoriteClickedUsers={favoriteClickedUsers} />
    </Box>
  );
}

export default Favorite;
