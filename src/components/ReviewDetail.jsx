
import React from 'react';

import { Link } from 'react-router-dom';

function ReviewDetail({data}) {




  
  return (
    <div className="Review-detail">



    <div key={data?.review._id} className="reviews-body">
      <div className="chip-chip">
        <img 
        style={{ width: '50px', height: '50px' }}
        src={data?.review.user.image} alt="user-image" />
        <a style={{ color: 'black' }} href={`/user/${data?.review.user._id}`}>
          {data?.review.user.name ? <>{data?.review.user.name}</> : <>{data?.review.user.displayName}</>}
        </a>
      </div>



      <p class="card-title">{data?.review.title}</p>

<ul>
<li>앨범 평점: {data?.review.albumRating}</li>
<p>트랙별 평점</p>


<table className="striped">
      {data?.review.tracks.map((disc, index) => (
        <React.Fragment key={index}>
          <thead>
            <tr>
              <th>Disc {index + 1}</th>
            </tr>
          </thead>
          <tbody>
            {disc.trackTitle.map((track, trackIndex) => (
              <tr key={trackIndex}>
                <td>{track}</td>
                <td>
                  {data?.review.trackRating && data?.review.trackRating[index]
                    ? data?.review.trackRating[index][trackIndex]
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </React.Fragment>
      ))}
    </table>

    <p >앨범 평</p>  
             <li> 
            
                <div class="content-body-show" >{ data?.review.body }</div> 
            
                 </li>


                 <div class="reviewedAblum">
    <Link to={`/album/${data?.review.albumId}`}>

<img  src={data?.review.thumbnail} alt="album-cover"/>
<p>{data?.review.albumTitle} </p>


</Link>
</div>



</ul>




    </div>






    </div>

  );
}

export default ReviewDetail;
