import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AlbumCharts } from '../types/albumChart';
import BASE_URL from '../config';

function AlbumChart() {
  const [data, setData] = useState<AlbumCharts | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/album/api`);
        const result = await response.json();
        setData(result);

        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="album-chart">
      <h1>앨범 차트</h1>

      <a href="/album?sort=alltime">All Time</a>
      <a href="/album?sort=yearly">1 year</a>

      <div className="title">
        <h1>인기 리뷰 앨범</h1>
        <p>
          하입합 유저들의 평가를 반영한 차트입니다.
          <br />
          앨범의 평균 평점과 평가 수를 반영합니다.
        </p>
      </div>

      {Array.isArray(data?.top5Albums) ? (
        data?.top5Albums.map((item) => (
          <Link to={`${item.albumId}`} key={item.albumId}>
            <div className="box">
              <div className="cover">
                <img src={item.thumbnail} alt="cover" />
              </div>

              <div className="name">
                <span>{item.averageRating}</span> {item.albumTitle}
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

export default AlbumChart;
