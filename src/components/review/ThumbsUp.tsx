import { Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';

function ThumbsUp({ id, selectedThumb, setSelectedThumb, track, setBestTrack }) {
  // const [selected, setSelected] = useState(false);
  const [iconHoverColor, setIconHoverColor] = useState('#7e7e7e');

  const handleMouseEnter = () => {
    setIconHoverColor('rgb(218, 218, 218)');
  };

  const handleMouseLeave = () => {
    setIconHoverColor('#7e7e7e');
  };

  const handleClick = () => {
    // setSelected(!selected);
    setSelectedThumb(selectedThumb === id ? null : id);
    setBestTrack(track);
  };

  const isSelected = selectedThumb === id;
  return (
    <Box>
      <ThumbUpIcon
        key={id}
        sx={{
          color: isSelected ? 'rgb(218, 218, 218)' : iconHoverColor,
          ml: '13px',
          mt: '3px',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    </Box>
  );
}

export default ThumbsUp;
