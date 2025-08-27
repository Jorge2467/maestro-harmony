import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Info } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type StatsCardProps = {
  title: string;
  value: string;
  change?: number;
  changeText: string;
  icon: LucideIcon;
  status?: string;
  statusColor?: 'blue' | 'green' | 'orange' | 'red';
};

export function StatsCard({ title, value, change, changeText, icon: Icon, status, statusColor }: StatsCardProps) {
  const ChangeIcon = change && change > 0 ? ArrowUp : change && change < 0 ? ArrowDown : Info;
  const changeColor = change && change > 0 ? 'text-green-600' : change && change < 0 ? 'text-red-600' : 'text-muted-foreground';

  const statusBg = 
    statusColor === 'blue' ? 'bg-blue-100' :
    statusColor === 'green' ? 'bg-green-100' :
    statusColor === 'orange' ? 'bg-orange-100' :
    statusColor === 'red' ? 'bg-red-100' :
    'bg-muted';
    
  const statusText = 
    statusColor === 'blue' ? 'text-blue-700' :
    statusColor === 'green' ? 'text-green-700' :
    statusColor === 'orange' ? 'text-orange-700' :
    statusColor === 'red' ? 'text-red-700' :
    'text-muted-foreground';


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', statusBg, statusText)}>
                <Icon className="h-6 w-6" />
            </div>
            {status && (
                <Badge variant="secondary" className={cn('border-none', statusBg, statusText)}>{status}</Badge>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className={`text-xs mt-2 ${changeColor} flex items-center gap-1`}>
          <ChangeIcon className="h-3 w-3" />
          {change && <span>{Math.abs(change)}%</span>}
          <span>{changeText}</span>
        </div>
      </CardContent>
    </Card>
  );
}
