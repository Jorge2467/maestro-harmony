
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StudentEvolutionChart } from "@/components/dashboard/student-evolution-chart";
import { LevelDistributionChart } from "@/components/dashboard/level-distribution-chart";
import { Download, Calendar, Info } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PredictiveAlert = {
    aluno: string;
    instrumento: string;
    risco: 'Alto' | 'Médio' | 'Baixo';
    motivo: string;
    acoes: string;
};

const alerts: PredictiveAlert[] = [
    { aluno: 'Ana Silva', instrumento: 'Piano', risco: 'Alto', motivo: '3 aulas consecutivas faltadas', acoes: 'Entrar em contato, oferecer reposição' },
    { aluno: 'João Santos', instrumento: 'Violino', risco: 'Médio', motivo: 'Desempenho em queda há 4 semanas', acoes: 'Reavaliar método, conversar com responsáveis' },
    { aluno: 'Mariana Oliveira', instrumento: 'Flauta', risco: 'Baixo', motivo: 'Pagamento em atraso', acoes: 'Enviar lembrete de pagamento' },
];

export const columns: ColumnDef<PredictiveAlert>[] = [
    { accessorKey: 'aluno', header: 'Aluno' },
    { accessorKey: 'instrumento', header: 'Instrumento' },
    { 
        accessorKey: 'risco', 
        header: 'Risco',
        cell: ({ row }) => {
            const risco = row.original.risco;
            const variant = risco === 'Alto' ? 'destructive' : risco === 'Médio' ? 'secondary' : 'default';
            const color = risco === 'Alto' ? 'bg-red-100 text-red-700' : risco === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

            return <Badge variant={variant} className={cn('border-none', color)}>{risco}</Badge>
        }
    },
    { accessorKey: 'motivo', header: 'Motivo' },
    { accessorKey: 'acoes', header: 'Ações Recomendadas' },
];

export default function AiAnalyticsPage() {
  return (
    <div>
      <PageHeader title="Análise Preditiva">
        <Button variant="secondary">
          <Calendar className="mr-2" /> Escolher Período
        </Button>
        <Button>
          <Download className="mr-2" /> Exportar Análise
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Previsão de Matrículas</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <p className="text-xs text-center text-muted-foreground mb-4">Previsão de crescimento de 15% no próximo semestre</p>
                <StudentEvolutionChart />
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Risco de Evasão</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-xs text-center text-muted-foreground mb-4">8 alunos identificados com alto risco de evasão</p>
                <LevelDistributionChart />
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Alertas Preditivos</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={alerts} />
        </CardContent>
      </Card>
    </div>
  );
}
