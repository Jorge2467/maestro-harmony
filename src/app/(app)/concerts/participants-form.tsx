import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { CalendarEvent } from "@/lib/types";

interface ParticipantsFormProps {
    concerts: CalendarEvent[];
}

export function ParticipantsForm({ concerts }: ParticipantsFormProps) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Gestão de Participantes</CardTitle>
                <CardDescription>Adicione participantes a um concerto específico.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="participantConcert">Concerto *</Label>
                        <Select>
                            <SelectTrigger id="participantConcert">
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
                    <div className="space-y-2">
                        <Label htmlFor="participantType">Tipo de Participante *</Label>
                        <Select>
                            <SelectTrigger id="participantType">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="solo">Solista</SelectItem>
                                <SelectItem value="ensemble">Conjunto</SelectItem>
                                <SelectItem value="orchestra">Orquestra</SelectItem>
                                <SelectItem value="choir">Coral</SelectItem>
                                <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="participantName">Nome do Participante/Grupo *</Label>
                    <Input id="participantName" placeholder="Ex: Orquestra Jovem ou Ana Silva" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="participantInstrument">Instrumento/Formação</Label>
                        <Input id="participantInstrument" placeholder="Ex: Piano ou Orquestra" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="participantPiece">Peça a ser executada</Label>
                        <Input id="participantPiece" placeholder="Ex: Concerto para Piano No. 1" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Participante</Button>
            </CardFooter>
        </Card>
    );
}
