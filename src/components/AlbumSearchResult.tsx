import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlbumSearchResult } from '../types/albumSearch';

function ResultBox({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        backgroundColor: 'rgb(52,52,52)',
        padding: '34px 45px',
        borderRadius: '16px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }}
    >
      {children}
    </Box>
  );
}

function Result({ data }: { data: AlbumSearchResult[] }) {
  const router = useNavigate();
  if (data.length === 0) return <ResultBox>검색 결과가 없습니다.</ResultBox>;
  return (
    <ResultBox>
      {data.map((album) => (
        <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={() => router(`/album/${album.id}`)}>
          <Box
            component="img"
            width="60px"
            height="60px"
            src={album.images[1].url}
            sx={{ borderRadius: '6.6px', marginRight: '20px' }}
          />
          <Box sx={{ textAlign: 'left' }}>
            <Typography fontWeight="fontWeightBold">{album.name}</Typography>
            <Box sx={{ display: 'flex' }}>
              {album.artists.map((artist, index) => (
                <Typography color="grey.main">
                  {artist.name} {album.artists.length > 1 && index < album.artists.length - 1 && '· '}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </ResultBox>
  );
}

export default Result;
