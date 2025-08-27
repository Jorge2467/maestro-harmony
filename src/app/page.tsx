import { LoginForm } from '@/components/login-form';
import { Music } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl animate-blob"></div>
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <main className="z-10 flex w-full max-w-md flex-col items-center space-y-8">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4 bg-primary/10 text-primary p-3 rounded-xl">
                <Music className="h-10 w-10" />
            </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Maestro Harmony
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Bem-vindo de volta. Inicie sessão para continuar.
          </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
