'use client'

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user } = useUser();
  
  if (!user) {
    return null; // O un spinner de carga
  }

  return (
    <div>
      <PageHeader title="Meu Perfil" />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription className="text-lg capitalize">{user.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Informações de Contato</h3>
                <div className="text-muted-foreground space-y-1">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Telefone:</strong> {user.phone || '(11) 98765-4321'}</p>
                </div>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold text-lg">Configurações da Conta</h3>
                <div className="text-muted-foreground space-y-1">
                   <p>Aqui você poderá alterar sua senha e outras configurações.</p>
                </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Editar Perfil</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                  <DialogDescription>
                    Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Foto</Label>
                    <div className="col-span-3 flex items-center gap-4">
                       <Avatar>
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Input id="picture" type="file" className="col-span-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input id="name" defaultValue={user.name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" defaultValue={user.email} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Telefone
                    </Label>
                    <Input id="phone" defaultValue={user.phone || '(11) 98765-4321'} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar Alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
