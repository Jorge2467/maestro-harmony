
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Users } from "lucide-react";
import { useMaestroStore } from "@/store/use-maestro-store";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ParticipantsFormProps {
    concertId: string | number | null;
}

const participantSchema = z.object({
    name: z.string().min(1, "O nome do participante é obrigatório."),
    type: z.string().min(1, "O tipo de participante é obrigatório."),
    instrument: z.string().optional(),
    piece: z.string().optional(),
});

export function ParticipantsForm({ concertId }: ParticipantsFormProps) {
    const { events, updateEvent } = useMaestroStore();
    const { toast } = useToast();
    const concert = events.find(e => String(e.id) === String(concertId));

    const form = useForm<z.infer<typeof participantSchema>>({
        resolver: zodResolver(participantSchema),
        defaultValues: { name: '', type: '', instrument: '', piece: '' },
    });

    const onSubmit = (values: z.infer<typeof participantSchema>) => {
        if (!concert) return;

        const newParticipant = { ...values, id: Date.now().toString() };
        const updatedParticipants = [...(concert.participants || []), newParticipant];
        updateEvent(concert.id, { participants: updatedParticipants });
        toast({ title: "Sucesso", description: "Participante adicionado ao concerto." });
        form.reset();
    };

    const handleRemoveParticipant = (participantId: string | number) => {
        if (!concert) return;
        const updatedParticipants = concert.participants?.filter(p => String(p.id) !== String(participantId));
        updateEvent(concert.id, { participants: updatedParticipants });
        toast({ variant: "destructive", title: "Participante removido", description: "O participante foi removido do concerto." });
    };

    if (!concert) {
        return (
            <Card className="mt-4 flex flex-col items-center justify-center h-64">
                <CardHeader className="text-center">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                    <CardTitle className="mt-4">Nenhum concerto selecionado</CardTitle>
                    <CardDescription>Por favor, selecione um concerto na lista para gerir os participantes.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Participantes de: {concert.title}</CardTitle>
                <CardDescription>Adicione e remova participantes deste concerto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-4">Participantes Atuais</h4>
                    {concert.participants && concert.participants.length > 0 ? (
                        <div className="space-y-4">
                            {concert.participants.map(p => (
                                <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{p.name} <span className="text-sm text-muted-foreground">({p.type})</span></p>
                                        <p className="text-sm text-muted-foreground">{p.instrument} • {p.piece}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveParticipant(p.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Ainda não há participantes neste concerto.</p>
                    )}
                </div>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <h4 className="font-semibold">Adicionar Novo Participante</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Nome do Participante/Grupo *</Label>
                                        <FormControl><Input placeholder="Ex: Orquestra Jovem" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Tipo de Participante *</Label>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Solista">Solista</SelectItem>
                                                <SelectItem value="Conjunto">Conjunto</SelectItem>
                                                <SelectItem value="Orquestra">Orquestra</SelectItem>
                                                <SelectItem value="Coral">Coral</SelectItem>
                                                <SelectItem value="Outro">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instrument"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Instrumento/Formação</Label>
                                        <FormControl><Input placeholder="Ex: Piano ou Orquestra" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="piece"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Peça a ser executada</Label>
                                        <FormControl><Input placeholder="Ex: Concerto No. 1" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">
                            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Participante
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
