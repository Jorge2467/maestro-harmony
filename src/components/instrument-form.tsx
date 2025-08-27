
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
import type { Instrument } from '@/lib/types';
import { PlusCircle, Edit } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { mockStudents } from '@/lib/mock-data';

interface InstrumentFormProps {
  instrument?: Instrument;
}

export function InstrumentForm({ instrument }: InstrumentFormProps) {
  const isEditMode = !!instrument;

  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Instrumento
    </DropdownMenuItem>
  ) : (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Instrumento
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Instrumento' : 'Adicionar Novo Instrumento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do instrumento abaixo.' : 'Preencha os detalhes do novo instrumento.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" defaultValue={instrument?.type} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="serialNumber">Nº de Série</Label>
              <Input id="serialNumber" defaultValue={instrument?.serialNumber} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={instrument?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponível">Disponível</SelectItem>
                  <SelectItem value="Em Uso">Em Uso</SelectItem>
                  <SelectItem value="Em Reparo">Em Reparo</SelectItem>
                  <SelectItem value="Avariado">Avariado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Localização</Label>
              <Input id="location" defaultValue={instrument?.location} placeholder="Ex: Sala 3, Com aluno..." />
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="studentId">Associado a</Label>
                <Select defaultValue={instrument?.studentId?.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">Ninguém</SelectItem>
                    {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-1.5">
              <Label htmlFor="lastMaintenance">Última Manutenção</Label>
              <Input id="lastMaintenance" type="date" defaultValue={instrument?.lastMaintenance} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Instrumento'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
