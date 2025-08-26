'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getRecommendation } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BrainCircuit, Loader, ThumbsUp, UserCheck, MessageSquareQuote } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
      Obter Recomendação
    </Button>
  );
}

export function RecommendationForm() {
  const [state, formAction] = useActionState(getRecommendation, initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Recomendação com IA</CardTitle>
          <CardDescription>
            Forneça os detalhes do aluno para receber uma recomendação de professor e plano de estudos.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentGoals">Metas do Aluno</Label>
              <Textarea id="studentGoals" name="studentGoals" placeholder="Ex: Dominar sonatas de Beethoven, preparar para audição..." />
              {state?.errors?.studentGoals && <p className="text-sm text-destructive">{state.errors.studentGoals[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentLevel">Nível Atual</Label>
              <Textarea id="studentLevel" name="studentLevel" placeholder="Ex: Intermediário, confortável com escalas maiores e menores..." />
              {state?.errors?.studentLevel && <p className="text-sm text-destructive">{state.errors.studentLevel[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentProgress">Progresso Recente</Label>
              <Textarea id="studentProgress" name="studentProgress" placeholder="Ex: Melhorou na articulação, mas ainda com dificuldades em ritmo..." />
              {state?.errors?.studentProgress && <p className="text-sm text-destructive">{state.errors.studentProgress[0]}</p>}
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
              <ThumbsUp className="h-4 w-4" />
              <AlertTitle>Recomendações Geradas!</AlertTitle>
              <AlertDescription>
                Abaixo estão as sugestões baseadas nas informações fornecidas.
              </AlertDescription>
            </Alert>
            <Card>
              <CardHeader className='flex-row items-center gap-4 space-y-0'>
                <UserCheck className="h-6 w-6 text-primary" />
                <CardTitle>Professor Recomendado</CardTitle>
              </CardHeader>
              <CardContent className='pt-4'>
                <p className="font-semibold text-lg text-primary">{state.data.teacherRecommendation}</p>
                <div className='mt-4 p-4 bg-muted/50 rounded-lg'>
                    <h4 className='flex items-center gap-2 font-semibold text-sm mb-2'>
                        <MessageSquareQuote className="h-4 w-4" />
                        Justificativa
                    </h4>
                    <p className="text-sm text-muted-foreground">{state.data.recommendationReason}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex-row items-center gap-4 space-y-0'>
                <BrainCircuit className="h-6 w-6 text-accent" />
                <CardTitle>Plano de Estudos Sugerido</CardTitle>
              </CardHeader>
              <CardContent className='pt-4'>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.data.learningPathRecommendation}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
