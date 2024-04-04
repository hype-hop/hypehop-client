import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Input, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../config';
import TimeSincePost from './TimeSincePost';

function Comment({ comments, reviewId, user }) {
  // const { user } = useAuth();
  const [content, setContent] = useState('');
  const [, setComment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/comments/review/${reviewId}`);
        const result = await response.json();
        setComment(result.comments);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reviewId]);

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const addComment = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${BASE_URL}/api/comments/review/${reviewId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      if (typeof window !== 'undefined' && window !== undefined) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('no res');
    }
  };

  return (
    <div className="Comment">
      <Typography sx={{ mt: '24px' }} variant="h1">
        댓글
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mt: '22px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Avatar sx={{ width: '28px', height: '28px', borderRadius: '50%' }} src={user?.user?.image} alt="user" />
        <div className="commentForm" style={{ flex: 1 }}>
          <form id="commentForm">
            <Box
              sx={{
                display: 'flex',
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '100%',
                  lg: '846px',
                },
              }}
            >
              <Input
                id="comment-input"
                name="commentContent"
                placeholder="댓글 달기"
                fullWidth
                rows={1}
                value={content}
                onChange={handleCommentChange}
                style={{
                  color: 'white',
                  height: '36px',
                  backgroundColor: 'rgb(43, 43, 43)',
                  borderRadius: '16px',
                  paddingLeft: '16px',
                  marginLeft: '16px',
                  marginRight: '16px',
                }}
              />
              <Button variant="outlined" onClick={addComment} type="submit">
                작성
              </Button>
            </Box>
          </form>
        </div>
      </Box>

      <Divider
        sx={{
          background: 'rgb(52, 52, 52)',
          mt: '16px',
          mb: '16px',
          width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '846px',
          },
        }}
      />
      {comments?.map((comment) => (
        <div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: '22px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <img style={{ width: '28px', height: '28px', borderRadius: '50%' }} src={comment.user.image} alt="user" />
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
                <Link to={`/user/${comment.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {comment.user.name || comment.user.displayName}
                </Link>
              </Typography>

              <Typography
                color="grey.dark"
                fontSize="fontSizeSm"
                fontWeight="fontWeightLight"
                lineHeight="lineHeightSm"
                sx={{
                  ml: '4px',
                  textAlign: 'left',
                  alignContent: 'center',
                }}
              >
                <TimeSincePost createdAt={comment.createdAt} />{' '}
              </Typography>
            </Box>

            <Box
              sx={{
                ml: '36px',
              }}
            >
              {' '}
              <Typography fontSize="fontSizeMd" fontWeight="fontWeightLight" textAlign="left">
                {comment.content}
              </Typography>{' '}
            </Box>
          </Box>

          <div>
            {comment.user._id === user?._id && (
              <form action={`/api/comments/${reviewId}/delete/${comment._id}`} method="POST" id="delete-form">
                <input type="hidden" name="_method" value="DELETE" />
                <button type="submit">삭제</button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
