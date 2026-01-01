import { Dispatch, RefObject, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';

export interface AlbumSearchProps {
  searchResult: AlbumSearchResult[] | null;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  variant?: 'album' | 'topster';
}

export interface AlbumSearchInputProps extends AlbumSearchProps {
  albumSearchBoxRef: RefObject<HTMLDivElement | null>;
  albumSearchInputRef: RefObject<HTMLInputElement | null>;
  isClickedOutside: string;
  setIsClickedOutside: Dispatch<SetStateAction<string>>;
  keyword: string | null;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  debouncedValue: string | null;
  isSearchCompleted: boolean;
}

export interface AlbumSearchResultItemProps {
  album: AlbumSearchResult;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  index: number;
}

export interface AlbumSearchResultListProps {
  searchResult: AlbumSearchResult[] | null;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setSearchResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword?: Dispatch<SetStateAction<string | null>>;
}
