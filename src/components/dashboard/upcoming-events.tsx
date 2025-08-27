
'use client';

import { useMaestroStore } from '@/store/use-maestro-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function UpcomingEvents() {
  const upcomingEvents = useMaestroStore(state =>
    state.events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Próximos Eventos</CardTitle>
        <Button variant="outline" size="sm">
          Ver Todos
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {upcomingEvents.map(event => (
            <li key={event.id} className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-lg font-bold">
                  {format(event.date, 'dd')}
                </span>
                <span className="text-xs uppercase">
                  {format(event.date, 'MMM', { locale: ptBR })}
                </span>
              </div>
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.time} - {event.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
