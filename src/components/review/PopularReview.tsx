import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, Typography } from '@mui/material';
import BASE_URL from '../../config';
import { ReviewsRank } from '../../types/review';

function PopularReview() {
  const [data, setData] = useState<ReviewsRank[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/`);
        const result = await response.json();
        setData(result.reviewsRank);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (data?.length === 0) {
    return <>인기 리뷰가 없습니다.</>;
  }

  return (
    <List
      sx={{ border: '1px solid rgb(52,52,52)', borderRadius: '0px 16px 16px 16px', padding: '16px', maxWidth: '287px' }}
    >
      {data?.map(({ _id, title, favoriteCount }, index) => (
        <ListItem
          sx={{
            display: 'flex',
            columnGap: '4px',
            marginBottom: index < data.length - 1 ? '16px' : '0px',
            alignItems: 'flex-start',
          }}
          key={_id}
        >
          <Typography lineHeight="1" component="div" fontSize="fontSizeMd" fontWeight="600">
            {index + 1}.
          </Typography>
          <Link to={`/album/review/${_id}`} style={{ textAlign: 'left', color: 'white', textDecoration: 'none' }}>
            <Typography lineHeight="1" component="div" fontSize="fontSizeMd">
              {title}
            </Typography>
          </Link>

          <Typography lineHeight="1" component="div" fontSize="fontSizeMd" color="grey.main">
            ({favoriteCount < 100 ? favoriteCount : '100 +'})
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default PopularReview;
