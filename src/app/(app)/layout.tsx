
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
  }

  if (!user) {
    return null; // or a redirect component
  }
  
  return <AppLayout>{children}</AppLayout>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <ProtectedLayout>{children}</ProtectedLayout>
  );
}
