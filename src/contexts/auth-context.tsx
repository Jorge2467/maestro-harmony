
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebaseEnabled } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  firebaseEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseEnabled) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    if (!firebaseEnabled) return Promise.resolve();
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const signup = (email: string, pass: string) => {
    if (!firebaseEnabled) return Promise.resolve();
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    if (!firebaseEnabled) return Promise.resolve();
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    firebaseEnabled,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
