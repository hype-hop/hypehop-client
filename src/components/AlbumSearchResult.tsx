import { Box, Typography } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AlbumSearchResult } from '../types/albumSearch';
import { AlbumForReview } from '../types/albumReview';
import INITIAL_RATING_VALUE from '../constants/rating';

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

function Result({
  data,
  setSelectedAlbum,
  setSearchResult,
  setKeyword,
}: {
  data: AlbumSearchResult[];
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
}) {
  if (data.length === 0) return <ResultBox>검색 결과가 없습니다.</ResultBox>;
  return (
    <ResultBox>
      {data.map((album) => (
        <Box
          sx={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => {
            setSelectedAlbum(album);
            setSelectedAlbum((prev) => ({ ...prev!, rating: INITIAL_RATING_VALUE }));
            setKeyword(null);
            setSearchResult(null);
          }}
        >
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
