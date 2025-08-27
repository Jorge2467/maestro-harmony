'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useMaestroStore } from "@/store/use-maestro-store";

export function RequirementsForm() {
    const auditions = useMaestroStore(state => state.events.filter(event => event.type === 'Audição'));
    const [requirements, setRequirements] = useState<string[]>(['']);

    const handleAddRequirement = () => {
        setRequirements([...requirements, '']);
    };

    const handleRemoveRequirement = (index: number) => {
        setRequirements(requirements.filter((_, i) => i !== index));
    };
    
    const handleRequirementChange = (index: number, value: string) => {
        const newRequirements = [...requirements];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    };

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Requisitos da Audição</CardTitle>
                <CardDescription>Defina os requisitos para uma audição específica.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="requirementAudition">Audição *</Label>
                    <Select>
                        <SelectTrigger id="requirementAudition">
                            <SelectValue placeholder="Selecione uma audição" />
                        </SelectTrigger>
                        <SelectContent>
                            {auditions.map(audition => (
                                <SelectItem key={audition.id} value={audition.id.toString()}>
                                    {audition.title} - {new Date(audition.date).toLocaleDateString('pt-BR')}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="space-y-4">
                    <Label>Lista de Requisitos</Label>
                    {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input 
                                value={req}
                                onChange={(e) => handleRequirementChange(index, e.target.value)}
                                placeholder={`Requisito ${index + 1} (ex: Uma peça de Bach, uma escala maior)`} 
                            />
                            {requirements.length > 1 && (
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveRequirement(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                 <Button variant="outline" onClick={handleAddRequirement}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Requisito
                </Button>

            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Requisitos</Button>
            </CardFooter>
        </Card>
    );
}
