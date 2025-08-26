import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitFork } from "lucide-react";

export default function AdminDashboardPage() {
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
                <Button variant="destructive">
                    <GitFork className="mr-2 h-4 w-4" />
                    Criar Novo Backup
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
