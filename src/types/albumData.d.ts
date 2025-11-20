import { Review } from './review';

interface AlbumDetailStoredAverage {
  key: number;
  values: string[];
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Favorite {
  id: string;
  value: boolean;
}

interface Comment {
  id: string;
  body: string;
}

interface LinkedFrom {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  linked_from?: LinkedFrom;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface Tracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[];
}

interface Album {
  albumType: string;
  totalTracks: number;
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights?: {
    text: string;
    type: string;
  }[];
  externalIds?: {
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
  albumRatingAverage?: number;
  reviews?: Review[];
  isFavorite?: Favorite[];
  comments?: Comment[];
  view?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  v: number;
  googleId?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  favorites?: Favorite[];
}

export interface AlbumData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  albumData: Album;
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
