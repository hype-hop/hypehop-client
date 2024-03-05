import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AlbumDetail from '../components/AlbumDetail';
import Reviewed from '../components/Reviewed';
import { useAuth } from '../AuthenticationContext';
import { useNavigate } from 'react-router-dom';


function AlbumShowPage() {

  const {id} = useParams();

  const [data, setData] = useState(null);


  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true)


  useEffect(() => {





    const fetchData = async () => {
      try {
        const response = await fetch(`/album/api/${id}`);
        const result = await response.json();
        setData(result);

        console.log(result.spotify_artist_genre)
      
       
  
       
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsAuthenticated(false);
   
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
   
    navigate('/login')
  }
  
  return (
    <div className="Album-show">

<h3>AlbumShowPage.jsx</h3>

<AlbumDetail data={data}/>
<Reviewed data={data}/>


    </div>

  );
}

export default AlbumShowPage;
