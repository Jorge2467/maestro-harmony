'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Card className="w-full shadow-lg">
       <CardHeader>
        <CardTitle>Iniciar Sessão</CardTitle>
        <CardDescription>Insira as suas credenciais para aceder à sua conta.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@exemplo.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Palavra-passe</Label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Esqueceu-se da palavra-passe?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Iniciar Sessão
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Registe-se
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
