'use client';

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { instrumentStatusData } from '@/lib/mock-data';
import { ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';

export function InstrumentStatusChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Status de Instrumentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={instrumentStatusData} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="80%">
                {instrumentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend content={<ChartLegendContent />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
