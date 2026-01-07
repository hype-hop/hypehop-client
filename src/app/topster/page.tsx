'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';
import Topsters, { TopstersHandle } from '../../components/topster/Topster';
import TopsterSettings from '../../components/topster/TopsterSettings';
import useTopsterGrid from '../../hooks/useTopsterGrid';

function TopsterPage() {
  const [results, setResults] = useState<AlbumSearchResult[] | null>([]);
  const [showAlbumInfo, setShowAlbumInfo] = useState(true);
  const [showIndex, setShowIndex] = useState(true);
  const topstersRef = useRef<TopstersHandle>(null);

  const { rows, setRows, cols, setCols, albumGrid, handleDropAlbum } = useTopsterGrid();

  return (
    <Box width="100%" display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap="24px">
      <Box>
        <Typography component="div" variant="h1" sx={{ mb: '25px' }}>
          탑스터
        </Typography>
        <Topsters
          ref={topstersRef}
          albumGrid={albumGrid}
          onDropAlbum={handleDropAlbum}
          rows={rows}
          cols={cols}
          showAlbumInfo={showAlbumInfo}
          showIndex={showIndex}
        />
      </Box>

      <Box>
        <Typography component="div" variant="h1" sx={{ mb: '20px' }}>
          설정
        </Typography>
        <Box
          sx={{
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: 'grey.darker1',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TopsterSettings
            results={results}
            setResults={setResults}
            showAlbumInfo={showAlbumInfo}
            setShowAlbumInfo={setShowAlbumInfo}
            showIndex={showIndex}
            setShowIndex={setShowIndex}
            cols={cols}
            setCols={setCols}
            rows={rows}
            setRows={setRows}
          />
          <Button
            sx={{ backgroundColor: 'primary.main', color: 'text.primary' }}
            onClick={() => topstersRef.current?.saveAsImage()}
          >
            이미지 다운로드
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default TopsterPage;
