import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Box } from '@mui/material';
import AlbumSearchContextProvider from './AlbumSearchContext';
import AlbumSearchInput from './AlbumSearchInput';
import useAlbumSearchInputState, { searchClickState } from '../../../hooks/useAlbumSearchInputState';
import useDebounce from '../../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { AlbumSearchProps } from './types';
import { AlbumForReview } from '../../../types/albumReview';

function AlbumSearch({ result, setResult, setSelectedAlbum, variant = 'album' }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);
  const albumSearchBoxRef = useRef<HTMLDivElement>(null);
  const albumSearchInputRef = useRef<HTMLInputElement>(null);
  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = Boolean(debouncedValue && result);

  const { isClickedOutside, setIsClickedOutside } = useAlbumSearchInputState({
    albumSearchBoxRef,
    albumSearchInputRef,
  });

  const isResult =
    (isSearchCompleted && isClickedOutside === searchClickState.SEARCHING) ||
    (result && isClickedOutside === searchClickState.FOCUSED);

  const isAlbumVariant = variant !== 'topster';

  return (
    <AlbumSearchContextProvider>
      <Box ref={albumSearchBoxRef} sx={{ position: 'relative' }}>
        <AlbumSearchInput
          result={result}
          setResult={setResult}
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
            result={result}
            setSelectedAlbum={setSelectedAlbum as Dispatch<SetStateAction<AlbumForReview | null>>}
            setResult={setResult}
            setKeyword={setKeyword}
          />
        )}
      </Box>
    </AlbumSearchContextProvider>
  );
}

export default AlbumSearch;
