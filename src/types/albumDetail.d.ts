import { AlbumImage } from './albumSearch';

interface AlbumDataTracksItems {
  disc_number: number;
  name: string;
}

interface AlbumDataTracks {
  items: AlbumDataTracksItems[];
}

interface AlbumDataArtists {
  name: string;
}

interface AlbumData {
  tracks: AlbumDataTracks;
  images: AlbumImage[];
  artists: AlbumDataArtists[];
  name: string;
  release_date: string;
}

interface AlbumDetailStoredAverage {
  key: number;
  values: string[];
}

export interface AlbumDetailType {
  albumData: AlbumData;
  storedAverageArr: AlbumDetailStoredAverage[];
  albumRatingAverage: string;
  spotify_artist_genre: string[];
  reviewUser: string[];
  reviews: [];
}
