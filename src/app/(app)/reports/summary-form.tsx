
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSummary, type State } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Loader, FileText, BotMessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaestroStore } from '@/store/use-maestro-store';

const initialState: State = {
  type: null,
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
      Gerar Relatório
    </Button>
  );
}

export function SummaryForm() {
  const [state, formAction] = useActionState(getSummary, initialState);
  const students = useMaestroStore(state => state.students);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Gerador de Relatórios</CardTitle>
          <CardDescription>
            Forneça os detalhes do aluno para gerar um resumo de desempenho com IA.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Aluno</Label>
                <Select name="studentName">
                  <SelectTrigger id="studentName">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.name}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {state?.errors?.studentName && <p className="text-sm text-destructive">{state.errors.studentName[0]}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="course">Curso</Label>
                <Select name="course">
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
            </div>
            <div className="space-y-2">
                <Label htmlFor="instrument">Instrumento</Label>
                    <Select name="instrument">
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
                {state?.errors?.instrument && <p className="text-sm text-destructive">{state.errors.instrument[0]}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="studentLevel">Nível Atual</Label>
              <Select name="studentLevel">
                <SelectTrigger id="studentLevel">
                  <SelectValue placeholder="Selecione o nível do aluno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.studentLevel && <p className="text-sm text-destructive">{state.errors.studentLevel[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="performanceDetails">Detalhes do Desempenho</Label>
              <Textarea id="performanceDetails" name="performanceDetails" placeholder="Descreva o progresso, pontos fortes, dificuldades, etc." />
              {state?.errors?.performanceDetails && <p className="text-sm text-destructive">{state.errors.performanceDetails[0]}</p>}
            </div>
            {state?.errors?._form && <p className="text-sm font-medium text-destructive">{state.errors._form[0]}</p>}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-8">
        {state?.type === 'success' && state.data && (
          <>
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Relatório Gerado com Sucesso!</AlertTitle>
              <AlertDescription>
                Abaixo está o resumo de desempenho gerado pela IA.
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader className='flex-row items-center gap-4 space-y-0'>
                <BotMessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>Resumo do Desempenho</CardTitle>
              </CardHeader>
              <CardContent className='pt-4'>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.data.summary}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
