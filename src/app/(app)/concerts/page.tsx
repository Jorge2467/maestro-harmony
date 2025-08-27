import { PageHeader } from "@/components/page-header";
import { ConcertTabs } from "./concert-tabs";

export default function ConcertsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Concertos" />
      <ConcertTabs />
    </div>
  );
}
