import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../config';


function PopularReview() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/`);
        const result = await response.json();
        setData(result);

       
      } catch (error) {
        console.error('Error fetching data:', error);
   
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="Popular-review">

<h1>인기 하입합퍼</h1>

<div class="popular card">
   
   <div class="card-side"  >
       <p class="card-title">🔥주간 인기 리뷰</p>

  
       <p class="popular chip">이번주 인기 리뷰</p>
   
       {data?.reviewsRank.map((review, index) => (
        <div key={index} className="popular-posts" style={{ display: 'flex' }}>
          <p>{index + 1}.</p>
          <a style={{ color: 'black' }} href={`/album/review/${review._id}`}>
            <p style={{ textAlign: 'left' }}>{review.title}</p>
          </a>
        </div>
      ))}

   </div>
 </div> 





    </div>

  );
}

export default PopularReview;
