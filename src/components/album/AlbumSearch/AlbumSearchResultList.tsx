import { Box } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';
import AlbumSearchResultItem from './AlbumSearchResultItem';

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
}: {
  searchResult: AlbumSearchResult[];
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
}) {
  if (searchResult.length === 0) return <ResultBox>검색 결과가 없습니다.</ResultBox>;
  return (
    <ResultBox>
      {searchResult.map((album, index) => (
        <AlbumSearchResultItem
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
