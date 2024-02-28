
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch('/api/user')
      .then((response) => response.json())
      .then((data) => {
       
        setUser(data.user || null);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUser(null); 
      });
  }, []);




  return (
    <AuthenticationContext.Provider value={{ user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
