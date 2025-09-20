import { useState, useEffect } from 'react';
import Link from 'next/link';
import BASE_URL from '../../config';
import { AlbumCharts } from '../../types/albumChart';

function RecentlyReviewed() {
  const [data, setData] = useState<AlbumCharts | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="recent-review">
      <h1>최근 리뷰된 앨범</h1>

      {Array.isArray(data?.uniqueAlbumsArray) ? (
        data.uniqueAlbumsArray.map((item) => (
          <Link key={`recently-reviewed-${item.albumId}`} href={`${item.albumId}`}>
            <div className="album-card">
              <div className="album-card-content">
                <h3 className="card-title-recently">{item.albumTitle}</h3>
                <div className="separator" />
                <p className="card-text">평점: {item.albumRating}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Empty</p>
      )}
    </div>
  );
}

export default RecentlyReviewed;
