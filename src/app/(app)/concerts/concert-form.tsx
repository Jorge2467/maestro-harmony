import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ConcertForm() {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Agendar Novo Concerto</CardTitle>
                <CardDescription>Preencha os detalhes abaixo para agendar um novo concerto.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="concertTitle">Título do Concerto *</Label>
                        <Input id="concertTitle" placeholder="Ex: Concerto de Outono" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertType">Tipo de Evento *</Label>
                        <Select>
                            <SelectTrigger id="concertType">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recital">Recital</SelectItem>
                                <SelectItem value="orchestra">Orquestra</SelectItem>
                                <SelectItem value="chamber">Música de Câmara</SelectItem>
                                <SelectItem value="choir">Coral</SelectItem>
                                <SelectItem value="festival">Festival</SelectItem>
                                <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertDate">Data *</Label>
                        <Input type="date" id="concertDate" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertStartTime">Hora de Início *</Label>
                        <Input type="time" id="concertStartTime" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertEndTime">Hora de Término *</Label>
                        <Input type="time" id="concertEndTime" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertLocation">Local *</Label>
                        <Input id="concertLocation" placeholder="Ex: Auditório Principal" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="concertCapacity">Lotação Máxima</Label>
                        <Input type="number" id="concertCapacity" placeholder="Ex: 120" />
                    </div>
                </div>
                 <div className="space-y-2 mt-6">
                    <Label htmlFor="concertDescription">Descrição do Concerto</Label>
                    <Textarea id="concertDescription" placeholder="Descreva o concerto, tema, repertório, etc." />
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Agendar Concerto</Button>
            </CardFooter>
        </Card>
    );
}
