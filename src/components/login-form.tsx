'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica de autenticación aquí
    
    // Al autenticar con éxito, redirigir al dashboard
    router.push('/dashboard');
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@ejemplo.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Regístrate
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
