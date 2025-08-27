'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useMaestroStore } from "@/store/use-maestro-store";

interface ProgramItem {
    id: number;
    piece: string;
    composer: string;
    performer: string;
    duration: string;
}

export function ProgramForm() {
    const concerts = useMaestroStore(state => state.concerts.filter(c => c.type === 'Concerto'));
    const [programItems, setProgramItems] = useState<ProgramItem[]>([
        { id: 1, piece: '', composer: '', performer: '', duration: '' }
    ]);

    const handleAddItem = () => {
        setProgramItems([...programItems, { id: Date.now(), piece: '', composer: '', performer: '', duration: '' }]);
    };

    const handleRemoveItem = (id: number) => {
        setProgramItems(programItems.filter(item => item.id !== id));
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Programação do Concerto</CardTitle>
                <CardDescription>Adicione e organize as peças que serão apresentadas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="programConcert">Selecione o Concerto *</Label>
                    <Select>
                        <SelectTrigger id="programConcert">
                            <SelectValue placeholder="Selecione um concerto" />
                        </SelectTrigger>
                        <SelectContent>
                            {concerts.map(concert => (
                                <SelectItem key={concert.id} value={concert.id.toString()}>
                                    {concert.title} - {new Date(concert.date).toLocaleDateString('pt-BR')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold">Itens do Programa</h4>
                    {programItems.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-lg space-y-4 relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Obra *</Label>
                                    <Input placeholder="Ex: Sonata para Piano No. 14" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Compositor *</Label>
                                    <Input placeholder="Ex: Ludwig van Beethoven" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Intérprete(s)</Label>
                                    <Input placeholder="Ex: Ana Silva (piano)" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Duração (minutos)</Label>
                                    <Input type="number" placeholder="Ex: 15" />
                                </div>
                            </div>
                            {programItems.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-3 -right-3 h-7 w-7 rounded-full p-0"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <Button variant="outline" onClick={handleAddItem}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item
                </Button>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Programação</Button>
            </CardFooter>
        </Card>
    );
}
