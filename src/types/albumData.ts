import { Review } from './review';

export interface AlbumData {
  albumData: any;
  id: string;
  disc_total: number[];
  albumRatingAverage: number;
  reviews: Review[];
  storedAverageArr: number[];
  reviewUser: string;
  spotify_artist_genre: any;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string[];
}
