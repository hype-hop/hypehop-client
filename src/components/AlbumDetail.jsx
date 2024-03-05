import WriteReview from "./WriteReview";



function AlbumDetail({data}) {

console.log(data)

    const tracksByDisc = {};

    data?.albumData.tracks.items.forEach(track => {
        const discNumber = track.disc_number || 1; 
        if (!tracksByDisc[discNumber]) {
          tracksByDisc[discNumber] = [];
        }
        tracksByDisc[discNumber].push(track);
      });


      const renderTracks = Object.keys(tracksByDisc).map(discNumber => (
        <div key={discNumber}>
          <h3>Disc {discNumber}</h3>
          <div>
            {tracksByDisc[discNumber].map((track, index) => (
          <div key={index}>{index+1}. 
          {track.name} - {isNaN(data?.storedAverageArr[discNumber-1]?.values[index])
            ? '평점이 없습니다.'
            : data?.storedAverageArr[discNumber-1]?.values[index]}
        </div>
        
            ))}
          </div>
        </div>
      ));




  
  return (
    <div className="Album-detail">


<ul>
   
            <img src={data?.albumData.images[1].url} alt="Album-Cover"/>
            <div id="title">
                <h3>
                {data?.albumData.artists.map((artist, index) => (
    <span key={index}>{artist.name}  </span>
    
  ))}
                </h3>
                <h3>{data?.albumData.name}</h3>
            </div>
            
            {data?.albumRatingAverage ? (
  <p>앨범 평점: {data?.albumRatingAverage} ({data?.reviews.length})</p>
) : (
  <p>앨범 평점: 평점이 없습니다.</p>
)}

<div>장르: {data?.spotify_artist_genre.map(
  genre=>(
    <div>{genre} </div>
  )
)}</div>
            

            <p>Release Date: {data?.albumData.release_date}</p>

            <h4>Tracklist:</h4>

           <div>{renderTracks}</div>

         
                <p>No tracklist available.</p>

    </ul>


    {data?.reviewUser.includes(data?.loggedInUser) ? (
  <p>이미 작성한 리뷰가 있습니다.</p>
) : (
  <WriteReview data={data}/>
)}





    </div>

  );
}

export default AlbumDetail;
