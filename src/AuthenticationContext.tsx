'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import getUser from './api/auth';

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

type ConditionalUser = User | null | undefined;

interface UserContextType {
  user: ConditionalUser;
  setUser: React.Dispatch<React.SetStateAction<ConditionalUser>>;
  refreshUser: () => Promise<void>;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
  refreshUser: async () => {},
};

const AuthenticationContext = createContext<UserContextType>(initialUserContext);

export const useAuth = () => {
  return useContext(AuthenticationContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState<ConditionalUser>();

  const refreshUser = async () => {
    try {
      const data = await getUser();
      setUser(data.user || null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const memoizedUser = useMemo(() => ({ user, setUser, refreshUser }), [user]);

  useEffect(() => {
    refreshUser();
  }, []);

  return <AuthenticationContext.Provider value={memoizedUser}>{children}</AuthenticationContext.Provider>;
}
