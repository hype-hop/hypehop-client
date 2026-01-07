import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Input, InputAdornment } from '@mui/material';
import postSearchAlbum from '../../../api/album';
import { useAlbumSearchContext } from './AlbumSearchContext';
import CancleIcon from '../../../assets/icons/cancle.svg';
import { searchClickState } from '../../../hooks/useAlbumSearchInputState';
import { AlbumSearchInputProps } from './types';

export default function AlbumSearchInput({
  results,
  setResults,
  setSelectedAlbum,
  albumSearchInputRef,
  albumSearchBoxRef,
  isClickedOutside,
  setIsClickedOutside,
  keyword,
  setKeyword,
  debouncedValue,
  isSearchCompleted,
  variant,
}: AlbumSearchInputProps) {
  const { pointedResultIndex, increasePointedResultIndex, decreasePointedResultIndex, setPointedResultIndexDirectly } =
    useAlbumSearchContext();

  const setSelectedAlbumWithKey = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!results) {
      return;
    }

    if (variant === 'album') {
      if (e.key === 'ArrowDown' && pointedResultIndex < results.length - 1) {
        increasePointedResultIndex();
        return;
      }
      if (e.key === 'ArrowUp' && pointedResultIndex > 0) {
        decreasePointedResultIndex();
      }
      if (e.key === 'Enter') {
        setSelectedAlbum!(results[pointedResultIndex]);
        setKeyword(null);
        setResults(null);
        setPointedResultIndexDirectly(0);
      }
    }

    if (e.key === 'Enter') {
      (async () => {
        const res = await postSearchAlbum(debouncedValue!);
        if (res.success) setResults(res.data);
      })();
    }
  };

  useEffect(() => {
    setIsClickedOutside(searchClickState.SEARCHING);
    if (variant === 'topster') return;

    (async () => {
      if (debouncedValue === '' || debouncedValue === null) {
        setResults(null);
        return;
      }

      const res = await postSearchAlbum(debouncedValue!);

      if (res.success) setResults(res.data);
    })();
  }, [debouncedValue, setResults, setIsClickedOutside]);

  const isResult =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (results && isClickedOutside === searchClickState.FOCUSED);

  return (
    <Input
      ref={albumSearchInputRef}
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon sx={{ color: 'rgb(110, 110, 110)' }} />
        </InputAdornment>
      }
      type="text"
      placeholder="앨범 찾기..."
      value={keyword ?? ''}
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
      autoComplete="off"
      required
      sx={variant === 'album' && isResult ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {}}
      endAdornment={
        isResult ? (
          <IconButton
            color="primary"
            onClick={() => {
              setKeyword(null);
              setResults(null);
            }}
          >
            <CancleIcon />
          </IconButton>
        ) : undefined
      }
      onKeyDown={setSelectedAlbumWithKey}
    />
  );
}
