'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import BASE_URL from './config';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
  favorites: [];
  favoritesReview: [];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

const AuthenticationContext = createContext<UserContextType>(initialUserContext);

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const memoizedUser = useMemo(() => ({ user, setUser }), [user]);

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
