

'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';
import { UserProvider } from '@/contexts/user-context';

// Simulando una verificación de autenticación
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En una aplicación real, aquí llamarías a tu backend o a un provider de autenticación.
    // Para propósitos de desarrollo, simulamos un usuario administrador autenticado.
    const checkAuth = () => {
      const userIsLoggedIn = true; 
      if (userIsLoggedIn) {
        setUser({
          name: 'Carlos Oliveira',
          email: 'carlos.oliveira@maestroharmony.com',
          role: 'admin',
          avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
          phone: '(11) 98765-4321',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { user, setUser, loading };
}


export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [user, loading, router]);
  
  if(loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    )
  }

  if (!user) {
    // Esto no debería ocurrir con la simulación actual, pero es una buena práctica mantenerlo.
    // Si la autenticación falla, redirigimos al login
    return null;
  }
  
  return (
    <UserProvider user={user} setUser={setUser}>
        <AppLayout>{children}</AppLayout>
    </UserProvider>
  );
}
