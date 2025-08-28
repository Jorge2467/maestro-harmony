'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Music } from "lucide-react";
import { useMaestroStore } from "@/store/use-maestro-store";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ProgramFormProps {
    concertId: number | null;
}

const programItemSchema = z.object({
    piece: z.string().min(1, "O nome da obra é obrigatório."),
    composer: z.string().min(1, "O nome do compositor é obrigatório."),
    performer: z.string().optional(),
    duration: z.coerce.number().positive("A duração deve ser um número positivo.").optional(),
});

export function ProgramForm({ concertId }: ProgramFormProps) {
    const { events, updateEvent } = useMaestroStore();
    const { toast } = useToast();
    const concert = events.find(e => e.id === concertId);

    const form = useForm<z.infer<typeof programItemSchema>>({
        resolver: zodResolver(programItemSchema),
        defaultValues: { piece: '', composer: '', performer: '', duration: undefined },
    });

    const onSubmit = (values: z.infer<typeof programItemSchema>) => {
        if (!concert) return;

        const newItem = { ...values, id: Date.now() };
        const updatedProgram = [...(concert.program || []), newItem];
        updateEvent(concert.id, { ...concert, program: updatedProgram });
        toast({ title: "Sucesso", description: "Item adicionado ao programa." });
        form.reset();
    };

    const handleRemoveItem = (itemId: number) => {
        if (!concert) return;
        const updatedProgram = concert.program?.filter(item => item.id !== itemId);
        updateEvent(concert.id, { ...concert, program: updatedProgram });
        toast({ variant: "destructive", title: "Item removido", description: "O item foi removido do programa." });
    };

    if (!concert) {
        return (
            <Card className="mt-4 flex flex-col items-center justify-center h-64">
                <CardHeader className="text-center">
                    <Music className="mx-auto h-12 w-12 text-muted-foreground" />
                    <CardTitle className="mt-4">Nenhum concerto selecionado</CardTitle>
                    <CardDescription>Por favor, selecione um concerto na lista para ver ou editar sua programação.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Programação para: {concert.title}</CardTitle>
                <CardDescription>Adicione e organize as peças que serão apresentadas neste concerto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-4">Itens Atuais no Programa</h4>
                    {concert.program && concert.program.length > 0 ? (
                        <div className="space-y-4">
                            {concert.program.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.piece}</p>
                                        <p className="text-sm text-muted-foreground">{item.composer} • {item.performer} • {item.duration} min</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Ainda não há itens no programa.</p>
                    )}
                </div>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <h4 className="font-semibold">Adicionar Novo Item</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                                control={form.control}
                                name="piece"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Obra *</Label>
                                        <FormControl><Input placeholder="Ex: Sonata No. 14" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="composer"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Compositor *</Label>
                                        <FormControl><Input placeholder="Ex: Beethoven" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="performer"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Intérprete(s)</Label>
                                        <FormControl><Input placeholder="Ex: Ana Silva (piano)" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Duração (minutos)</Label>
                                        <FormControl><Input type="number" placeholder="Ex: 15" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">
                            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item ao Programa
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
