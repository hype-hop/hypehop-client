import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
// import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../../config';
import { ReactComponent as EmptyFavoriteIcon } from '../../assets/icons/empty-favorite.svg';
import FavoriteListCheckModal from './Modal/FavoriteListCheckModal';

function Favorite({ reviewId, numberOfFavorite }) {
  // const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        const favoritedReview = Object.keys(result.user.favoritesReview);

        // setData(favoritedReview);

        setUser(result);
        setIsFavorite(favoritedReview.includes(reviewId));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reviewId]);

  const addToFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      return;
    }

    setIsFavorite(!isFavorite);
    // console.log(isFavorite);

    try {
      const response = await fetch(`${BASE_URL}/api/favorite/review/${reviewId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isFavorite: !isFavorite,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1px' }}>
      <EmptyFavoriteIcon onClick={addToFavorite} fill={isFavorite ? 'red' : '#7e7e7e'} />
      <Typography onClick={() => setOpen(true)} component="div" color="grey.main" fontSize="fontSizeSm">
        좋아요 {numberOfFavorite}개,
      </Typography>
      <FavoriteListCheckModal open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Favorite;
