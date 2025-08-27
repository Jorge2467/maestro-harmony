
'use client'

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Estado local para el formulario
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  if (!user) {
    return null; // O un spinner de carga
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = () => {
    if (setUser) {
      setUser({ ...user, ...formData });
    }
    setIsDialogOpen(false); // Cierra el dialogo
  };
  
  const handleDialogClose = () => {
    // Restaura el formData al estado original del usuario cuando se cierra el dialogo
    setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
    });
    setIsDialogOpen(false);
  };

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>Editar Perfil</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={handleDialogClose} onPointerDownOutside={handleDialogClose}>
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
                    <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Telefone
                    </Label>
                    <Input id="phone" value={formData.phone} onChange={handleInputChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={handleDialogClose}>Cancelar</Button>
                  </DialogClose>
                  <Button type="button" onClick={handleSaveChanges}>Salvar Alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
