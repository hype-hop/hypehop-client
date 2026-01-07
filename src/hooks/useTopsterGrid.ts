import { useState, useEffect } from 'react';
import { AlbumSearchResult } from '../types/albumSearch';

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 3;

function useTopsterGrid() {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [cols, setCols] = useState(DEFAULT_COLS);
  const [albumGrid, setAlbumGrid] = useState<(AlbumSearchResult | null)[]>(
    Array(DEFAULT_ROWS * DEFAULT_COLS).fill(null),
  );

  useEffect(() => {
    setAlbumGrid((prev) => {
      const newSize = rows * cols;
      return prev.slice(0, newSize).concat(Array(Math.max(0, newSize - prev.length)).fill(null));
    });
  }, [rows, cols]);

  const handleDropAlbum = (album: AlbumSearchResult, cellIndex: number) => {
    setAlbumGrid((prev) => {
      const newGrid = [...prev];
      newGrid[cellIndex] = album;
      return newGrid;
    });
  };

  return {
    rows,
    setRows,
    cols,
    setCols,
    albumGrid,
    handleDropAlbum,
  };
}

export default useTopsterGrid;
