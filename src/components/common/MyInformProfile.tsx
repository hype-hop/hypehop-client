import { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

export default function MyInformProfile({ image }: { image: string | undefined }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleFileInput = () => {
    console.log('file input');
  };

  return (
    <Box
      position="relative"
      width="100px"
      height="100px"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{ ':hover': { cursor: 'pointer' } }}
    >
      <input type="file" id="choose-profile-image" accept="image/*" onChange={handleFileInput} hidden />
      <label htmlFor="choose-profile-image">
        <Avatar src={image} sx={{ width: '100px', height: '100px' }} />
        {isMouseOver && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
            }}
          >
            <PlusIcon style={{ fill: 'white', width: '40px', height: '40px' }} />
          </Box>
        )}
      </label>
    </Box>
  );
}
