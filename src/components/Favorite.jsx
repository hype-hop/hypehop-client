import React, { useState, useEffect } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Box } from '@mui/material';
// import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../config';

function Favorite({ reviewId, numberOfFavorite }) {
  // const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

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

  const heartIcon = isFavorite ? faHeart : faHeartRegular;

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <FontAwesomeIcon
          icon={heartIcon}
          className="hover:cursor-pointer hover:text-red-200"
          size={1}
          onClick={addToFavorite}
          style={{ color: 'white' }}
        />

        <Typography
          color="grey.main"
          fontSize="fontSizeSm"
          sx={{
            FontAwesomeIcon: '300',
            margin: '0px 8px',
          }}
        >
          좋아요 {numberOfFavorite}개{' '}
        </Typography>
      </Box>
    </div>
  );
}

export default Favorite;
