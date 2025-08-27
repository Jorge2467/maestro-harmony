
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
import type { Teacher } from '@/lib/types';
import { PlusCircle, Edit } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Textarea } from './ui/textarea';

interface TeacherFormProps {
  teacher?: Teacher;
}

export function TeacherForm({ teacher }: TeacherFormProps) {
  const isEditMode = !!teacher;

  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Professor
    </DropdownMenuItem>
  ) : (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Professor
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Professor' : 'Adicionar Novo Professor'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do professor abaixo.' : 'Preencha os detalhes do novo professor.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={teacher?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={teacher?.email} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="charge">Cargo</Label>
                <Input id="charge" defaultValue={teacher?.charge} placeholder="Ex: Chefe de Departamento" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="instruments">Instrumentos</Label>
                <Input id="instruments" defaultValue={teacher?.instruments.join(', ')} />
            </div>
          </div>
          
          <div>
            <Label>Horário Semanal</Label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 p-3 border rounded-md">
                {Object.entries(teacher?.schedule || {
                    "Segunda": "N/A", "Terça": "N/A", "Quarta": "N/A", 
                    "Quinta": "N/A", "Sexta": "N/A", "Sábado": "N/A"
                }).map(([day, time]) => (
                    <div key={day} className="grid grid-cols-3 items-center gap-2">
                        <Label htmlFor={`time-${day}`} className="text-right text-sm font-normal">{day}</Label>
                        <Input id={`time-${day}`} defaultValue={time} className="col-span-2 h-8" />
                    </div>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tee">TEE (Técnicas de Expressão e Execução)</Label>
            <Textarea id="tee" defaultValue={teacher?.tee} placeholder="Descreva as responsabilidades TEE do professor..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Status
            </Label>
            <Select defaultValue={teacher?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Professor'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
