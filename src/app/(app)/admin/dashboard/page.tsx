
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GitFork, Loader, CheckCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleCreateBackup = () => {
    setIsLoading(true);
    setIsSuccess(false);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Backup Criado!",
        description: "Ponto de restauro criado com sucesso.",
        action: <CheckCircle className="text-green-500" />,
      });
      setTimeout(() => setIsSuccess(false), 3000); // Reset button state after 3s
    }, 2000);
  };

  return (
    <div>
      <PageHeader title="Painel do Administrador" />
      <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Gestão de Backups</CardTitle>
                <CardDescription>Crie e gerencie cópias de segurança da base de dados da aplicação. Esta ação deve ser executada com cautela.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button 
                  variant={isSuccess ? "default" : "destructive"} 
                  onClick={handleCreateBackup} 
                  disabled={isLoading}
                  className={isSuccess ? "bg-green-600 hover:bg-green-700" : ""}
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Criando backup...
                        </>
                    ) : isSuccess ? (
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
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
