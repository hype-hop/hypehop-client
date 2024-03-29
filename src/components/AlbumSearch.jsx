import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

function AlbumSearch() {
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${BASE_URL}/album/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the server');
      }

      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('no res');
    }
  };

  return (
    <div className="Album">
      <h1>앨범 검색</h1>

      <div className="album-search">
        <form id="searchForm">
          <div className="search">
            <input
              type="text"
              id="keyword"
              name="keyword"
              placeholder="앨범명으로 검색해보세요"
              onChange={handleChange}
              required
            />
            <button onClick={handleSearch} type="submit" className="searchButton">
              검색
            </button>
          </div>
        </form>

        <div id="searchResults">
          {Array.isArray(data) ? (
            data.map((album) => (
              <Link to={album.id}>
                <div>
                  <img src={album.images[1].url} alt="Album-cover" />
                  <p>AlbumId:{album.id}</p>
                  {album.name}
                </div>{' '}
              </Link>
            ))
          ) : (
            <p>Empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlbumSearch;
