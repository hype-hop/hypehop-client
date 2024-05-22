import { Review } from './review';

interface AlbumDetailStoredAverage {
  key: number;
  values: string[];
}

export interface AlbumData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  albumData: any;
  id: string;
  disc_total: number[];
  albumRatingAverage: string;
  reviews: Review[];
  storedAverageArr: AlbumDetailStoredAverage[];
  reviewUser: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spotify_artist_genre: any;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
}
