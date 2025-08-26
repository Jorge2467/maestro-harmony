import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="Meu Perfil" />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Carlos Oliveira" />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">Carlos Oliveira</CardTitle>
              <CardDescription className="text-lg">Coordenador</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Informações de Contato</h3>
                <div className="text-muted-foreground space-y-1">
                    <p><strong>Email:</strong> carlos.oliveira@maestroharmony.com</p>
                    <p><strong>Telefone:</strong> (11) 98765-4321</p>
                </div>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Configurações da Conta</h3>
                <div className="text-muted-foreground space-y-1">
                   <p>Aqui você poderá alterar sua senha e outras configurações.</p>
                </div>
            </div>
            <Button>Editar Perfil</Button>
        </CardContent>
      </Card>
    </div>
  );
}
