
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
import { useState } from 'react';
import { useMaestroStore } from '@/store/use-maestro-store';
import { useToast } from '@/hooks/use-toast';

interface TeacherFormProps {
  teacher?: Teacher;
}

export function TeacherForm({ teacher }: TeacherFormProps) {
  const isEditMode = !!teacher;
  const [open, setOpen] = useState(false);
  const { addTeacher, updateTeacher } = useMaestroStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const schedule: Teacher['schedule'] = {};
    const instruments: string[] = [];
    let tee = '';
    const otherData: { [key: string]: any } = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('schedule.')) {
        const day = key.split('.')[1];
        schedule[day] = value as string;
      } else if (key === 'instruments') {
        instruments.push(...(value as string).split(',').map(s => s.trim()));
      } else if(key === 'tee') {
        tee = value as string;
      }
      else {
        otherData[key] = value;
      }
    }

    const newTeacherData = { ...otherData, schedule, instruments, tee } as Omit<Teacher, 'id'>;

    try {
        if (isEditMode) {
            updateTeacher(teacher.id, newTeacherData);
            toast({ title: 'Sucesso', description: 'Professor atualizado com sucesso!' });
        } else {
            addTeacher(newTeacherData);
            toast({ title: 'Sucesso', description: 'Professor adicionado com sucesso!' });
        }
        setOpen(false); // Close the dialog on success
    } catch(error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro ao salvar o professor.' });
    }
  };

  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setOpen(true); }}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Professor
    </DropdownMenuItem>
  ) : (
    <Button onClick={() => setOpen(true)}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Professor
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Professor' : 'Adicionar Novo Professor'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do professor abaixo.' : 'Preencha os detalhes do novo professor.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" defaultValue={teacher?.name} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={teacher?.email} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="charge">Cargo</Label>
                    <Input id="charge" name="charge" defaultValue={teacher?.charge} placeholder="Ex: Chefe de Departamento" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instruments">Instrumentos</Label>
                    <Input id="instruments" name="instruments" defaultValue={teacher?.instruments.join(', ')} />
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
                            <Input id={`time-${day}`} name={`schedule.${day}`} defaultValue={time} className="col-span-2 h-8" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="tee">TEE</Label>
                <Textarea id="tee" name="tee" defaultValue={teacher?.tee} placeholder="Descreva as responsabilidades TEE do professor..." />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">
                Status
                </Label>
                <Select name="status" defaultValue={teacher?.status}>
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
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Professor'}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
