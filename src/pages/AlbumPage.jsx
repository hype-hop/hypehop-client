import React from 'react';
import AlbumSearch from '../components/AlbumSearch';
import RecentlyReviewed from '../components/RecentlyReviewed';
import WriteReview from '../components/WriteReview';

function AlbumPage() {
  return (
    <div className="Album">
      <h1>AlbumPage.jsx - 작성페이지 </h1>

      <AlbumSearch />
      <WriteReview />
      <RecentlyReviewed />
    </div>
  );
}

export default AlbumPage;
