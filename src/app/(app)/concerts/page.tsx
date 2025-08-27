import { PageHeader } from "@/components/page-header";
import { ConcertTabs } from "./concert-tabs";
import { mockEvents } from "@/lib/mock-data";

export default function ConcertsPage() {
  const concertEvents = mockEvents.filter(event => event.type === 'Concerto');

  return (
    <div>
      <PageHeader title="Gestão de Concertos" />
      <ConcertTabs concerts={concertEvents} />
    </div>
  );
}
