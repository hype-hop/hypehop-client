import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Input, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useAuth } from '../AuthenticationContext';
import BASE_URL from '../../config';
import TimeSincePost from '../album/TimeSincePost';
import { StyledMenu, StyledMenuItem } from './StyledMenu';
// import { CommentType } from '../../types/review';
import { CommentData } from '../../types/review';
import { User } from '../../types/user';
import { ReactComponent as Delete } from '../../assets/icons/delete-review.svg';
import { typography } from '../../constants/themeValue';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';

interface Props {
  // comments: CommentType[];
  reviewId: string;
  user: User | null;
}

function Comment({ reviewId, user }: Props) {
  // const { user } = useAuth();
  const [content, setContent] = useState('');
  const [openMenu, setOpenMenu] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/comments/review/${reviewId}`, { credentials: 'include' });
        const result = await response.json();
        setCommentData(result.comments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reviewId, refreshCount]);

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

      setContent('');
      setRefreshCount((count) => count + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/comments/${reviewId}/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      setRefreshCount((count) => count + 1);
      console.log(refreshCount);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <Avatar sx={{ width: '28px', height: '28px', borderRadius: '50%' }} src={user?.image} alt="user" />
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

      {commentData?.map((comment) => (
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
              <Box
                display="flex"
                sx={{
                  justifyContent: 'space-between',
                  width: {
                    xs: '100%',
                    sm: '100%',
                    md: '100%',
                    lg: '846px',
                  },
                }}
              >
                <Typography fontSize="fontSizeMd" fontWeight="fontWeightLight" textAlign="left">
                  {comment.content}
                </Typography>{' '}
                {comment.user._id === user?._id && (
                  <>
                    <Box
                      sx={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        top: '27px',
                        right: '27px',
                        ':hover': { backgroundColor: 'rgb(126, 126, 126)' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={(e) => {
                        setOpenMenu(e.currentTarget);
                      }}
                    >
                      <Hamburger>열기</Hamburger>
                    </Box>

                    <StyledMenu
                      width={100}
                      anchorEl={openMenu}
                      open={Boolean(openMenu)}
                      onClose={() => setOpenMenu(null)}
                    >
                      <StyledMenuItem
                        sx={{ height: '30px', padding: '9.75px' }}
                        onClick={() => {
                          deleteComment(comment._id);
                        }}
                      >
                        <Delete />
                        <Typography fontSize={typography.size.md} ml={2}>
                          삭제
                        </Typography>
                      </StyledMenuItem>
                    </StyledMenu>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
}

export default Comment;
