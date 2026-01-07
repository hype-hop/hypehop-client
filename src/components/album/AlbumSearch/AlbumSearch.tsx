import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Box } from '@mui/material';
import AlbumSearchContextProvider from './AlbumSearchContext';
import AlbumSearchInput from './AlbumSearchInput';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { AlbumSearchProps } from './types';
import { AlbumForReview } from '../../../types/albumReview';

function AlbumSearch({ results, setResults, setSelectedAlbum, variant = 'album' }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const albumSearchBoxRef = useRef<HTMLDivElement>(null);
  const albumSearchInputRef = useRef<HTMLInputElement>(null);
  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = Boolean(debouncedValue && results);

  const { isClickedOutside, setIsClickedOutside } = useAlbumSearchInputState({
    albumSearchBoxRef,
    albumSearchInputRef,
  });

  const isResult =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (results && isClickedOutside === searchClickState.FOCUSED);

  const isAlbumVariant = variant !== 'topster';

  return (
    <AlbumSearchContextProvider>
      <Box ref={albumSearchBoxRef} sx={{ position: 'relative' }}>
        <AlbumSearchInput
          results={results}
          setResults={setResults}
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
        {isAlbumVariant && isResult && (
          <ResultList
            result={results}
            setSelectedAlbum={setSelectedAlbum as Dispatch<SetStateAction<AlbumForReview | null>>}
            setResult={setResults}
            setKeyword={setKeyword}
          />
        )}
      </Box>
    </AlbumSearchContextProvider>
  );
}

export default AlbumSearch;
