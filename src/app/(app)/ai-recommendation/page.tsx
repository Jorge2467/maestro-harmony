
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiRecommendationCard } from "@/components/dashboard/ai-recommendation-card";
import { Filter, RotateCw } from "lucide-react";

export default function AiRecommendationPage() {
  return (
    <div>
      <PageHeader title="Recomendações de IA">
        <Button variant="secondary">
          <Filter className="mr-2" /> Filtrar
        </Button>
        <Button>
          <RotateCw className="mr-2" /> Atualizar
        </Button>
      </PageHeader>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="teaching">Ensino</TabsTrigger>
          <TabsTrigger value="management">Gestão</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                 <AiRecommendationCard 
                    title="Otimizar Horários de Aula"
                    description="A IA detectou que 72% das aulas de piano estão concentradas nas segundas e quartas-feiras. Recomendamos redistribuir para terças e quintas para melhor aproveitamento dos professores."
                    metrics={[
                        { value: "72%", label: "Concentração" },
                        { value: "89%", label: "Eficiência" },
                        { value: "3h", label: "Economia/semana" },
                    ]}
                 />
                 <AiRecommendationCard 
                    title="Repositório de Partituras"
                    description="Sistema identificou que 65% dos alunos de violino estão estudando peças do período barroco. Sugerimos criar um repositório especializado com materiais de apoio."
                    metrics={[
                        { value: "65%", label: "Alunos" },
                        { value: "42", label: "Partituras" },
                        { value: "92%", label: "Relevância" },
                    ]}
                 />
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
