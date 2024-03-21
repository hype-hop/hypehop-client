
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';

function RecentlyReviewed() {

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
    <div className="recent-review">

<h1>최근 리뷰된 앨범</h1>

{Array.isArray(data?.uniqueAlbumsArray)
          ? data.uniqueAlbumsArray.map(item => <div>
         
         <Link to={`${item.albumId}`}>

<div class="album-card">

   <div class="album-card-content">
     <h3 class="card-title-recently">{item.albumTitle}</h3>
     <div class="separator"></div>
     <p class="card-text">평점: {item.albumRating}</p>
     
  
    
   </div>
 </div>

</Link>


            </div>)
          : <p>Empty</p>}


    </div>

  );
}

export default RecentlyReviewed;
