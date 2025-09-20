'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import EditReview from '../../components/review/EditReview';
import BASE_URL from '../../config';
import { ReviewAPIResponse } from '../../types/review';

function EditPage() {
  const { id } = useParams();

  const [data, setData] = useState<ReviewAPIResponse | null>(null);
  const [albumData, setAlbumData] = useState(null);

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
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response2 = await fetch(`${BASE_URL}/album/api/${data?.review.albumId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await response2.json();
        setAlbumData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAlbumData();
  }, [data]);

  return (
    <div className="Edit-review">
      <EditReview data={data} albumData={albumData} />
    </div>
  );
}

export default EditPage;
