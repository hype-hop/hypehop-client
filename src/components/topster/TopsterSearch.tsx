// app/components/TopsterGrid.tsx

'use client';

import { AlbumSearchResult } from '../../types/albumSearch';

export type GridCell = AlbumSearchResult | null;

type Props = {
  rows: number;
  cols: number;
  grid: GridCell[][];
  onDropCell: (row: number, col: number) => void;
  onRemoveCell: (row: number, col: number) => void;
};

export default function TopsterGrid({ rows, cols, grid, onDropCell, onRemoveCell }: Props) {
  return (
    <>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Topster Grid</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 4,
          width: 400,
          maxWidth: '100%',
        }}
      >
        {Array.from({ length: rows }).map((_, rowIdx) =>
          Array.from({ length: cols }).map((__, colIdx) => {
            const cell = grid[rowIdx]?.[colIdx] ?? null;
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDropCell(rowIdx, colIdx)}
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%',
                  background: '#f3f4f6',
                  borderRadius: 4,
                  border: '1px dashed #d1d5db',
                  overflow: 'hidden',
                }}
              >
                {cell && (
                  <>
                    <img
                      src={cell.images[0]?.url}
                      alt={cell.id}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveCell(rowIdx, colIdx)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 20,
                        height: 20,
                        borderRadius: '9999px',
                        border: 'none',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            );
          }),
        )}
      </div>
    </>
  );
}
