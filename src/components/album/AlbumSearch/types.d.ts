import { Dispatch, RefObject, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';

interface AlbumSearchBaseProps {
  result: AlbumSearchResult[] | null;
  setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
}

interface AlbumSearchDefaultProps extends AlbumSearchBaseProps {
  variant?: 'album';
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
}

interface AlbumSearchTopsterProps extends AlbumSearchBaseProps {
  variant: 'topster';
  setSelectedAlbum?: Dispatch<SetStateAction<AlbumSearchResult | null>>;
}

type AlbumSearchProps = AlbumSearchDefaultProps | AlbumSearchTopsterProps;

// interface AlbumSearchProps {
//   variant?: 'album' | 'topster';
//   result: AlbumSearchResult[] | null;
//   setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
//   setSelectedAlbum?: Dispatch<SetStateAction<AlbumSearchResult | null>>;
// }

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

export interface TopsterSearchResultProps {
  result: AlbumSearchResult[] | null;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
}

export interface AlbumSearchResultListProps {
  result: AlbumSearchResult[] | null;
  setSelectedAlbum: Dispatch<SetStateAction<AlbumForReview | null>>;
  setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
  setKeyword?: Dispatch<SetStateAction<string | null>>;
}
