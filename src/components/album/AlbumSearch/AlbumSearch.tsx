import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';
import AlbumSearchContextProvider from './AlbumSearchContext';
import AlbumSearchInput from './AlbumSearchInput';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';

export interface AlbumSearchProps {
  searchResult: AlbumSearchResult[] | null;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
}

export interface AlbumSearchInputProps extends AlbumSearchProps {
  albumSearchBoxRef: React.RefObject<HTMLDivElement | null>;
  albumSearchInputRef: React.RefObject<HTMLInputElement | null>;
  isClickedOutside: string;
  setIsClickedOutside: Dispatch<SetStateAction<string>>;
  keyword: string | null;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  debouncedValue: string | null;
  isSearchCompleted: boolean;
}

function AlbumSearch({ searchResult, setSearchResult, setSelectedAlbum }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const albumSearchBoxRef = useRef<HTMLDivElement>(null);
  const albumSearchInputRef = useRef<HTMLInputElement>(null);
  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = Boolean(debouncedValue && searchResult);

  const { isClickedOutside, setIsClickedOutside } = useAlbumSearchInputState({
    albumSearchBoxRef,
    albumSearchInputRef,
  });

  const isResultList =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (searchResult && isClickedOutside === searchClickState.FOCUSED);

  return (
    <AlbumSearchContextProvider>
      <Box ref={albumSearchBoxRef} sx={{ position: 'relative' }}>
        <AlbumSearchInput
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setSelectedAlbum={setSelectedAlbum}
          albumSearchBoxRef={albumSearchBoxRef}
          albumSearchInputRef={albumSearchInputRef}
          keyword={keyword}
          setKeyword={setKeyword}
          isClickedOutside={isClickedOutside}
          setIsClickedOutside={setIsClickedOutside}
          debouncedValue={debouncedValue}
          isSearchCompleted={isSearchCompleted}
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
    </AlbumSearchContextProvider>
  );
}

export default AlbumSearch;
