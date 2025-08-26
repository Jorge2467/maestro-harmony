import { PageHeader } from "@/components/page-header";
import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/lib/mock-data";
import { Mic } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuditionsPage() {
  const auditionEvents = mockEvents.filter(event => event.type === 'Audição');

  return (
    <div>
      <PageHeader title="Audições" />
      {auditionEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {auditionEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma Audição Agendada</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Mic className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground">Não há audições agendadas no momento.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
