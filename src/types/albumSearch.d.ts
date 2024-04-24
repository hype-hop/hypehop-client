export interface AlbumImage {
  width: number;
  height: number;
  url: string;
}

interface AlbumArtist {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface AlbumSearchResult {
  id: string;
  name: string;
  images: AlbumImage[];
  artists: AlbumArtist[];
}
