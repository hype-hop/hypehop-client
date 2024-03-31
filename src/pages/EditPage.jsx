import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditReview from '../components/EditReview';
import BASE_URL from '../config';

function EditPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/edit/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="Edit-review">
      <h3>EditPage.jsx</h3>
      <h4>작업중..</h4>

      <EditReview data={data} id={id} />
    </div>
  );
}

export default EditPage;
