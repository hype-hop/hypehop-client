import { MyReview, Review } from './review';

export interface User {
  _id: string;
  name: string;
  displayName?: string;
  image: string;
  email: string;
  password: string;
  createdAt: string;
  favorites: { [key: string]: boolean };
  favoritesReview: { [key: string]: boolean };
}

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

export interface Profile {
  users: string;
  reviews: Review[];
}
