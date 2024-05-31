import React, { Dispatch, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';
import AlbumSearchContextProvider from './AlbumSearchContext';
import AlbumSearchInput from './AlbumSearchInput';

export interface AlbumSearchProps {
  searchResult: AlbumSearchResult[] | null;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
}

function AlbumSearch({ searchResult, setSearchResult, setSelectedAlbum }: AlbumSearchProps) {
  return (
    <AlbumSearchContextProvider>
      <AlbumSearchInput
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        setSelectedAlbum={setSelectedAlbum}
      />
    </AlbumSearchContextProvider>
  );
}

export default AlbumSearch;
