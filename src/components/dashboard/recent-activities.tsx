
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockActivities } from '@/lib/mock-data';
import { CheckCircle, Wrench, CalendarPlus, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle,
  Wrench,
  CalendarPlus,
  UserPlus,
};

export function RecentActivities() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Acompanhe as últimas atualizações.</CardDescription>
        </div>
        <Button variant="outline" size="sm">Ver Todas</Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockActivities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            return (
              <li key={index} className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border">
                    <AvatarFallback className="bg-muted">
                        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
