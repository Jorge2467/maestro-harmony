import { PageHeader } from "@/components/page-header";
import { EventCard } from "@/components/event-card";
import { mockEvents } from "@/lib/mock-data";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MasterclassesPage() {
  const masterclassEvents = mockEvents.filter(event => event.type === 'Masterclass');

  return (
    <div>
      <PageHeader title="Masterclasses" />
      {masterclassEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {masterclassEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma Masterclass Agendada</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Star className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground">Não há masterclasses agendadas no momento.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
