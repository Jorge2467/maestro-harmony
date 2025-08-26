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
                <CardTitle>Ponto de Restauro</CardTitle>
                <CardDescription>Crie um ponto de restauro do estado atual da aplicação. Esta ação só deve ser executada em momentos controlados.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="destructive">
                    <GitFork className="mr-2 h-4 w-4" />
                    Criar Ponto de Restauro
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
