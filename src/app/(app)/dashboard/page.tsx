

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, GraduationCap, Users, Wrench, BarChart, Banknote, CalendarCheck, Bot, UserPlus, CalendarPlus, Lightbulb } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { useMaestroStore } from '@/store/use-maestro-store';
import { AiRecommendationCard } from '@/components/dashboard/ai-recommendation-card';
import { GoalTracker } from '@/components/dashboard/goal-tracker';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { UpcomingEvents } from '@/components/dashboard/upcoming-events';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  const getActiveStudents = useMaestroStore(state => state.getActiveStudents);
  const getActiveTeachers = useMaestroStore(state => state.getActiveTeachers);
  const instrumentsInRepair = useMaestroStore(state => state.instruments.filter(i => i.status === 'Em Reparo').length);
  const upcomingEventsCount = useMaestroStore(state => state.events.filter(e => new Date(e.date) >= new Date()).length);

  return (
    <div className="flex flex-col gap-6">
        <QuickActions />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <StatsCard 
                    title="Alunos Ativos"
                    value={getActiveStudents().length.toString()}
                    change={5}
                    changeText="desde a última semana"
                    icon={GraduationCap}
                    status="Ativo"
                    statusColor="blue"
                    />
                    <StatsCard 
                    title="Total de Professores"
                    value={getActiveTeachers().length.toString()}
                    changeText="2 em formação"
                    icon={Users}
                    status="Ativo"
                    statusColor="green"
                    />
                    <StatsCard 
                    title="Instrumentos em Reparo"
                    value={instrumentsInRepair.toString()}
                    changeText="3 com previsão de entrega"
                    icon={Wrench}
                    status="Parcial"
                    statusColor="orange"
                    />
                    <StatsCard 
                    title="Próximos Eventos"
                    value={upcomingEventsCount.toString()}
                    changeText="2 audições, 1 masterclass"
                    icon={CalendarCheck}
                    status="Próximos"
                    statusColor="blue"
                    />
                </div>
                 <AiRecommendationCard 
                    title="Otimizar Horários de Aula"
                    description="A IA detectou que 72% das aulas de piano estão concentradas nas segundas e quartas-feiras. Recomendamos redistribuir para terças e quintas para melhor aproveitamento dos professores."
                    metrics={[
                        { value: "72%", label: "Concentração" },
                        { value: "89%", label: "Eficiência" },
                        { value: "3h", label: "Economia/semana" },
                    ]}
                 />
                 <GoalTracker />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
                <UpcomingEvents />
                <RecentActivities />
            </div>
        </div>
    </div>
  );
}
