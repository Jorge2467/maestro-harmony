
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { useAuth } from '@/contexts/auth-context';
import { AlertTriangle } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { firebaseEnabled } = useAuth();

  return (
    <AppLayout>
      {!firebaseEnabled && (
        <div className="bg-yellow-500 text-white text-center p-2">
          <AlertTriangle className="inline-block mr-2" />
          Firebase is not configured. The application is running in offline mode.
        </div>
      )}
      {children}
    </AppLayout>
  );
}
