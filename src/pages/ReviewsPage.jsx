import React, { useState, useEffect } from 'react';


function ReviewsPage() {

    const [data, setData] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/review');
        const result = await response.json();
        setData(result);
       
    
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 
  
  return (
    <div className="Reviews">


<h1>Reviews</h1>



{Array.isArray(data?.reviews)
          ? data.reviews.map(review => <div>
            <img className='thumbnail' src={review.thumbnail} alt="" />
            {review.albumTitle}</div>)
          : <p>Nothing</p>}

  

    </div>

  );
}

export default ReviewsPage;
