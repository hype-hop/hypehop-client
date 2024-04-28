import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { typography } from '../../constants/themeValue';
import { AlbumCoverProps } from '../../types/albumCover';

function AlbumCover({ albumId, url, albumTitle, artists }: AlbumCoverProps) {
  const router = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '282px',
        minWidth: '200px',
        maxHeight: '282px',
        minHeight: '200px',
        aspectRatio: 1 / 1,
        position: 'relative',
      }}
      onClick={() => router(`/album/${albumId}`)}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          background: 'linear-gradient(180.00deg, rgba(25, 25, 25, 0) 49.967%,rgba(25, 25, 25, 0.7) 100%)',
        }}
      />
      <img
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
        src={url}
        alt={albumTitle}
      />
      <Box sx={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 2 }}>
        <Typography component="div" fontSize={typography.size.lg} fontWeight="bold" align="left">
          {albumTitle}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {artists?.map((artist, index) => (
            <Typography>
              {artist} {artists.length > 1 && index < artists.length - 1 && '· '}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AlbumCover;
