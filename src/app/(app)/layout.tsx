'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Simulando una verificación de autenticación
function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // En una aplicación real, aquí llamarías a tu backend o a un provider de autenticación.
    // Para propósitos de desarrollo, ahora simularemos un usuario siempre autenticado.
    const checkAuth = () => {
      // Para probar el layout autenticado, puedes cambiar esto a `true`
      const userIsLoggedIn = true; 
      setIsAuth(userIsLoggedIn);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuth, loading };
}


export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuth) {
      router.replace('/');
    }
  }, [isAuth, loading, router]);
  
  if(loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    )
  }

  if (!isAuth) {
    // Esto no debería ocurrir con la simulación actual, pero es una buena práctica mantenerlo.
    return null;
  }
  
  return <AppLayout>{children}</AppLayout>;
}
