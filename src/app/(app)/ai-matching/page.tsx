import { PageHeader } from "@/components/page-header";
import { RecommendationForm } from "./recommendation-form";


export default function AiMatchingPage() {
  return (
    <div>
      <PageHeader title="Matching com IA" description="A IA recomenda o professor e o plano de estudos mais adequados." />
      <RecommendationForm />
    </div>
  );
}
