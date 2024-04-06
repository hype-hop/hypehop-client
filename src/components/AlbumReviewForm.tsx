import { useState } from 'react';
import AlbumSearch from './AlbumSearch';
import { AlbumSearchResult } from '../types/albumSearch';
// import RatingAlbum from './RatingAlbum';

function AlbumReviewForm() {
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [, setSelectedAlbum] = useState<AlbumSearchResult | null>(null);
  return (
    <>
      <AlbumSearch searchResult={searchResult} setSearchResult={setSearchResult} setSelectedAlbum={setSelectedAlbum} />
      {/* {selectedAlbum && <RatingAlbum album={selectedAlbum!} />} */}
    </>
  );
}

export default AlbumReviewForm;
