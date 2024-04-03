import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment } from '@mui/material';
import { AlbumSearchResult } from '../types/albumSearch';
import postSearchAlbum from '../api/album';
import useDebounce from '../utils/useDebounce';
import Result from './AlbumSearchResult';

function AlbumSearch() {
  const [keyword, setKeyword] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);

  const { debouncedValue, isTyping } = useDebounce(keyword!, 650);

  useEffect(() => {
    (async () => {
      if (debouncedValue === '') {
        setSearchResult([]);
        return;
      }

      const res = await postSearchAlbum(debouncedValue!);
      if (res.success) setSearchResult(res.data);
    })();
  }, [debouncedValue]);

  return (
    <>
      <Input
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        type="text"
        placeholder="앨범 찾기..."
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        autoComplete="off"
        required
      />

      {searchResult && !isTyping && <Result data={searchResult} />}
    </>
  );
}

export default AlbumSearch;
