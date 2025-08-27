
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const goals = [
  {
    title: 'Taxa de Retenção de Alunos',
    description: 'Meta: 90% | Atual: 87%',
    progress: 87,
  },
  {
    title: 'Novas Matrículas',
    description: 'Meta: 30 | Atual: 22',
    progress: 73,
  },
  {
    title: 'Receita Mensal',
    description: 'Meta: R$ 45.000 | Atual: R$ 42.580',
    progress: 95,
  },
];

export function GoalTracker() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Metas e Objetivos</CardTitle>
        <Button variant="outline" size="sm">
          Ver Todas
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2 border-b pb-4 last:border-b-0">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">{goal.title}</h4>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
              <p className="font-semibold">{goal.progress}%</p>
            </div>
            <Progress value={goal.progress} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
