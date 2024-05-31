import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { typography } from '../../constants/themeValue';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

export default function FloatingActionButton() {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <Link to="/album">
      <Button
        sx={{
          position: 'fixed',
          // right: '15%',
          // bottom: '10%',
          right: { xs: '3vh', sm: '3vh', md: '15vh', lg: '15vh' },
          bottom: '15vh',
          borderRadius: '100%',
          width: '60px',
          height: '60px',
          zIndex: 1,
          background: 'rgb(152, 72, 255)',
          transition: 'all 200ms',
          ':hover': {
            background: 'rgb(152, 72, 255)',
            boxShadow: '0px 0px 20px 0px rgba(152, 72, 255, 0.8)',
            borderRadius: '165px',
            width: '84px',
          },
        }}
        onClick={handleMouseOut}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHover ? (
          <Typography
            fontSize={typography.size.lg}
            fontWeight="medium"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip' }}
          >
            리뷰 쓰기
          </Typography>
        ) : (
          <PlusIcon />
        )}
      </Button>
    </Link>
  );
}
