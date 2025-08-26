'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getSummary } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Loader, FileText, BotMessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents } from '@/lib/mock-data';

const initialState = {
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
                    {mockStudents.map((student) => (
                      <SelectItem key={student.id} value={student.name}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                 {state?.errors?.studentName && <p className="text-sm text-destructive">{state.errors.studentName[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instrument">Instrumento</Label>
                 <Select name="instrument">
                  <SelectTrigger id="instrument">
                    <SelectValue placeholder="Selecione um instrumento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Piano">Piano</SelectItem>
                    <SelectItem value="Violino">Violino</SelectItem>
                    <SelectItem value="Violão">Violão</SelectItem>
                    <SelectItem value="Flauta">Flauta</SelectItem>
                    <SelectItem value="Violoncelo">Violoncelo</SelectItem>
                    <SelectItem value="Saxofone">Saxofone</SelectItem>
                  </SelectContent>
                </Select>
                 {state?.errors?.instrument && <p className="text-sm text-destructive">{state.errors.instrument[0]}</p>}
              </div>
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
