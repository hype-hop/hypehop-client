import React, { useRef, useImperativeHandle } from 'react';
import { Box } from '@mui/material';
import html2canvas from 'html2canvas';
import { AlbumSearchResult } from '../../types/albumSearch';
import TopsterGrid from './TopsterGrid';

export interface TopstersHandle {
  saveAsImage: () => Promise<void>;
}

interface TopstersProps {
  ref: React.Ref<TopstersHandle>;
  albumGrid: (AlbumSearchResult | null)[];
  onDropAlbum: (album: AlbumSearchResult, cellIndex: number) => void;
  rows: number;
  cols: number;
  showAlbumInfo: boolean;
  showIndex: boolean;
}

function Topster({ albumGrid, onDropAlbum, rows, cols, showAlbumInfo, showIndex, ref }: TopstersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    saveAsImage: async () => {
      if (!containerRef.current) return;
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        allowTaint: true,
      });
      const link = document.createElement('a');
      link.download = 'topster.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    },
  }));

  return (
    <Box
      ref={containerRef}
      sx={{
        borderRadius: '12px',
        padding: '11px',
        backgroundColor: 'grey.darker1',
        maxWidth: { sm: '720px' },
        minWidth: { md: '720px' },
        aspectRatio: `${cols} / ${rows}`,
      }}
    >
      <TopsterGrid
        albumGrid={albumGrid}
        onDropAlbum={onDropAlbum}
        cols={cols}
        showAlbumInfo={showAlbumInfo}
        showIndex={showIndex}
      />
    </Box>
  );
}

export default Topster;
