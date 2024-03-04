

function Reviewed({data}) {


 


  
  return (
    <div className="review-section">
    <h5>작성된 리뷰 : {data?.reviews.length} 개</h5>


    <div>
  {data?.reviews.map(review => (
    <div key={review._id} className="reviews-body">
      <div className="chip-chip">
        <img 
        style={{ width: '50px', height: '50px' }}
        src={review.user.image} alt="user-image" />
        <a style={{ color: 'black' }} href={`/stories/user/${review.user._id}`}>
          {review.user.name ? <>{review.user.name}</> : <>{review.user.displayName}</>}
        </a>
      </div>

      <a href={`/album/review/${review._id}`}>
        <div className="reviews">
          <div className="reviews-container">
            <p style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}> 한줄 평: </p>
            <p> {review.title}</p>
          </div>

          <div className="reviews-container">
            <p style={{ fontWeight: 'bold' }}>평점: </p>
            <p> {review.albumRating}</p>
          </div>
        </div>
      </a>
    </div>
  ))}
</div>



                 



</div>

  );
}

export default Reviewed;

