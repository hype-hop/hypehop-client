import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewDetail from '../components/ReviewDetail';
import Favorite from '../components/Favorite';
import Comment from '../components/Comment';
import BASE_URL from '../config';

function ReviewShowPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/${id}`);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="Review-show">
      <h1>ReviewShow.jsx</h1>

      {data ? (
        <div>
          <ReviewDetail data={data} />
          <Favorite reviewId={id} />
          <Comment comments={data?.comments} reviewId={id} />
        </div>
      ) : (
        <p>삭제되었거나 잘못된 경로입니다.</p>
      )}
    </div>
  );
}

export default ReviewShowPage;
