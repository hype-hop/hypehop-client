import { useRef, useState } from 'react';
import { Box } from '@mui/material';
import AlbumSearchContextProvider from './AlbumSearchContext';
import AlbumSearchInput from './AlbumSearchInput';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { AlbumSearchProps } from './types';

function AlbumSearch({ searchResult, setSearchResult, setSelectedAlbum, variant = 'album' }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const albumSearchBoxRef = useRef<HTMLDivElement>(null);
  const albumSearchInputRef = useRef<HTMLInputElement>(null);
  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = Boolean(debouncedValue && searchResult);

  const { isClickedOutside, setIsClickedOutside } = useAlbumSearchInputState({
    albumSearchBoxRef,
    albumSearchInputRef,
  });

  const isResult =
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
          variant={variant}
        />
        {variant === 'album' && isResult && (
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
