import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth();



    const [data, setData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true)

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        setData(result);
       
      console.log(result)
       
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
    <div className="Dashboard">

<h1>Hello {user?.name} </h1>


<h3>내 리뷰</h3>

{data?.reviews
          ? data.reviews.map(review => 
          <table>
<tbody>
            <tr>
            <td class="albumTitleMy"> {review.albumTitle }  </td>
            <td class="albumRatingMy">{review.albumRating}</td>

            <td><Link to={`/album/review/${review._id}`}>{review.title}</Link></td>
            <td>{review.createdAt}</td>
            <td><span class="dash-status">{review.status}</span></td>
            <td class="icons">
                <Link to={`/album/review/edit/${review._id}`}>
                    EDIT
                </Link>

                <form action={`/album/api/review/delete/${review._id}`} method="POST" id="delete-form">
                    <input type="hidden" name="_method" value="DELETE"/>
                    <button type="submit" >
                        Delete
                    </button>
                </form>

                
                
            </td>
        </tr>
      </tbody> 
      </table>           
            
            )
          : <p>Nothing</p>}







<h3>내가 평가한 앨범</h3>
  

{data?.reviews
          ? data.reviews.map(review => 
          <div>{review.albumTitle} - {review.albumRating} -{review.createdAt}</div>
          
          )
          : <p>Nothing</p>}



<h3>좋아요한 리뷰</h3>


{data?.favReviews
          ? data.favReviews.map(review => 
            <div>
          <Link to={`/album/review/${review._id}`}>{review.title} </Link>
         </div>
          )
          : <p>Nothing</p>}


<h3>내 댓글</h3>

{data?.comments
          ? data.comments.map(comment => 
        <div>
<Link to={`/album/review/${comment.review}`}>{comment.content}</Link>
          </div>
          )
          : <p>Nothing</p>}


<div>
<a href="/api/logout">Logout</a>
</div>

    </div>

  );
}

export default DashboardPage;
