
'use client';

import { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import type { User } from '@/lib/types';

type UserContextType = {
  user: User;
  setUser?: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, user, setUser }: { children: ReactNode; user: User, setUser?: Dispatch<SetStateAction<User | null>> }) {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
