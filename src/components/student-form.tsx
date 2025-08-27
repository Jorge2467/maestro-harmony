

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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do aluno abaixo.' : 'Preencha os detalhes do novo aluno.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div className="grid items-center gap-1.5">
            <Label htmlFor="name">
              Nome
            </Label>
            <Input id="name" defaultValue={student?.name} />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="email">
              Email
            </Label>
            <Input id="email" type="email" defaultValue={student?.email} />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="course">
              Curso
            </Label>
            <Select defaultValue={student?.course}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Iniciação Musical</SelectLabel>
                  <SelectItem value="Música para Bebés (0-36m)">Música para Bebés (0-36m)</SelectItem>
                  <SelectItem value="Iniciação (3-5 anos)">Iniciação (3-5 anos)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Ensino Articulado</SelectLabel>
                  <SelectItem value="Curso Básico (Articulado)">Curso Básico (Articulado)</SelectItem>
                  <SelectItem value="Curso Secundário (Articulado)">Curso Secundário (Articulado)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Ensino Supletivo</SelectLabel>
                    <SelectItem value="Curso Básico (Supletivo)">Curso Básico (Supletivo)</SelectItem>
                    <SelectItem value="Curso Secundário (Supletivo)">Curso Secundário (Supletivo)</SelectItem>
                </SelectGroup>
                 <SelectGroup>
                    <SelectLabel>Ensino Profissional</SelectLabel>
                    <SelectItem value="Curso Profissional de Instrumentista de Cordas e de Tecla">Curso Profissional de Instrumentista de Cordas e de Tecla</SelectItem>
                    <SelectItem value="Curso Profissional de Instrumentista de Sopro e de Percussão">Curso Profissional de Instrumentista de Sopro e de Percussão</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Curso Livre</SelectLabel>
                    <SelectItem value="Curso Livre">Curso Livre</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="instrument">
              Instrumento
            </Label>
            <Select defaultValue={student?.instrument}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um instrumento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                    <SelectLabel>Cordas</SelectLabel>
                    <SelectItem value="Violino">Violino</SelectItem>
                    <SelectItem value="Viola">Viola</SelectItem>
                    <SelectItem value="Violoncelo">Violoncelo</SelectItem>
                    <SelectItem value="Contrabaixo">Contrabaixo</SelectItem>
                    <SelectItem value="Guitarra">Guitarra</SelectItem>
                    <SelectItem value="Harpa">Harpa</SelectItem>
                    <SelectItem value="Mandolina">Mandolina</SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Cordofones Madeirenses</SelectLabel>
                    <SelectItem value="Braguinha">Braguinha</SelectItem>
                    <SelectItem value="Rajão">Rajão</SelectItem>
                    <SelectItem value="Viola de arame">Viola de arame</SelectItem>
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
          <div className="grid items-center gap-1.5">
            <Label htmlFor="level">
              Nível
            </Label>
            <Select defaultValue={student?.level}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Iniciante">Iniciante</SelectItem>
                <SelectItem value="Intermediário">Intermediário</SelectItem>
                <SelectItem value="Avançado">Avançado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="status">
              Status
            </Label>
            <Select defaultValue={student?.status}>
              <SelectTrigger>
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
