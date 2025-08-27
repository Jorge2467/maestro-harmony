import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { EventForm } from "./event-form";

type EventCardProps = {
  event: CalendarEvent;
}

const eventTypeColors: { [key: string]: string } = {
  Concerto: 'bg-accent/80 text-accent-foreground',
  Audição: 'bg-primary/80 text-primary-foreground',
  Masterclass: 'bg-purple-500/80 text-white',
  Reunião: 'bg-blue-500/80 text-white',
};

const eventStatusColors: { [key: string]: string } = {
    Próxima: 'bg-blue-500/20 text-blue-700',
    Realizada: 'bg-green-500/20 text-green-700',
    Cancelada: 'bg-red-500/20 text-red-700',
  };

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle>{event.title}</CardTitle>
            <Badge className={cn('border-none', eventTypeColors[event.type] || 'bg-muted text-muted-foreground')}>
                {event.type}
            </Badge>
        </div>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(event.date, "PPP", { locale: ptBR })}</span>
            </div>
            {event.status && (
                <Badge variant="secondary" className={cn('border-none', eventStatusColors[event.status])}>
                    {event.status}
                </Badge>
            )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location || 'Local a definir'}</span>
        </div>
        {event.participants && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{event.participants.length} participantes</span>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button variant="outline" className="w-full">
            Ver Detalhes
        </Button>
        <EventForm event={event} trigger="button" />
      </CardFooter>
    </Card>
  );
}
