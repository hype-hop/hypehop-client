import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
// import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../../config';
import { ReactComponent as EmptyFavoriteIcon } from '../../assets/icons/empty-favorite.svg';
import { typography } from '../../constants/themeValue';

function Favorite({ reviewId, numberOfFavorite }) {
  // const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
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
      <EmptyFavoriteIcon
        onClick={addToFavorite}
        fill={isFavorite ? 'red' : iconHoverColor}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
        style={{ cursor: 'pointer' }}
      />
      <Typography
        component="div"
        color={textHoverColor}
        fontSize={typography.size.md}
        fontWeight={typography.weight.regular}
        onMouseEnter={handleTextMouseEnter}
        onMouseLeave={handleTextMouseLeave}
        sx={{ cursor: 'pointer' }}
      >
        좋아요 {numberOfFavorite}개
      </Typography>
    </Box>
  );
}

export default Favorite;
