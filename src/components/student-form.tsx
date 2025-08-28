

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
import { Separator } from './ui/separator';
import { useState } from 'react';
import { useMaestroStore } from '@/store/use-maestro-store';
import { useToast } from '@/hooks/use-toast';

interface StudentFormProps {
  student?: Student;
}

export function StudentForm({ student }: StudentFormProps) {
  const isEditMode = !!student;
  const [open, setOpen] = useState(false);
  const { addStudent, updateStudent } = useMaestroStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudentData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      course: formData.get('course') as string,
      instrument: formData.get('instrument') as string,
      level: formData.get('level') as Student['level'],
      status: formData.get('status') as Student['status'],
      schedule: {
        instrumento: formData.get('schedule.instrumento') as string,
        classeDeConjunto: formData.get('schedule.classeDeConjunto') as string,
        formacaoMusical: formData.get('schedule.formacaoMusical') as string,
        outrasDisciplinas: formData.get('schedule.outrasDisciplinas') as string,
      }
    };

    try {
        if (isEditMode && student.id) {
            await updateStudent(student.id, newStudentData);
            toast({ title: 'Sucesso', description: 'Aluno atualizado com sucesso!' });
        } else {
            await addStudent(newStudentData);
            toast({ title: 'Sucesso', description: 'Aluno adicionado com sucesso!' });
        }
        setOpen(false); // Close the dialog on success
    } catch(error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro ao salvar o aluno.' });
    }
  };


  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setOpen(true); }}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Aluno
    </DropdownMenuItem>
  ) : (
    <Button onClick={() => setOpen(true)}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Aluno
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do aluno abaixo.' : 'Preencha os detalhes do novo aluno.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="py-4 space-y-6">
                <fieldset className="grid gap-4 md:grid-cols-2">
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" name="name" defaultValue={student?.name} />
                    </div>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={student?.email} />
                    </div>
                    <div className="grid items-center gap-1.5">
                        <Label htmlFor="course">Curso</Label>
                        <Select name="course" defaultValue={student?.course}>
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
                        <Label htmlFor="instrument">Instrumento</Label>
                        <Select name="instrument" defaultValue={student?.instrument}>
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
                        <Label htmlFor="level">Nível</Label>
                        <Select name="level" defaultValue={student?.level}>
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
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={student?.status}>
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
                </fieldset>

                <Separator />
                
                <fieldset>
                    <h3 className="text-lg font-medium mb-4">Horário Semanal</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="schedule-instrument">Instrumento</Label>
                            <Input id="schedule-instrument" name="schedule.instrumento" defaultValue={student?.schedule?.instrumento} placeholder="Ex: Seg, Qua 16:00-17:00" />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="schedule-ensemble">Classe de Conjunto</Label>
                            <Input id="schedule-ensemble" name="schedule.classeDeConjunto" defaultValue={student?.schedule?.classeDeConjunto} placeholder="Ex: Sex 18:00-19:30" />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="schedule-theory">Formação Musical</Label>
                            <Input id="schedule-theory" name="schedule.formacaoMusical" defaultValue={student?.schedule?.formacaoMusical} placeholder="Ex: Ter 15:00-16:00" />
                        </div>
                        <div className="grid items-center gap-1.5">
                            <Label htmlFor="schedule-other">Outras Disciplinas</Label>
                            <Input id="schedule-other" name="schedule.outrasDisciplinas" defaultValue={student?.schedule?.outrasDisciplinas} placeholder="Ex: Coro, Orquestra" />
                        </div>
                    </div>
                </fieldset>

            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Aluno'}</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
