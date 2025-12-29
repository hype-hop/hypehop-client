'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';
import AlbumSearch from '../../components/album/AlbumSearch/AlbumSearch';
import TopsterSearchResult from '../../components/topster/TopsterSearchResult';

const GRID_ROWS = 5;
const GRID_COLS = 5;

function TopsterPage() {
  const [results, setResults] = useState<AlbumSearchResult[] | null>([]);
  const [selected, setSelected] = useState<AlbumSearchResult | null>(null);
  const [draggingAlbum, setDraggingAlbum] = useState<AlbumSearchResult | null>(null);

  return (
    <Box display="flex" flexDirection="row" columnGap="20px">
      <Box
        sx={{
          borderRadius: '12px',
          padding: '11px',
          backgroundColor: 'grey.darker1',
          maxWidth: { sm: '792px' },
          minWidth: { md: '792px' },
          aspectRatio: '1 / 1',
        }}
      />
      <Box
        sx={{
          borderRadius: '12px',
          padding: '15px',
          backgroundColor: 'grey.darker1',
          maxWidth: { sm: '384px' },
          display: 'flex',
          flexDirection: 'column',
          rowGap: '25px',
        }}
      >
        <AlbumSearch
          searchResult={results}
          setSearchResult={setResults}
          setSelectedAlbum={setSelected}
          variant="topster"
        />
        <TopsterSearchResult searchResult={results} setSearchResult={setResults} setSelectedAlbum={setSelected} />
      </Box>
    </Box>
  );
}
export default TopsterPage;
