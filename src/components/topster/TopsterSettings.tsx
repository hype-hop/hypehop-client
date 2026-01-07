import { Dispatch, SetStateAction } from 'react';
import { Box, Typography, Slider, Switch } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';
import AlbumSearch from '../album/AlbumSearch/AlbumSearch';
import TopsterSearchResult from './TopsterSearchResult';
import { sliderSx, switchSx } from './styles';

interface TopsterSettingsProps {
  results: AlbumSearchResult[] | null;
  setResults: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  showAlbumInfo: boolean;
  setShowAlbumInfo: Dispatch<SetStateAction<boolean>>;
  showIndex: boolean;
  setShowIndex: Dispatch<SetStateAction<boolean>>;
  cols: number;
  setCols: Dispatch<SetStateAction<number>>;
  rows: number;
  setRows: Dispatch<SetStateAction<number>>;
}

function TopsterSettings({
  results,
  setResults,
  showAlbumInfo,
  setShowAlbumInfo,
  showIndex,
  setShowIndex,
  cols,
  setCols,
  rows,
  setRows,
}: TopsterSettingsProps) {
  return (
    <>
      <AlbumSearch results={results} setResults={setResults} variant="topster" />
      <TopsterSearchResult results={results} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>앨범 정보</Typography>
          <Switch checked={showAlbumInfo} onChange={(e) => setShowAlbumInfo(e.target.checked)} sx={switchSx} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>순번</Typography>
          <Switch checked={showIndex} onChange={(e) => setShowIndex(e.target.checked)} sx={switchSx} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Typography sx={{ minWidth: '40px' }}>가로</Typography>
          <Typography sx={{ minWidth: '24px' }}>{cols.toString().padStart(2, '0')}</Typography>
          <Slider
            value={cols}
            onChange={(_, value) => setCols(value as number)}
            min={1}
            max={10}
            step={1}
            sx={sliderSx}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Typography sx={{ minWidth: '40px' }}>세로</Typography>
          <Typography sx={{ minWidth: '24px' }}>{rows.toString().padStart(2, '0')}</Typography>
          <Slider
            value={rows}
            onChange={(_, value) => setRows(value as number)}
            min={1}
            max={10}
            step={1}
            sx={sliderSx}
          />
        </Box>
      </Box>
    </>
  );
}

export default TopsterSettings;
