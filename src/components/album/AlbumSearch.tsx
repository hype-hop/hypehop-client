import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Input, InputAdornment } from '@mui/material';
import { AlbumSearchResult } from '../../types/albumSearch';
import postSearchAlbum from '../../api/album';
import useDebounce from '../../utils/useDebounce';
import ResultList from './AlbumSearchResultList';
import { AlbumForReview } from '../../types/albumReview';

interface AlbumSearchProps {
  searchResult: AlbumSearchResult[] | null;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
}

function AlbumSearch({ searchResult, setSearchResult, setSelectedAlbum }: AlbumSearchProps) {
  const [keyword, setKeyword] = useState<string | null>(null);

  const { debouncedValue } = useDebounce(keyword!, 200);
  const isSearchCompleted = debouncedValue && searchResult;

  useEffect(() => {
    (async () => {
      if (debouncedValue === '' || debouncedValue === null) {
        setSearchResult(null);
        return;
      }

      const res = await postSearchAlbum(debouncedValue!);

      if (res.success) setSearchResult(res.data);
    })();
  }, [debouncedValue, setSearchResult]);

  return (
    <Box>
      <Input
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

      {isSearchCompleted && (
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

export default AlbumSearch;
