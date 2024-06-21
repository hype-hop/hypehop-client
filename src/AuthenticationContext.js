import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import BASE_URL from './config';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const memoizedUser = useMemo(() => [user, setUser], [user]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user || null);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  }, []);

  return <AuthenticationContext.Provider value={memoizedUser}>{children}</AuthenticationContext.Provider>;
}
