
import { Link } from 'react-router-dom';

function AlbumChart({data}) {


   




  
  return (
    <div className="album-chart">

<h1>앨범 차트</h1>

<a href={"/album?sort=alltime"}>All Time</a>
<a href={"/album?sort=yearly"}>1 year</a>


<div class="title">
		<h1>Top chart</h1>
		<p>하입합 유저들의 평가를 반영한 차트입니다.<br/>앨범의 평균 평점과 평가 수를 반영합니다.</p>
	</div>

{Array.isArray(data?.top5Albums)
          ? data.top5Albums.map(item => 
            
            <Link to={`${item.albumId}`}>
            <div class="box">
                
                <div class="number"></div>
            
                <div class="cover"><img src={item.thumbnail} alt="cover"/></div>
            
                <div class="name"><span>{item.averageRating}</span> {item.albumTitle}</div>
        
            
            </div>
            </Link>

            )
          : <p>Empty</p>}


    </div>

  );
}

export default AlbumChart;
