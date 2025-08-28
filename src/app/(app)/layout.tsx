

'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { User, UserProvider } from '@/contexts/user-context';


function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user: firebaseUser, loading } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.replace('/');
    } else if (firebaseUser) {
        // For now, we'll assign the admin role to the first user.
        // In a real app, this would come from your database.
        setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'admin',
        });
    }
  }, [firebaseUser, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
  }
  
  return (
    <UserProvider user={user} setUser={setUser}>
        <AppLayout>{children}</AppLayout>
    </UserProvider>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <ProtectedLayout>{children}</ProtectedLayout>
  );
}
