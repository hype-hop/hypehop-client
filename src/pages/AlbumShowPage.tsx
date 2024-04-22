import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlbumDetail from '../components/AlbumDetail';
import Reviewed from '../components/Reviewed';
import BASE_URL from '../config';
import { AlbumDetailType } from '../types/albumDetail';
import { useAuth } from '../AuthenticationContext';

function AlbumShowPage() {
  const { id } = useParams();

  const [data, setData] = useState<AlbumDetailType | null>(null);

  const [user] = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await (await fetch(`${BASE_URL}/album/api/${id}`)).json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  if (!user) {
    navigate('/login');
  }

  return (
    <div className="Album-show">
      <h3>AlbumShowPage.jsx </h3>

      <AlbumDetail data={data!} />
      <Reviewed data={data} />
    </div>
  );
}

export default AlbumShowPage;
