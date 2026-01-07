import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';

interface TopsterGridProps {
  albumGrid: (AlbumSearchResult | null)[];
  onDropAlbum: (album: AlbumSearchResult, cellIndex: number) => void;
  cols: number;
  showAlbumInfo: boolean;
  showIndex: boolean;
}

export default function TopsterGrid({ albumGrid, onDropAlbum, cols, showAlbumInfo, showIndex }: TopsterGridProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, cellIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    const albumData = e.dataTransfer.getData('application/json');
    if (albumData) {
      const album: AlbumSearchResult = JSON.parse(albumData);
      onDropAlbum(album, cellIndex);
    }
  };

  return (
    <Grid container spacing={1}>
      {albumGrid.map((album, index) => (
        <Grid
          key={index}
          sx={{ aspectRatio: '1 / 1' }}
          size={{ xs: 12 / cols }}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        >
          <Box
            sx={{
              aspectRatio: '1 / 1',
              backgroundColor: album ? 'transparent' : 'grey.darkest',
              borderRadius: '4px',
              overflow: 'hidden',
              transition: 'opacity 0.15s ease',
              opacity: dragOverIndex === index ? 0.5 : 1,
              position: 'relative',
            }}
          >
            {album && (
              <>
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {showIndex && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    }}
                  >
                    {(index + 1).toString().padStart(2, '0')}.
                  </Box>
                )}
                {showAlbumInfo && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      right: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'white',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {album.name}
                    </Box>
                    <Box
                      sx={{
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.8)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {album.artists?.[0]?.name} • {album.name}
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
