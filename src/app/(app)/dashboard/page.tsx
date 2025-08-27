
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, GraduationCap, Users, Wrench, BarChart, Banknote, CalendarCheck, Bot } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { useMaestroStore } from '@/store/use-maestro-store';
import { AiRecommendationCard } from '@/components/dashboard/ai-recommendation-card';

export default function DashboardPage() {
  const getActiveStudents = useMaestroStore(state => state.getActiveStudents);
  const getActiveTeachers = useMaestroStore(state => state.getActiveTeachers);
  const instrumentsInRepair = useMaestroStore(state => state.instruments.filter(i => i.status === 'Em Reparo').length);
  const upcomingEvents = useMaestroStore(state => state.events.filter(e => new Date(e.date) >= new Date()).length);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          value={upcomingEvents.toString()}
          changeText="2 audições, 1 masterclass"
          icon={CalendarCheck}
          status="Próximos"
          statusColor="blue"
        />
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Taxa de Retenção"
          value="87%"
          changeText="Meta: 90%"
          icon={BarChart}
          status="Bom"
          statusColor="green"
        />
         <StatsCard 
          title="Receitas do Mês"
          value="R$ 42.580"
          change={8}
          changeText="em relação ao mês anterior"
          icon={Banknote}
          status="Positivo"
          statusColor="green"
        />
         <StatsCard 
          title="Avaliações Pendentes"
          value="24"
          changeText="15 de alunos, 9 de professores"
          icon={Wrench}
          status="Pendente"
          statusColor="red"
        />
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Recomendações da IA</h3>
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <AiRecommendationCard 
              title="Otimizar Horários de Aula"
              description="A IA detectou que 72% das aulas de piano estão concentradas nas segundas e quartas-feiras. Recomendamos redistribuir para terças e quintas para melhor aproveitamento dos professores."
              metrics={[
                { value: "72%", label: "Concentração" },
                { value: "89%", label: "Eficiência" },
                { value: "3h", label: "Economia/semana" },
              ]}
            />
            <AiRecommendationCard 
              title="Repositório de Partituras"
              description="Sistema identificou que 65% dos alunos de violino estão estudando peças do período barroco. Sugerimos criar um repositório especializado com materiais de apoio."
              metrics={[
                { value: "65%", label: "Alunos" },
                { value: "42", label: "Partituras" },
                { value: "92%", label: "Relevância" },
              ]}
            />
        </div>
      </div>
    </div>
  );
}
