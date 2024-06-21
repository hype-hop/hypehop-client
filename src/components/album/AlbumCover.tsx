import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { typography } from '../../constants/themeValue';
import { AlbumCoverProps } from '../../types/albumCover';
import PlayPreview from '../common/PlayPreview';

function AlbumCover({ reviewId, url, albumTitle, artists, previewUrl }: AlbumCoverProps) {
  // const router = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: '200px',
        minHeight: '200px',
        aspectRatio: 1 / 1,
        position: 'relative',
      }}
      // onClick={() => router(`/album/${albumId}`)}
    >
      <Link style={{ textDecorationLine: 'none', color: 'inherit' }} to={`/album/review/${reviewId}`}>
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

        <Box sx={{ position: 'absolute', top: '10px', zIndex: 2 }}>
          <Typography component="div" fontSize={typography.size.lg} fontWeight="bold" align="left" />
        </Box>

        <Box sx={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 2, width: 'calc(100% - 20px)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
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
            <Box>
              <PlayPreview previewUrl={previewUrl} size={30} />
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default AlbumCover;
