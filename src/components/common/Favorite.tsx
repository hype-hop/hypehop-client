import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthenticationContext';
import BASE_URL from '../../config';
import EmptyFavoriteIcon from '../../assets/icons/empty-favorite.svg';
import FavoriteListModal from './Modal/FavoriteListModal/FavoriteListModal';
import { FavoriteClickedUser } from '../../types/favorite';
import { palette, typography } from '../../constants/themeValue';

function Favorite({
  reviewId,
  favoriteClickedUsers,
}: {
  reviewId: string;
  favoriteClickedUsers: FavoriteClickedUser[];
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [isMyFavorite, setIsMyFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [iconHoverColor, setIconHoverColor] = useState('#7e7e7e');
  const [textHoverColor, setTextHoverColor] = useState('grey.main');

  const handleIconMouseEnter = () => {
    setIconHoverColor('rgb(218, 218, 218)');
  };

  const handleIconMouseLeave = () => {
    setIconHoverColor('#7e7e7e');
  };

  const handleTextMouseEnter = () => {
    setTextHoverColor('text.primary');
  };

  const handleTextMouseLeave = () => {
    setTextHoverColor('grey.main');
  };

  useEffect(() => {
    setIsMyFavorite((user && user.favoritesReview && Object.keys(user.favoritesReview).includes(reviewId))!);
    setFavoriteCount(favoriteClickedUsers?.length);
  }, [reviewId, user, favoriteClickedUsers]);

  const addToFavorite = async (e) => {
    e.stopPropagation();
    if (!user) {
      router.push('/login');
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

  const openFavoriteListModal = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '3px' }}>
      <EmptyFavoriteIcon
        onClick={addToFavorite}
        fill={isMyFavorite ? palette.favorite : iconHoverColor}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
        style={{ cursor: 'pointer' }}
      />

      <Typography
        component="div"
        color={textHoverColor}
        onClick={openFavoriteListModal}
        fontSize={typography.size.md}
        fontWeight={typography.weight.regular}
        onMouseEnter={handleTextMouseEnter}
        onMouseLeave={handleTextMouseLeave}
        sx={{ cursor: 'pointer' }}
      >
        좋아요 {favoriteCount}개
      </Typography>

      {open && <FavoriteListModal open={open} setOpen={setOpen} reviewId={reviewId} />}
    </Box>
  );
}

export default Favorite;
