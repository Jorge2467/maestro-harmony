
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Erro de Registo',
        description: 'As palavras-passe não coincidem.',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signup(email, password);
      toast({
        title: 'Registo bem-sucedido!',
        description: 'A sua conta foi criada. Será redirecionado.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      let description = 'Ocorreu um erro ao criar a sua conta.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'Este endereço de email já está a ser utilizado.';
      } else if (error.code === 'auth/weak-password') {
        description = 'A palavra-passe deve ter pelo menos 6 caracteres.';
      }
      toast({
        variant: 'destructive',
        title: 'Erro de Registo',
        description,
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>Preencha os seus dados para criar a sua conta.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" type="text" placeholder="O seu nome completo" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@exemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Palavra-passe</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar palavra-passe</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
             {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Criar Conta
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/" className="font-medium text-primary hover:underline">
              Iniciar sessão
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
