
'use client';

import { PageHeader } from "@/components/page-header";
import { InstrumentStatusChart } from "@/components/dashboard/instrument-status-chart";
import { StudentDistributionChart } from "@/components/dashboard/student-distribution-chart";
import { StudentEvolutionChart } from "@/components/dashboard/student-evolution-chart";
import { LevelDistributionChart } from "@/components/dashboard/level-distribution-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { GraduationCap, Users, Guitar, BarChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMaestroStore } from "@/store/use-maestro-store";


export default function StatisticsPage() {
  const students = useMaestroStore((state) => state.students);
  const teachers = useMaestroStore((state) => state.teachers);
  const instruments = useMaestroStore((state) => state.instruments);

  return (
    <div>
      <PageHeader title="Estatísticas Detalhadas">
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Dados
        </Button>
      </PageHeader>
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Alunos Totais"
              value={students.length.toString()}
              change={5}
              changeText="no último mês"
              icon={GraduationCap}
              iconBg="bg-chart-1"
            />
            <StatsCard 
              title="Professores Ativos"
              value={teachers.filter(t => t.status === 'active').length.toString()}
              change={1}
              changeText="no último trimestre"
              icon={Users}
              iconBg="bg-chart-2"
            />
            <StatsCard 
              title="Instrumentos Totais"
              value={instruments.length.toString()}
              change={15}
              changeText="adicionados este ano"
              icon={Guitar}
              iconBg="bg-chart-3"
            />
            <StatsCard 
              title="Média de Aprovação"
              value="92%"
              change={-1}
              changeText="em relação ao ano passado"
              icon={BarChart}
              iconBg="bg-chart-4"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudentEvolutionChart />
          <LevelDistributionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudentDistributionChart />
          <InstrumentStatusChart />
        </div>
      </div>
    </div>
  );
}

