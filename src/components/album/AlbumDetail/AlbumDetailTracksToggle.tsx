import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AlbumDetailTracks from './AlbumDetailTracks';

import { typography } from '../../../constants/themeValue';
import { ReactComponent as ArrowUp } from '../../../assets/icons/arrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrowDown.svg';

function AlbumDetailTracksToggle({ data }) {
  const [isTrackListOpened, setIsTrackListOpened] = useState(false);

  const handleOpen = () => {
    setIsTrackListOpened(!isTrackListOpened);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isTrackListOpened ? (
        <Box
          sx={{
            mt: '16px',
            bgcolor: 'rgb(22, 22, 22)',
            border: '1px solid rgb(52, 52, 52)',
            borderRadius: '16px',
          }}
        >
          <Box onClick={handleOpen} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              fontSize={typography.size.lg}
              fontWeight={typography.weight.medium}
              sx={{ mt: '16px', mb: '16px', ml: '16px' }}
            >
              트랙리스트 닫기
            </Typography>
            <Button
              sx={{
                mt: '8px',
                mb: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                },
              }}
            >
              {isTrackListOpened ? <ArrowUp /> : <ArrowDown />}
            </Button>
          </Box>
          <AlbumDetailTracks data={data} />
        </Box>
      ) : (
        <Box
          onClick={handleOpen}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '16px',
            background: 'rgb(22, 22, 22)',
            borderRadius: '16px',
            border: '1px solid rgb(52, 52, 52)',
            mb: '62px',
            height: '46px',
            alignContent: 'center',
          }}
        >
          <Typography
            fontSize={typography.size.lg}
            fontWeight={typography.weight.medium}
            textAlign="left"
            sx={{
              alignContent: 'center',
              ml: '16px',
              mt: '16px',
              mb: '16px',
            }}
          >
            트랙리스트 펼치기
          </Typography>
          <Button
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0)',
              },
            }}
          >
            <ArrowDown />
          </Button>
        </Box>
      )}
    </>
  );
}

export default AlbumDetailTracksToggle;
