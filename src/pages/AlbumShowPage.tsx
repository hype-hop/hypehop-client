import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import BASE_URL from '../config';
import { AlbumDetailType } from '../types/albumDetail';
import { useAuth } from '../AuthenticationContext';
import AlbumDetailInformation from '../components/AlbumDetail/AlbumDetailInformation';
import AlbumDetailTracks from '../components/AlbumDetail/AlbumDetailTracks';

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [id]);

  if (!user) {
    navigate('/login');
  }

  return (
    data && (
      <div>
        <Typography>앨범 정보</Typography>
        <AlbumDetailInformation data={data} />
        <AlbumDetailTracks data={data} />
      </div>
    )
  );
}

export default AlbumShowPage;
