import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BASE_URL from '../config';

function UserPage() {
  const { userId } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/${userId}`);
        const result = await response.json();
        setData(result);

        console.log(result.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="UserPage">
      {data?.reviews ? (
        data.reviews.map((review) => (
          <div>
            <div>
              <Link to={`/album/review/${review._id}`}>{review.title}</Link>
            </div>

            <div className="albumTitleMy"> {review.albumTitle} </div>
            <div className="albumRatingMy">{review.albumRating}</div>
            {/*   <div>{review.createdAt}</div>  */}

            <br />
          </div>
        ))
      ) : (
        <p>Nothing</p>
      )}
    </div>
  );
}

export default UserPage;
