import { Dispatch, RefObject, SetStateAction } from 'react';
import { AlbumSearchResult } from '../../../types/albumSearch';
import { AlbumForReview } from '../../../types/albumReview';

interface AlbumSearchBaseProps {
  result: AlbumSearchResult[] | null;
  setResult: Dispatch<SetStateAction<AlbumSearchResult[] | null>>;
}

interface AlbumSearchPropsAlbum extends AlbumSearchBaseProps {
  variant?: 'album';
  setSelectedAlbum: Dispatch<SetStateAction<AlbumSearchResult | null>>;
}

interface AlbumSearchPropsTopster extends AlbumSearchBaseProps {
  variant: 'topster';
  setSelectedAlbum: Dispatch<SetStateAction<AlbumSearchResult | null>>;
}

export type AlbumSearchProps = AlbumSearchPropsAlbum | AlbumSearchPropsTopster;

interface AlbumSearchInputPropsBase {
  albumSearchBoxRef: RefObject<HTMLDivElement | null>;
  albumSearchInputRef: RefObject<HTMLInputElement | null>;
  isClickedOutside: string;
  setIsClickedOutside: Dispatch<SetStateAction<string>>;
  keyword: string | null;
  setKeyword: Dispatch<SetStateAction<string | null>>;
  debouncedValue: string | null;
  isSearchCompleted: boolean;
}

export type AlbumSearchInputProps =
  | (AlbumSearchPropsAlbum & AlbumSearchInputPropsBase)
  | (AlbumSearchPropsTopster & AlbumSearchInputPropsBase);

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
