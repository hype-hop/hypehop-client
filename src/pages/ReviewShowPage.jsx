import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import Comment from '../components/common/Comment';
import Favorite from '../components/common/Favorite';
import ReviewDetail from '../components/review/ReviewDetail';

import BASE_URL from '../config';

function ReviewShowPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/${id}`);
        const result = await response.json();
        setData(result);
        const response2 = await fetch(`${BASE_URL}/api/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const result2 = await response2.json();
        setUser(result2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container sx={{ marginTop: '105px' }}>
      {data ? (
        <div>
          <ReviewDetail
            data={data}
            albumId={data.review.albumId}
            numberOfFavorite={data?.review.isFavorite.length}
            comments={data?.comments}
            reviewId={id}
          />

          <Box display="flex">
            <Favorite reviewId={id} favoriteClickedUsers={data?.review.isFavorite} />
            <ChatBubbleOutline sx={{ color: 'white.main', fontSize: '1em' }} />
            <Typography sx={{ color: 'rgb(168,168,168)', fontSize: '12px', margin: '0px 8px' }}>
              댓글 {data?.comments.length}개
            </Typography>
          </Box>
          <Comment comments={data?.comments} reviewId={id} user={user?.user} />
        </div>
      ) : (
        <p>삭제되었거나 잘못된 경로입니다.</p>
      )}
    </Container>
  );
}

export default ReviewShowPage;
