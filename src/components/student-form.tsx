
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Student } from '@/lib/types';
import { PlusCircle, Edit } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';

interface StudentFormProps {
  student?: Student;
}

export function StudentForm({ student }: StudentFormProps) {
  const isEditMode = !!student;

  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Aluno
    </DropdownMenuItem>
  ) : (
    <Button>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Aluno
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do aluno abaixo.' : 'Preencha os detalhes do novo aluno.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" defaultValue={student?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" defaultValue={student?.email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instrument" className="text-right">
              Instrumento
            </Label>
            <Select defaultValue={student?.instrument}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um instrumento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cordas</SelectLabel>
                    <SelectItem value="Violino">Violino</SelectItem>
                    <SelectItem value="Viola">Viola</SelectItem>
                    <SelectItem value="Violoncelo">Violoncelo</SelectItem>
                    <SelectItem value="Contrabaixo">Contrabaixo</SelectItem>
                    <SelectItem value="Violão">Violão</SelectItem>
                    <SelectItem value="Harpa">Harpa</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Madeiras</SelectLabel>
                    <SelectItem value="Flauta">Flauta</SelectItem>
                    <SelectItem value="Clarinete">Clarinete</SelectItem>
                    <SelectItem value="Oboé">Oboé</SelectItem>
                    <SelectItem value="Fagote">Fagote</SelectItem>
                    <SelectItem value="Saxofone">Saxofone</SelectItem>
                </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Metais</SelectLabel>
                    <SelectItem value="Trompete">Trompete</SelectItem>
                    <SelectItem value="Trombone">Trombone</SelectItem>
                    <SelectItem value="Trompa">Trompa</SelectItem>
                    <SelectItem value="Tuba">Tuba</SelectItem>
                </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Teclas</SelectLabel>
                    <SelectItem value="Piano">Piano</SelectItem>
                    <SelectItem value="Órgão">Órgão</SelectItem>
                    <SelectItem value="Cravo">Cravo</SelectItem>
                    <SelectItem value="Acordeão">Acordeão</SelectItem>
                 </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Percussão</SelectLabel>
                    <SelectItem value="Bateria">Bateria</SelectItem>
                    <SelectItem value="Percussão">Percussão</SelectItem>
                 </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Nível
            </Label>
            <Select defaultValue={student?.level}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Iniciante">Iniciante</SelectItem>
                <SelectItem value="Intermediário">Intermediário</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select defaultValue={student?.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Aluno'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
