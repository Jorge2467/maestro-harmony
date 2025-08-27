import { PageHeader } from "@/components/page-header";
import { CurriculumForm } from "./curriculum-form";

export default function CurriculumPage() {
  return (
    <div>
      <PageHeader title="Gestão de Currículos" />
      <CurriculumForm />
    </div>
  );
}
