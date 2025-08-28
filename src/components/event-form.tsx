'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { CalendarEvent } from '@/lib/types';
import { PlusCircle, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMaestroStore } from '@/store/use-maestro-store';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const eventSchema = z.object({
    title: z.string().min(1, "O título é obrigatório."),
    type: z.string().min(1, "O tipo é obrigatório."),
    date: z.string().min(1, "A data é obrigatória."),
    time: z.string().min(1, "A hora é obrigatória."),
    location: z.string().min(1, "O local é obrigatório."),
    description: z.string().optional(),
});

interface EventFormProps {
  event?: CalendarEvent;
  children?: React.ReactNode;
  trigger?: 'button' | 'card';
}

export function EventForm({ event, children, trigger = 'button' }: EventFormProps) {
  const isEditMode = !!event;
  const [open, setOpen] = useState(false);
  const { addEvent, updateEvent } = useMaestroStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
        title: event?.title || '',
        type: event?.type || '',
        date: event ? format(event.date, 'yyyy-MM-dd') : '',
        time: event?.time || '',
        location: event?.location || '',
        description: event?.description || '',
    },
  });

  // Reset form when dialog opens for editing
  if (isEditMode && open) {
      form.reset({
        title: event?.title || '',
        type: event?.type || '',
        date: event ? format(event.date, 'yyyy-MM-dd') : '',
        time: event?.time || '',
        location: event?.location || '',
        description: event?.description || '',
      });
  }


  const onSubmit = (values: z.infer<typeof eventSchema>) => {
    const combinedDate = new Date(`${values.date}T${values.time}`);

    if (isEditMode && event) {
        const updatedEvent = { ...event, ...values, date: combinedDate };
        updateEvent(event.id, updatedEvent);
        toast({ title: 'Sucesso!', description: 'Evento atualizado com sucesso.' });
    } else {
        const newEvent = {
            ...values,
            id: Date.now(),
            date: combinedDate,
            status: 'Próxima',
        };
        addEvent(newEvent);
        toast({ title: 'Sucesso!', description: 'Evento criado com sucesso.' });
    }
    setOpen(false);
    form.reset();
  };

  const TriggerComponent = trigger === 'button' ? (
    isEditMode ? (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
        </Button>
    ) : (
      <Button onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Criar Evento
      </Button>
    )
  ) : (
    <div className="w-full" onClick={() => setOpen(true)}>{children}</div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger === 'button' ? <DialogTrigger asChild>{TriggerComponent}</DialogTrigger> : TriggerComponent}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Evento' : 'Criar Novo Evento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do evento abaixo.' : 'Preencha os detalhes do novo evento.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título do Evento *</FormLabel>
                            <FormControl><Input placeholder="Ex: Concerto de Primavera" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de Evento *</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Concerto">Concerto</SelectItem>
                                        <SelectItem value="Audição">Audição</SelectItem>
                                        <SelectItem value="Masterclass">Masterclass</SelectItem>
                                        <SelectItem value="Reunião">Reunião</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                <FormControl><Input type="date" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Horário de Início *</FormLabel>
                                <FormControl><Input type="time" {...field} /></FormControl>
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
                                <FormControl><Input placeholder="Ex: Auditório Principal" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl><Textarea placeholder="Descreva brevemente o evento..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Evento'}</Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
