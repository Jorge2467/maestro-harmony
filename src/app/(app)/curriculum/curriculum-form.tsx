'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BotMessageSquare, BrainCircuit, FileUp, Loader, Trash2, Save } from 'lucide-react';
import { getCurriculumAnalysis } from './actions';

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
      Analisar com IA
    </Button>
  );
}

export function CurriculumForm() {
    const [state, formAction] = useActionState(getCurriculumAnalysis, initialState);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
            <Card>
            <form action={formAction}>
                <CardHeader>
                    <CardTitle>Análise de Currículo</CardTitle>
                    <CardDescription>
                        Carregue um documento para que a IA extraia as informações curriculares.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <Label htmlFor="level">Nível</Label>
                         <Select name="level">
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Iniciante">Iniciante</SelectItem>
                                <SelectItem value="Intermediário">Intermediário</SelectItem>
                                <SelectItem value="Avançado">Avançado</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.level && <p className="text-sm text-destructive">{state.errors.level[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="document">Documento do Currículo</Label>
                        <div className="flex items-center gap-3">
                            <Input id="document" name="document" type="file" className="text-sm" accept=".pdf,.doc,.docx,.txt" />
                            <FileUp className="h-5 w-5 text-muted-foreground" />
                        </div>
                         {state?.errors?.document && <p className="text-sm text-destructive">{state.errors.document[0]}</p>}
                    </div>
                    {state?.errors?._form && <p className="text-sm font-medium text-destructive">{state.errors._form[0]}</p>}
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
            </Card>
        </div>

        <div className="lg:col-span-2">
            {state?.type === 'success' && state.data ? (
                <Card>
                     <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Currículo Extraído</CardTitle>
                                <CardDescription>Revise e edite as informações extraídas pela IA.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <Save className="mr-2" />
                                    Salvar
                                </Button>
                                 <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2" />
                                    Apagar
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="objetivos">Objetivos</Label>
                            <Textarea id="objetivos" defaultValue={state.data.objetivos} rows={6} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repertorio">Repertório Sugerido</Label>
                            <Textarea id="repertorio" defaultValue={state.data.repertorio} rows={6} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="exercicios">Exercícios Técnicos</Label>
                            <Textarea id="exercicios" defaultValue={state.data.exercicios} rows={6} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observacoes">Observações</Label>
                            <Textarea id="observacoes" defaultValue={state.data.observacoes} rows={4} />
                        </div>
                    </CardContent>
                </Card>
            ) : (
                 <Alert>
                    <BotMessageSquare className="h-4 w-4" />
                    <AlertTitle>Aguardando Análise</AlertTitle>
                    <AlertDescription>
                        Preencha o formulário e carregue um documento. O conteúdo do currículo analisado pela IA aparecerá aqui.
                    </AlertDescription>
                </Alert>
            )}
        </div>
        </div>
    );
}
