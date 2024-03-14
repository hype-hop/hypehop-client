import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UserPage() {
  const navigate = useNavigate()

  const {userId} = useParams();



    const [data, setData] = useState(null);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const result = await response.json();
        setData(result);
       
      console.log(result.reviews)
       
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData();
  }, []);
 

  
  return (
    <div className="UserPage">






{data?.reviews
          ? data.reviews.map(review => 
          <div>

<div><Link to={`/album/review/${review._id}`}>{review.title}</Link></div>
     
            <div class="albumTitleMy"> {review.albumTitle }  </div>
            <div class="albumRatingMy">{review.albumRating}</div>
             {/*   <div>{review.createdAt}</div>  */}
        
        <br />

      </div>           
            
            )
          : <p>Nothing</p>}



    </div>

  );
}

export default UserPage;
