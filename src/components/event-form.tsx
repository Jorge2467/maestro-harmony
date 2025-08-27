'use client';

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
import { Label } from '@/components/ui/label';
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

interface EventFormProps {
  event?: CalendarEvent;
  children?: React.ReactNode;
  trigger?: 'button' | 'card';
}

export function EventForm({ event, children, trigger = 'button' }: EventFormProps) {
  const isEditMode = !!event;

  const TriggerComponent = trigger === 'button' ? (
    isEditMode ? (
        <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Editar
        </Button>
    ) : (
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Criar Evento
      </Button>
    )
  ) : (
    <div className="w-full">{children}</div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Evento' : 'Criar Novo Evento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do evento abaixo.' : 'Preencha os detalhes do novo evento.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Evento *</Label>
            <Input id="title" defaultValue={event?.title} placeholder="Ex: Concerto de Primavera"/>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <Label htmlFor="type">Tipo de Evento *</Label>
                <Select defaultValue={event?.type}>
                  <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Concerto">Concerto</SelectItem>
                      <SelectItem value="Audição">Audição</SelectItem>
                      <SelectItem value="Masterclass">Masterclass</SelectItem>
                      <SelectItem value="Reunião">Reunião</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input id="date" type="date" defaultValue={event ? format(event.date, 'yyyy-MM-dd') : ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário de Início *</Label>
              <Input id="time" type="time" defaultValue={event?.time} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Local *</Label>
              <Input id="location" defaultValue={event?.location} placeholder="Ex: Auditório Principal"/>
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" defaultValue={event?.description} placeholder="Descreva brevemente o evento..."/>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Evento'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
