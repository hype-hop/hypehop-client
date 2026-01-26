import { Box } from '@mui/material';
import { ReactNode } from 'react';
import AlbumSearchResultItem from './AlbumSearchResultItem';
import { AlbumSearchResultListProps } from './types';
import scrollStyle from '../../../utils/scrollStyle';

function ResultBox({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        width: '100%',
        zIndex: 1,
        flexDirection: 'column',
        rowGap: '20px',
        backgroundColor: 'rgb(22, 22, 22)',
        padding: '16px',
        borderRadius: '16px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        maxHeight: '480px',
        overflowY: 'auto',
        ...scrollStyle.web.default,
      }}
    >
      {children}
    </Box>
  );
}

export default function ResultList({ result, setSelectedAlbum, setResult, setKeyword }: AlbumSearchResultListProps) {
  if (result?.length === 0) return <ResultBox>검색 결과가 없습니다.</ResultBox>;
  return (
    <ResultBox>
      {result?.map((album, index) => (
        <AlbumSearchResultItem
          key={`album-${album.id}`}
          album={album}
          setKeyword={setKeyword!}
          setSelectedAlbum={setSelectedAlbum}
          setResult={setResult}
          index={index}
        />
      ))}
    </ResultBox>
  );
}
