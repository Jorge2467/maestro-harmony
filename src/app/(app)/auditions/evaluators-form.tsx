import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/lib/types";
import { mockTeachers } from "@/lib/mock-data";

interface EvaluatorsFormProps {
    auditions: CalendarEvent[];
}

export function EvaluatorsForm({ auditions }: EvaluatorsFormProps) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Gestão de Avaliadores</CardTitle>
                <CardDescription>Adicione avaliadores a uma audição específica.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="evaluatorAudition">Audição *</Label>
                        <Select>
                            <SelectTrigger id="evaluatorAudition">
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
                     <div className="space-y-2">
                        <Label htmlFor="evaluatorTeacher">Professor/Avaliador *</Label>
                        <Select>
                            <SelectTrigger id="evaluatorTeacher">
                                <SelectValue placeholder="Selecione um professor" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockTeachers.map(teacher => (
                                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                        {teacher.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Avaliador</Button>
            </CardFooter>
        </Card>
    );
}
