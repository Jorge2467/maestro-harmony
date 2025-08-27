import { PageHeader } from "@/components/page-header";
import { MasterclassTabs } from "./masterclass-tabs";

export default function MasterclassesPage() {
  return (
    <div>
      <PageHeader title="Gestão de Masterclasses" />
      <MasterclassTabs />
    </div>
  );
}
