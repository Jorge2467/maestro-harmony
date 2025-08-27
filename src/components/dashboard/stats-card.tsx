import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string;
  change: number;
  changeText: string;
  icon: LucideIcon;
  iconBg: string;
};

export function StatsCard({ title, value, change, changeText, icon: Icon, iconBg }: StatsCardProps) {
  const ChangeIcon = change > 0 ? ArrowUp : change < 0 ? ArrowDown : Minus;
  const changeColor = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white', iconBg)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor} flex items-center gap-1`}>
          <ChangeIcon className="h-3 w-3" />
          {change !== 0 && <span>{Math.abs(change)}%</span>}
          <span className="text-muted-foreground">{changeText}</span>
        </p>
      </CardContent>
    </Card>
  );
}
