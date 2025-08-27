import { PageHeader } from "@/components/page-header";
import { mockEvents } from "@/lib/mock-data";
import { MasterclassTabs } from "./masterclass-tabs";

export default function MasterclassesPage() {
  const masterclassEvents = mockEvents.filter(event => event.type === 'Masterclass');

  return (
    <div>
      <PageHeader title="Gestão de Masterclasses" />
      <MasterclassTabs masterclasses={masterclassEvents} />
    </div>
  );
}
