'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BASE_URL from '../../config';
import { MyInformation } from '../../types/user';

function UserPage() {
  const { userId } = useParams();

  const [data, setData] = useState<MyInformation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/${userId}`);
        const result = await response.json();
        setData(result);
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
          <div key={`user-review-${review._id}`}>
            <div>
              <Link href={`/album/review/${review._id}`}>{review.title}</Link>
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
