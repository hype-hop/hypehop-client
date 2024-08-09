import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import BASE_URL from '../../config';
import { AlbumSearchResult } from '../../types/albumSearch';

function NewReleases() {
  const [newReleasesKR, setNewReleasesKR] = useState<AlbumSearchResult[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/album/api/releases`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNewReleasesKR(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Box>
      {newReleasesKR.map((release) => (
        <Box>{release.name}</Box>
      ))}
    </Box>
  );
}

export default NewReleases;
