'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { instrumentStatusData } from '@/lib/mock-data';
import { ChartTooltipContent, ChartLegendContent, ChartContainer, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Instrumentos',
  },
  disponiveis: {
    label: 'Disponíveis',
    color: 'hsl(var(--chart-2))',
  },
  emUso: {
    label: 'Em Uso',
    color: 'hsl(var(--chart-1))',
  },
  emReparo: {
    label: 'Em Reparo',
    color: 'hsl(var(--chart-3))',
  },
  indisponiveis: {
    label: 'Indisponíveis',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function InstrumentStatusChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Status de Instrumentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={chartConfig}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={instrumentStatusData} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="80%">
                  {instrumentStatusData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase().replace('í', 'i').replace(' ', '')})`} />
                  ))}
                </Pie>
                <Legend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
