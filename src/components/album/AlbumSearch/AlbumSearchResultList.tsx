import { Box } from '@mui/material';
import { ReactNode } from 'react';
import AlbumSearchResultItem from './AlbumSearchResultItem';
import { AlbumSearchResultListProps } from './types';

function ResultBox({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        backgroundColor: 'rgb(22, 22, 22)',
        padding: '16px',
        borderRadius: '16px',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }}
    >
      {children}
    </Box>
  );
}

export default function ResultList({
  searchResult,
  setSelectedAlbum,
  setSearchResult,
  setKeyword,
}: AlbumSearchResultListProps) {
  if (searchResult?.length === 0) return <ResultBox>검색 결과가 없습니다.</ResultBox>;
  return (
    <ResultBox>
      {searchResult?.map((album, index) => (
        <AlbumSearchResultItem
          key={`album-${album.id}`}
          album={album}
          setKeyword={setKeyword}
          setSelectedAlbum={setSelectedAlbum}
          setSearchResult={setSearchResult}
          index={index}
        />
      ))}
    </ResultBox>
  );
}
