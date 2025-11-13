import { Button } from '@mui/material';
import { useState } from 'react';
import Genre from '../../../types/genre';

const useGenre = () => {
  const [genre, setGenre] = useState('all');

  const handleClickGenre = (genre: string) => {
    setGenre(genre !== 'all' ? genre : 'all');
  };
  const genreButtons = () => {
    return Object.keys(Genre).map((genreKey) => (
      <Button
        sx={{
          mr: '16px',
          mt: '16px',
          border: '1px solid rgb(152, 72, 255)',
          borderRadius: '16px',
          ':hover': { backgroundColor: 'rgb(152, 72, 255)' },
          backgroundColor: genre === genreKey ? 'rgb(152, 72, 255)' : 'transparent',
        }}
        key={genreKey}
        onClick={() => handleClickGenre(genreKey)}
        variant="outlined"
      >
        {Genre[genreKey]}
      </Button>
    ));
  };

  return { genre, genreButtons };
};

export default useGenre;
