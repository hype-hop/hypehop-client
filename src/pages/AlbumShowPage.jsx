import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlbumDetail from '../components/AlbumDetail';
import Reviewed from '../components/Reviewed';
import BASE_URL from '../config';

function AlbumShowPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api/${id}`);
        const result = await response.json();
        setData(result);
        const response2 = await fetch(`${BASE_URL}/api/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const result2 = await response2.json();
        setUser(result2);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [id]);

  if (!isAuthenticated) {
    navigate('/login');
  }

  return (
    <div className="Album-show">
      <h3>AlbumShowPage.jsx </h3>

      <AlbumDetail data={data} userData={user?.user} />
      <Reviewed data={data} />
    </div>
  );
}

export default AlbumShowPage;
