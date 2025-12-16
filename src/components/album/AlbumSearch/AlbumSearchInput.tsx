import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Input, InputAdornment } from '@mui/material';
import postSearchAlbum from '../../../api/album';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { useAlbumSearchContext } from './AlbumSearchContext';
import { AlbumSearchInputProps, AlbumSearchProps } from './AlbumSearch';
import CancleIcon from '../../../assets/icons/cancle.svg';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';

export default function AlbumSearchInput({
  searchResult,
  setSearchResult,
  setSelectedAlbum,
  albumSearchBoxRef,
  albumSearchInputRef,
  isClickedOutside,
  setIsClickedOutside,
  keyword,
  setKeyword,
  debouncedValue,
  isSearchCompleted,
}: AlbumSearchInputProps) {
  const { pointedResultIndex, increasePointedResultIndex, decreasePointedResultIndex, setPointedResultIndexDirectly } =
    useAlbumSearchContext();

  const setSelectedAlbumWithKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResult) {
      return;
    }
    if (e.key === 'ArrowDown' && pointedResultIndex < searchResult.length - 1) {
      increasePointedResultIndex();
      return;
    }
    if (e.key === 'ArrowUp' && pointedResultIndex > 0) {
      decreasePointedResultIndex();
    }
    if (e.key === 'Enter') {
      setSelectedAlbum(searchResult[pointedResultIndex]);
      setKeyword(null);
      setSearchResult(null);
      setPointedResultIndexDirectly(0);
    }
  };

  useEffect(() => {
    setIsClickedOutside(searchClickState.SEARCHING);
    (async () => {
      if (debouncedValue === '' || debouncedValue === null) {
        setSearchResult(null);
        return;
      }

      const res = await postSearchAlbum(debouncedValue!);

      if (res.success) setSearchResult(res.data);
    })();
  }, [debouncedValue, setSearchResult, setIsClickedOutside]);

  const isResultList =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (searchResult && isClickedOutside === searchClickState.FOCUSED);

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
      sx={isSearchCompleted ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {}}
      endAdornment={
        isResultList ? (
          <IconButton
            color="primary"
            onClick={() => {
              setKeyword(null);
              setSearchResult(null);
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
