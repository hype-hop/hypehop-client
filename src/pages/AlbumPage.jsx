import React, { useState,useEffect } from 'react';
import AlbumSearch from '../components/AlbumSearch';
import RecentlyReviewed from '../components/RecentlyReviewed';
import AlbumChart from '../components/AlbumChart';


function AlbumPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/album/api');
        const result = await response.json();
        setData(result);
       
     //console.log(result)
       
      } catch (error) {
        console.error('Error fetching data:', error);
   
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="Album">

<h1>AlbumPage.jsx</h1>

<AlbumSearch/>
<RecentlyReviewed data={data} />
<AlbumChart data={data} />


    </div>

  );
}

export default AlbumPage;
