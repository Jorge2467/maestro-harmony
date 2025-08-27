
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMaestroStore } from "@/store/use-maestro-store";

export function MasterclassDetailsForm() {
    const masterclasses = useMaestroStore(state => state.events.filter(mc => mc.type === 'Masterclass'));
    
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Detalhes da Masterclass</CardTitle>
                <CardDescription>Adicione informações específicas sobre a masterclass.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="masterclassSelect">Masterclass *</Label>
                    <Select>
                        <SelectTrigger id="masterclassSelect">
                            <SelectValue placeholder="Selecione uma masterclass" />
                        </SelectTrigger>
                        <SelectContent>
                            {masterclasses.map(mc => (
                                <SelectItem key={mc.id} value={mc.id.toString()}>
                                    {mc.title} - {new Date(mc.date).toLocaleDateString('pt-BR')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="guestName">Maestro Convidado</Label>
                    <Input id="guestName" placeholder="Ex: Maestro João Carlos Martins" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="topic">Tópico Principal</Label>
                    <Textarea id="topic" placeholder="Ex: Interpretação de obras de Bach ao piano" />
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Detalhes</Button>
            </CardFooter>
        </Card>
    );
}
