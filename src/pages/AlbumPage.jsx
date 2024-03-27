import React, { useState,useEffect } from 'react';
import AlbumSearch from '../components/AlbumSearch';
import RecentlyReviewed from '../components/RecentlyReviewed';
import AlbumChart from '../components/AlbumChart';


function AlbumPage() {


  
  return (
    <div className="Album">

<h1>AlbumPage.jsx</h1>

<AlbumSearch/>
<RecentlyReviewed/>
<AlbumChart/>


    </div>

  );
}

export default AlbumPage;
