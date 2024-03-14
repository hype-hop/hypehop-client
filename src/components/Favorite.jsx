import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthenticationContext";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Favorite({reviewId}) {

  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

    const [data, setData] = useState(null);

   
   
  useEffect(() => {

    if (!user) {
      
      return ;
    }
    

    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        const result = await response.json();
        const favoritedReview = Object.keys(result.user.favoritesReview)
        setData(favoritedReview);
        
        setIsFavorite(favoritedReview.includes(reviewId));


      
    
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);
 



  const addToFavorite = async (e) => {
    
    e.stopPropagation();
      
    if (!user) {
      
      return ;
    }
 
    setIsFavorite(!isFavorite);

    try {
      const response = await fetch(`/api/favorite/review/${reviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        
          isFavorite:!isFavorite
        })
      });

      if (!response.ok) {
        // Handle error
        console.error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };


  const heartIcon = isFavorite ? faHeart : faHeartRegular;

  
  return (
    <div className="Favorite">



<FontAwesomeIcon
      icon={heartIcon}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={addToFavorite}
    />




    </div>

  );
}

export default Favorite;
