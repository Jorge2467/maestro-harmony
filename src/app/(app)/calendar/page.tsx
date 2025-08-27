
'use client'

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import type { CalendarEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EventForm } from '@/components/event-form';
import { useMaestroStore } from '@/store/use-maestro-store';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = useMaestroStore(state => state.events);

  const selectedDayEvents = events.filter(event => 
    date && format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  const eventTypeColors: { [key: string]: string } = {
    Concerto: 'bg-accent/80 text-accent-foreground',
    Audição: 'bg-primary/80 text-primary-foreground',
    Masterclass: 'bg-purple-500/80 text-white',
    Reunião: 'bg-blue-500/80 text-white',
  };

  return (
    <div>
      <PageHeader title="Calendário de Eventos">
        <EventForm />
      </PageHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                locale={ptBR}
                modifiers={{
                  event: events.map(event => event.date)
                }}
                modifiersClassNames={{
                  event: 'bg-primary/20 rounded-full'
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Eventos do Dia</CardTitle>
              <CardDescription>
                {date ? format(date, "PPP", { locale: ptBR }) : 'Nenhuma data selecionada'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[300px]">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map(event => (
                  <EventForm 
                    key={event.id}
                    event={event} 
                    trigger="card"
                  >
                    <div className="p-3 rounded-lg border flex flex-col gap-2 cursor-pointer hover:bg-muted/50">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge className={cn('border-none', eventTypeColors[event.type] || 'bg-muted text-muted-foreground')}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground font-medium">{event.time}</p>
                    </div>
                  </EventForm>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Nenhum evento para este dia.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
