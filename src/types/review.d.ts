import { User } from './user';

export interface CommentType {
  _id: string;
  content: string;
  createdAt: string;
  user: User;
}

export interface Review {
  _id: string;
  title: string;
  body: string;
  thumbnail: string;
  createdAt: string;
  user: User;
  isFavorite: Array<string>;
  comments: Array<Comment>;
  albumRating: number;
}

export interface ReviewsRank extends Review {
  favoriteCount: number;
}

export interface FormData {
  title: string;
  status: string;
  albumRating: number;
  body: string;
  albumTitle: string | null;
  albumId: string | null;
  thumbnail: string | null;
  user: string | null;
  albumReleaseDate: string | null;
  trackTitle: string[];
  artistGenre: string[];
}
