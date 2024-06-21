import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditReview from '../components/review/EditReview';
import BASE_URL from '../config';

function EditPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [albumData, setAlbumData] = useState(null);

  const [, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/review/edit/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
      }
    };
    const fetchAlbumData = async () => {
      try {
        const response2 = await fetch(`${BASE_URL}/album/api/${data?.review.albumId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result2 = await response2.json();
        setAlbumData(result2);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchAlbumData();
  }, [data?.review.albumId, id]);

  return (
    <div className="Edit-review">
      <EditReview data={data} id={id} albumData={albumData} />
    </div>
  );
}

export default EditPage;
