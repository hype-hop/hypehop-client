import { AlbumReview } from './albumChart';
import { MyReview } from './review';

export interface MyInformation {
  comments: [];
  favReviews: AlbumReview[];
  favStories: [];
  pageDescription: string;
  pageKeywords: string;
  pageTitle: string;
  reviews: MyReview[];
  stories: [];
}
