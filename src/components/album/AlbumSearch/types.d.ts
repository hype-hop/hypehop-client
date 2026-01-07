import { Dispatch, RefObject, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';

interface AlbumSearchProps {
  results: AlbumSearchResult[] | null;
  setResults: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  variant?: 'album' | 'topster';
  setSelectedAlbum?: Dispatch<SetStateAction<AlbumForReview | null>>;
}

interface AlbumSearchInputProps extends AlbumSearchProps {
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
  setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  index: number;
}

export interface AlbumSearchResultListProps {
  result: AlbumSearchResult[] | null;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword?: Dispatch<SetStateAction<string | null>>;
}
