import { PageHeader } from "@/components/page-header";
import { mockEvents } from "@/lib/mock-data";
import { AuditionTabs } from "./audition-tabs";

export default function AuditionsPage() {
  const auditionEvents = mockEvents.filter(event => event.type === 'Audição');

  return (
    <div>
      <PageHeader title="Gestão de Audições" />
      <AuditionTabs auditions={auditionEvents} />
    </div>
  );
}
