import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Favorite from '../components/Favorite';
import PopularReview from '../components/PopularReview';
import { Button } from '@mui/material';
import theme from '../theme';
import {Typography} from '@mui/material';
import BASE_URL from '../config';

function ReviewsPage() {

    const [data, setData] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review`);
        const result = await response.json();
        setData(result);
     
    console.log(result)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  
  return (
    <div className="Reviews">


<h1>ReviewsPage.jsx</h1>


<PopularReview/>


{Array.isArray(data?.reviews)
          ? data.reviews.map(review => <div>


<div id={review._id} class="card-content ">



<div>
    <img 
        style={{ width: '50px', height: '50px' }}
        src={review.user.image} alt="user-image" />
    <Typography 
        //variant='body1'
        color="primary" 
        component="a" 
        href={`/user/${review.user._id}`}
    >
        {review.user.name ? <>{review.user.name}</> : <>{review.user.displayName}</>}
    </Typography>
</div>



<div className='reviewedAblum'>
<Link to={`/album/${review.albumId}`}>
            <img className='thumbnail' src={review.thumbnail} alt="album-cover" />
         <p>   {review.albumTitle} </p>
            <p>{review.albumRating}</p>
</Link>
</div>

        <a href={`/album/review/${review._id}`} target="_blank"> 
   
                <p class="card-title" >{review.title}</p>
                       <div class="content-body" >{review.body}</div> 
                       
        
</a>
     


</div>


<Favorite reviewId={review._id}/>

<Link to={`/album/review/${review._id}`}>
    <Button variant='outlined' color='primary'>   
          댓글    

    </Button>
  </Link>


             
            </div>
           
            
           )
          : <p>Nothing</p>
          }





    </div>

  );
}

export default ReviewsPage;
