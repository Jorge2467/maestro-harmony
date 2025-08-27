
'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { GraduationCap, Users, Wrench, PieChart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { StudentDistributionChart } from '@/components/dashboard/student-distribution-chart';
import { InstrumentStatusChart } from '@/components/dashboard/instrument-status-chart';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { useMaestroStore } from '@/store/use-maestro-store';


export default function DashboardPage() {
  const getActiveStudents = useMaestroStore(state => state.getActiveStudents);
  const getActiveTeachers = useMaestroStore(state => state.getActiveTeachers);
  const instrumentsInRepair = useMaestroStore(state => state.instruments.filter(i => i.status === 'Em Reparo').length);

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Bem-vindo, Carlos!</CardTitle>
              <CardDescription className="text-primary-foreground/90 mt-1">
                Você tem 3 novas avaliações para revisar e 2 solicitações de instrumentos pendentes.
              </CardDescription>
            </div>
            <div className="hidden sm:block">
              <Music size={50} className="text-primary-foreground/50"/>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Alunos Ativos"
          value={getActiveStudents().length.toString()}
          change={5}
          changeText="desde a semana passada"
          icon={GraduationCap}
          iconBg="bg-blue-500"
        />
        <StatsCard 
          title="Total de Professores"
          value={getActiveTeachers().length.toString()}
          change={0}
          changeText="Sem alterações"
          icon={Users}
          iconBg="bg-green-500"
        />
        <StatsCard 
          title="Instrumentos em Reparo"
          value={instrumentsInRepair.toString()}
          change={-2}
          changeText="desde ontem"
          icon={Wrench}
          iconBg="bg-orange-500"
        />
        <StatsCard 
          title="Taxa de Retenção"
          value="87%"
          change={2}
          changeText="este mês"
          icon={PieChart}
          iconBg="bg-purple-500"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <StudentDistributionChart />
        <InstrumentStatusChart />
      </div>

      <div className="grid gap-6">
        <RecentActivities />
      </div>
    </div>
  );
}
