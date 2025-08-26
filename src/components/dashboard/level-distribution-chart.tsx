'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { levelDistributionData } from '@/lib/mock-data';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  iniciante: {
    label: 'Iniciante',
    color: 'hsl(var(--chart-2))',
  },
  intermediario: {
    label: 'Intermediário',
    color: 'hsl(var(--chart-1))',
  },
  avancado: {
    label: 'Avançado',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function LevelDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Níveis por Instrumento</CardTitle>
        <CardDescription>Análise da proporção de níveis de habilidade em diferentes instrumentos.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={levelDistributionData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="instrument" />
                <PolarRadiusAxis angle={30} domain={[0, 25]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Radar name="Iniciante" dataKey="Iniciante" stroke="var(--color-intermediario)" fill="var(--color-intermediario)" fillOpacity={0.6} />
                <Radar name="Intermediário" dataKey="Intermediário" stroke="var(--color-iniciante)" fill="var(--color-iniciante)" fillOpacity={0.6} />
                <Radar name="Avançado" dataKey="Avançado" stroke="var(--color-avancado)" fill="var(--color-avancado)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
