import { useState } from 'react';
import AlbumSearch from './AlbumSearch';
import { AlbumSearchResult } from '../types/albumSearch';
import RatingAlbum from './RatingAlbum';

function AlbumReviewForm() {
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumSearchResult | null>(null);
  const [albumRating, setAlbumRating] = useState<number>(0.5);
  return (
    <>
      <AlbumSearch searchResult={searchResult} setSearchResult={setSearchResult} setSelectedAlbum={setSelectedAlbum} />
      {selectedAlbum && <RatingAlbum album={selectedAlbum!} rating={albumRating} setRating={setAlbumRating} />}
    </>
  );
}

export default AlbumReviewForm;
