import { CommentData, Review } from './review';

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
  comments: CommentData[];
  favReviews: Review[];
  favStories: [];
  pageDescription: string;
  pageKeywords: string;
  pageTitle: string;
  reviews: Review[];
  stories: [];
}

export interface Profile {
  users: string;
  reviews: Review[];
}
