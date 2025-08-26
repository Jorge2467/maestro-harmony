import { PageHeader } from "@/components/page-header";
import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/lib/mock-data";
import { Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConcertsPage() {
  const concertEvents = mockEvents.filter(event => event.type === 'Concerto');

  return (
    <div>
      <PageHeader title="Concertos" />
      {concertEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {concertEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nenhum Concerto Agendado</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Music className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground">Não há concertos agendados no momento.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
