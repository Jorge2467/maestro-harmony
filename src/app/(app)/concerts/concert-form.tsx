'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMaestroStore } from "@/store/use-maestro-store";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarEvent } from "@/lib/types";
import { format } from "date-fns";

const concertSchema = z.object({
    title: z.string().min(1, "O título é obrigatório."),
    date: z.string().min(1, "A data é obrigatória."),
    startTime: z.string().min(1, "A hora de início é obrigatória."),
    endTime: z.string().min(1, "A hora de término é obrigatória."),
    location: z.string().min(1, "O local é obrigatório."),
    capacity: z.coerce.number().optional(),
    description: z.string().optional(),
});

interface ConcertFormProps {
    concert?: CalendarEvent;
    onFinished?: () => void;
}

export function ConcertForm({ concert, onFinished }: ConcertFormProps) {
    const { addEvent, updateEvent } = useMaestroStore();
    const { toast } = useToast();
    const isEditMode = !!concert;

    const form = useForm<z.infer<typeof concertSchema>>({
        resolver: zodResolver(concertSchema),
        defaultValues: {
            title: concert?.title || '',
            date: concert ? format(new Date(concert.date), 'yyyy-MM-dd') : '',
            startTime: concert ? format(new Date(concert.date), 'HH:mm') : '',
            endTime: concert?.endTime ? format(new Date(concert.endTime), 'HH:mm') : '',
            location: concert?.location || '',
            capacity: concert?.capacity || undefined,
            description: concert?.description || '',
        },
    });

    const onSubmit = (values: z.infer<typeof concertSchema>) => {
        const { startTime, ...restValues } = values;
        const eventData = {
            ...restValues,
            time: startTime,
            type: 'Concerto' as const,
            date: new Date(`${values.date}T${values.startTime}`),
        };

        if (isEditMode && concert.id) {
            updateEvent(concert.id, eventData);
            toast({ title: 'Sucesso!', description: 'Concerto atualizado com sucesso.' });
        } else {
            const newEvent = {
                ...eventData,
                status: 'Próxima' as const,
                participants: [],
            };
            addEvent(newEvent);
            toast({ title: 'Sucesso!', description: 'Concerto agendado com sucesso.' });
        }
        form.reset();
        onFinished?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>{isEditMode ? 'Editar Concerto' : 'Agendar Novo Concerto'}</CardTitle>
                        <CardDescription>
                            {isEditMode ? 'Altere os detalhes do concerto abaixo.' : 'Preencha os detalhes abaixo para agendar um novo concerto.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Título do Concerto *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Concerto de Outono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de Início *</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de Término *</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Local *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Auditório Principal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lotação Máxima</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Ex: 120" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="mt-6">
                                    <FormLabel>Descrição do Concerto</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descreva o concerto, tema, repertório, etc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => { form.reset(); onFinished?.(); }}>Cancelar</Button>
                        <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Agendar Concerto'}</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
