import { PageHeader } from "@/components/page-header";
import { AuditionTabs } from "./audition-tabs";

export default function AuditionsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Audições" />
      <AuditionTabs />
    </div>
  );
}
