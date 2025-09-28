import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, InputAdornment } from '@mui/material';
import postSearchAlbum from '../../../api/album';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { useAlbumSearchContext } from './AlbumSearchContext';
import { AlbumSearchProps } from './AlbumSearch';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';

export default function AlbumSearchInput({ searchResult, setSearchResult, setSelectedAlbum }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);

  const albumSearchBoxRef = useRef<HTMLDivElement>(null);
  const albumSearchInputRef = useRef<HTMLInputElement>(null);
  const { pointedResultIndex, increasePointedResultIndex, decreasePointedResultIndex, setPointedResultIndexDirectly } =
    useAlbumSearchContext();
  const { isClickedOutside, setIsClickedOutside } = useAlbumSearchInputState({
    albumSearchBoxRef,
    albumSearchInputRef,
  });
  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = debouncedValue && searchResult;
  const setSelectedAlbumWithKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
  }, [debouncedValue, setSearchResult]);

  const isResultList =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (searchResult && isClickedOutside === searchClickState.FOCUSED);

  return (
    <Box ref={albumSearchBoxRef} onKeyDown={setSelectedAlbumWithKey}>
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
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        autoComplete="off"
        required
        sx={isSearchCompleted ? { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } : {}}
      />

      {isResultList && (
        <ResultList
          searchResult={searchResult}
          setSelectedAlbum={setSelectedAlbum}
          setSearchResult={setSearchResult}
          setKeyword={setKeyword}
        />
      )}
    </Box>
  );
}
