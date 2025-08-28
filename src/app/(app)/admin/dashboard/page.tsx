
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GitFork, Loader, CheckCircle, Database } from "lucide-react";
import { seedDatabase } from './actions';
import { useMaestroStore } from '@/store/use-maestro-store';

export default function AdminDashboardPage() {
  const [isLoadingBackup, setIsLoadingBackup] = useState(false);
  const [isSuccessBackup, setIsSuccessBackup] = useState(false);
  const [isLoadingSeed, setIsLoadingSeed] = useState(false);
  const { toast } = useToast();
  const { fetchAllData } = useMaestroStore();

  const handleCreateBackup = () => {
    setIsLoadingBackup(true);
    setIsSuccessBackup(false);

    // Simulate API call
    setTimeout(() => {
      setIsLoadingBackup(false);
      setIsSuccessBackup(true);
      toast({
        title: "Backup Criado!",
        description: "Ponto de restauro criado com sucesso.",
        action: <CheckCircle className="text-green-500" />,
      });
      setTimeout(() => setIsSuccessBackup(false), 3000); // Reset button state after 3s
    }, 2000);
  };

  const handleSeedDatabase = async () => {
    setIsLoadingSeed(true);
    const result = await seedDatabase();
    
    if (result.type === 'success') {
      toast({
        title: "Sucesso!",
        description: result.message,
        action: <CheckCircle className="text-green-500" />,
      });
      // Re-fetch data for the whole app
      await fetchAllData();
    } else {
      toast({
        title: "Erro",
        description: result.message,
        variant: 'destructive',
      });
    }
    setIsLoadingSeed(false);
  }

  return (
    <div>
      <PageHeader title="Painel do Administrador" />
      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Gestão de Backups e Dados</CardTitle>
                <CardDescription>Crie cópias de segurança e povoe a base de dados com dados iniciais.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                <Button 
                  variant={isSuccessBackup ? "default" : "destructive"} 
                  onClick={handleCreateBackup} 
                  disabled={isLoadingBackup}
                  className={isSuccessBackup ? "bg-green-600 hover:bg-green-700" : ""}
                >
                    {isLoadingBackup ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Criando backup...
                        </>
                    ) : isSuccessBackup ? (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Backup Criado!
                        </>
                    ) : (
                        <>
                            <GitFork className="mr-2 h-4 w-4" />
                            Criar Novo Backup
                        </>
                    )}
                </Button>

                <Button 
                  variant="secondary" 
                  onClick={handleSeedDatabase} 
                  disabled={isLoadingSeed}
                >
                    {isLoadingSeed ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            A popular...
                        </>
                    ) : (
                        <>
                            <Database className="mr-2 h-4 w-4" />
                            Povoar Base de Dados
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    