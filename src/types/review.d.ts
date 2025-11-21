import { ReviewTracks } from './albumChart';
import { FavoriteClickedUser } from './favorite';
import { User } from './user';

export interface CommentData {
  _id: string;
  content: string;
  review: string;
  createdAt: string;
  user: User;
}

export interface Review {
  previewUrl: string;
  length: number;
  _id: string;
  title: string;
  body: string;
  thumbnail: string;
  createdAt: string;
  user: User;
  isFavorite: Array<FavoriteClickedUser>;
  comments: Array<Comment>;
  albumId: string;
  albumTitle: string;
  albumRating: number;
  artists: string[];
  artistGenre: string[];
  tracks?: ReviewTracks[];
}

interface PaginatedReviews {
  totalPage: number;
  reviews: Review[];
}

export interface ReviewAPIResponse {
  id: string;
  review: Review;
  comments: CommentData[];
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  albumRatingAverage: number;
}

export interface MyReview extends Review {
  albumId: string;
  albumName: string;
  artists: string[];
  status: string;
}

export interface ReviewsRank extends Review {
  favoriteCount: number;
}

export interface FormData {
  title: string;
  status: string;
  albumRating: number | null | undefined;
  body: string;
  albumTitle: string | null | undefined;
  albumId: string | null;
  thumbnail: string | null;
  user: string | null;
  albumReleaseDate: string | null;
  trackTitle: string[];
  artistGenre: string[];
  artists: string[];
  albumName: string;
  bestTrackId: string | null | undefined;
  bestTrackName: string | null | undefined;
  previewUrl: string | null | undefined;
}
