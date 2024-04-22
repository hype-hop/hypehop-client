import { AlbumSearchResult } from './albumSearch';

export interface AlbumForReview extends AlbumSearchResult {
  rating?: number | null;
}
