import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';

function Dashboard() {
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


{Array.isArray(data?.reviews)
          ? data.reviews.map(review => <div>{review.albumTitle}</div>)
          : <p>Nothing</p>}



<a href="/api/logout">Logout</a>



  

    </div>

  );
}

export default Dashboard;
