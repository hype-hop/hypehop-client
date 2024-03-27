import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthenticationContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Comment({comments, reviewId}) {


  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [comment, setComment] = useState(null);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/comments/review/${reviewId}`);
        const result = await response.json();
        setComment(result.comments);


       
  
       
      } catch (error) {
        console.error('Error fetching data:', error);
   
      }
    };

    fetchData();
  }, []);




    const handleCommentChange = (e) => {
        setContent(e.target.value);
      };


    const addComment = async (e) => {
        try {
          e.preventDefault();
          const response = await fetch(`/api/comments/review/${reviewId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          });
          
      
          if (!response.ok) {
            throw new Error('Failed to add comment');
           
          }
          else{
            window.location.reload()
          }
    
         
        } catch (error) {
          console.error('Error fetching data:', error);
          console.log('no res')
  
        }
      };
      


  
  return (
    <div className="Comment">
<h5>댓글</h5>


{comments?.map(comment => (
    <div  className="comments-body">
      <div >
        <img 
        style={{ width: '50px', height: '50px' }}
        src={comment.user.image} alt="user-image" />
        <a style={{ color: 'black' }} href={`/user/${comment.user._id}`}>
          {comment.user.name ? <>{comment.user.name}</> : <>{comment.user.displayName}</>}
        </a>
      </div>

<div>
    {comment.content}
    {comment.createdAt}


    {comment.user._id === user?._id && (
            <form action={`/api/comments/${reviewId}/delete/${comment._id}`} method="POST" id="delete-form">
              <input type="hidden" name="_method" value="DELETE" />
              <button type="submit">
                삭제
              </button>
            </form>
          )}


</div>


    </div>
  ))}









<div class="commentForm">

<p>댓글 달기</p>


<form id="commentForm">
<textarea 
name="commentContent" 
rows="4" 
cols="50"
value= {content}
onChange={handleCommentChange}
></textarea>
<button onClick={addComment} type="submit">Add Comment</button>
</form>  
        
</div>  



    </div>

  );
}

export default Comment;
