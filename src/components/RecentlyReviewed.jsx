
import { Link } from 'react-router-dom';

function RecentlyReviewed({data}) {






  
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
