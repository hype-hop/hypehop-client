import { Review } from './review';

export interface AlbumData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  albumData: any;
  id: string;
  disc_total: number[];
  albumRatingAverage: number;
  reviews: Review[];
  storedAverageArr: number[];
  reviewUser: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spotify_artist_genre: any;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
}
