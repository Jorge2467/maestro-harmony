import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function TeachersPage() {
  return (
    <div>
      <PageHeader title="Gestão de Professores" />
       <Card>
        <CardHeader>
          <CardTitle>Em Construção</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
          <Construction className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground">Esta página está sendo desenvolvida. Volte em breve!</p>
        </CardContent>
      </Card>
    </div>
  );
}
