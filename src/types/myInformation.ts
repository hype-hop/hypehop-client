import { MyReview } from './review';

export interface MyInformation {
  comments: [];
  favReviews: MyReview[];
  favStories: [];
  pageDescription: string;
  pageKeywords: string;
  pageTitle: string;
  reviews: MyReview[];
  stories: [];
}
