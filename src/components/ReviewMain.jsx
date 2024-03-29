import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Favorite from '../components/Favorite';
import { Button, Card, CardContent, CardMedia, Typography, Container, Box, CardActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TimeSincePost from './TimeSincePost';
import BASE_URL from '../config';

function ReviewMain() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review`)
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container //maxWidth="md" 
    sx={{marginTop:'105px'}} >
<Box sx={{display:'flex',justifyContent: 'space-between', alignItems: 'center'  }}>
      <Typography variant="h1"
       >최근리뷰  </Typography>
       <Button variant='outlined' sx={{mb:0}}>
        <Link to={'/album/review'} style={{ textDecoration: 'none', color: 'inherit' }} >더보기</Link>
        </Button>
   </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 2,
        mt:2,
        
        }}>
        {Array.isArray(data?.reviews)
          ? data.reviews.slice(0, 6).map((review) => (
              <Card key={review._id} sx={{
                display: 'flex',
                flexDirection: 'column',
               
                width:'266px',
                height:'423px', 
                padding:'16px',
                bgcolor:'background.default',
                border:'1px solid', 
                borderColor:'rgb(52,52,52)', 
                borderRadius:'0px 16px 16px 16px' 
                }}>

                  <Link to={`/album/review/${review._id}`}>
                <CardMedia
                
                  component="img"
                  width='234px'
                  height="234px"
                  image={review.thumbnail}
                  alt="album cover"
                />
                </Link>

                <CardContent sx={{padding:'0'}}>      
                  <Box sx={{
                    display: 'flex',   
                    mt:'13px',
                    whiteSpace:'nowrap',
                    overflow:'hidden',
                    textOverflow:'ellipsis',}}>
                    <img 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', }}
                      src={review.user.image} alt="user" 
                    />
                    <Typography //variant="body1" 
                      color="white.main" 
                      fontWeight='fontWeightLighter'
                      sx={{
                      alignContent:'center', 
                      ml:1,
                      maxWidth:'100px',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                      whiteSpace:'nowrap'

                      }} >
                      <Link to={`/user/${review.user._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {review.user.name || review.user.displayName}
                      </Link>
                    </Typography>
                    
                    <Typography 
                    color='grey.dark' 
                    fontSize='fontSizeSm' 
                    fontWeight='fontWeightLight'
                    lineHeight='lineHeightSm'
                    sx={{
                      ml:'4px',
                      textAlign: 'left',
                      alignContent:'center'
                    }}> 
                    <TimeSincePost createdAt={review.createdAt} /> </Typography>

                      
                      <Box sx={{
                      display:'flex',
                      alignContent:'center',
                      justifyContent:'center',
                      ml:'auto',
                      width:'46px',
                      height:'20px',
                      border:'1px solid rgb(86, 87, 87) ',
                      borderRadius:'67px',
                      
                      
                     

                    }}> 
                    <StarIcon color='primary.main' />
                    <Typography 
                    color='white.main'
                    fontSize='fontSizeSm'
                    fontWeight='fontWeightLight'
                    sx={{
                      width:'15.33px',
                      alignContent:'end',                 
                      }}> {review.albumRating % 1 === 0 ? `${review.albumRating}.0` : review.albumRating}</Typography> 
                  
                    </Box>
                       

                  </Box>

                
                  <Link to={`/album/review/${review._id}`} style={{color:'inherit', textDecoration:'none'}}>
                    <Box sx={{width:'234px', height:'74px'}}>
                  <Typography  variant="body1" component="div" sx={{
                    whiteSpace:'nowrap',
                    overflow:'hidden',
                    textOverflow:'ellipsis',
                    }}>
                    {review.title}
                  </Typography>
                  <Typography variant='body2' component="div" color="text.secondary" sx={{
                    textAlign:'left',
                    mt:'6px',
                    
                    height:'45px',              
                    overflow:'hidden',
                    textOverflow:'ellipsis',

                    }}>
                    {review.body.replace(/<[^>]+>/g, '')}
                  </Typography>
                  </Box>
                  </Link>

                </CardContent>
                <CardActions disableSpacing sx={{ mt: 'auto' }}>

                    <Box sx={{
                      display:'flex'
                    }}>
                  <Favorite reviewId={review._id} numberOfFavorite={review.isFavorite.length} />
                  
               
                    <Box sx={{display:'flex'}}>
                  <Link to={`/album/review/${review._id}`} style={{  display:'inline-flex',textDecoration: 'none',color:'inherit' }} >
                    <ChatBubbleOutlineIcon />
                    <Typography sx={{color:'rgb(168,168,168)',fontSize: '12px',margin:'0px 8px'}}
                      >댓글 {review.comments.length}개</Typography>
                  </Link>
                  </Box>

                  </Box>

                </CardActions>
              </Card>
            ))
          : <Typography>Nothing to display</Typography>
        }
      </Box>
    </Container>
  );
}

export default ReviewMain;
