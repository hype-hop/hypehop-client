import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const memoizedUser = useMemo(() => [user, setUser], [user]);

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

  return <AuthenticationContext.Provider value={memoizedUser}>{children}</AuthenticationContext.Provider>;
}
