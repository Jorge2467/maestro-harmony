
'use client';

import { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'coordinator';
};

type UserContextType = {
  user: User | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, user, setUser }: { children: ReactNode; user: User | null, setUser?: Dispatch<SetStateAction<User | null>> }) {
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
