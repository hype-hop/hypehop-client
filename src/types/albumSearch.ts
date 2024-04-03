interface AlbumSearchResultImage {
  width: number;
  height: number;
  url: string;
}

export interface AlbumSearchResult {
  id: string;
  name: string;
  images: AlbumSearchResultImage[];
}
