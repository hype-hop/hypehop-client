import { useState } from 'react';
import AlbumSearch from './AlbumSearch';
import { AlbumSearchResult } from '../types/albumSearch';
import RatingAlbum from './RatingAlbum';
import { AlbumForReview } from '../types/albumReview';

function AlbumReviewForm() {
  const [searchResult, setSearchResult] = useState<AlbumSearchResult[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumForReview | null>(null);
  return (
    <>
      <AlbumSearch searchResult={searchResult} setSearchResult={setSearchResult} setSelectedAlbum={setSelectedAlbum} />
      {selectedAlbum && (
        <RatingAlbum
          album={selectedAlbum!}
          rating={selectedAlbum.rating!}
          setRating={(rating: number) => {
            setSelectedAlbum((prev) => ({ ...prev!, rating }));
          }}
        />
      )}
    </>
  );
}

export default AlbumReviewForm;
