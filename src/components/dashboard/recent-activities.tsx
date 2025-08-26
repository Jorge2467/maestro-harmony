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

const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle,
  Wrench,
  CalendarPlus,
  UserPlus,
};

export function RecentActivities() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Acompanhe as últimas atualizações do sistema.
            </CardDescription>
          </div>
          <Button variant="outline">Ver Todas</Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockActivities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            return (
              <li key={index} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
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
