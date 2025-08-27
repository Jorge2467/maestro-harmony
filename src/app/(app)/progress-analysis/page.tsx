
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Download, Sync, Lightbulb, Check, Music, SlidersHorizontal, Star } from "lucide-react";
import { InstrumentStatusChart } from "@/components/dashboard/instrument-status-chart";
import { StudentEvolutionChart } from "@/components/dashboard/student-evolution-chart";

const progressData = [
    { student: 'Ana Silva', instrument: 'Piano', progress: 85, level: 'Intermediário', goal: 'Avançado em 6 meses' },
    { student: 'João Santos', instrument: 'Violino', progress: 92, level: 'Básico', goal: 'Intermediário em 4 meses' },
    { student: 'Mariana Oliveira', instrument: 'Flauta', progress: 78, level: 'Avançado', goal: 'Master em 8 meses' },
    { student: 'Pedro Costa', instrument: 'Guitarra', progress: 65, level: 'Intermediário', goal: 'Avançado em 5 meses' },
];

const learningPath = [
    { icon: Check, title: "Fundamentos do Instrumento", description: "Posicionamento, postura e técnicas básicas", weeks: "2-3", completion: 92, completed: true },
    { icon: Check, title: "Leitura Musical Básica", description: "Notas, ritmos e compassos simples", weeks: "3-4", completion: 88, completed: true },
    { icon: Music, title: "Repertório Inicial", description: "Peças simples e exercícios técnicos", weeks: "4-6", completion: 65, completed: false },
    { icon: SlidersHorizontal, title: "Técnicas Intermediárias", description: "Desenvolvimento de expressão e dinâmica", weeks: "6-8", completion: 42, completed: false },
    { icon: Star, title: "Repertório Avançado", description: "Peças complexas e preparação para performances", weeks: "8-12", completion: 28, completed: false },
];

const insights = [
    "Alunos que praticam regularmente (5+ vezes por semana) mostram progresso 2.3x mais rápido que a média.",
    "Sessões de prática mais curtas e frequentes (30-45 minutos) são mais efetivas que sessões longas e esporádicas.",
    "Alunos que assistem videoaulas complementares mostram 40% melhor retenção de técnicas complexas.",
    "Prática deliberada com feedback imediato acelera o domínio de novas habilidades em 65%.",
];

export default function ProgressAnalysisPage() {
    return (
        <div>
            <PageHeader title="Análise de Progresso">
                <Button variant="secondary"><Download className="mr-2" /> Exportar</Button>
                <Button><Sync className="mr-2" /> Atualizar</Button>
            </PageHeader>

            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="patterns">Padrões de Aprendizagem</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <StudentEvolutionChart />
                        <InstrumentStatusChart />
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Alunos com Maior Progresso</CardTitle>
                            <CardDescription>Acompanhe os alunos que mais se destacaram no último período.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Aluno</TableHead>
                                        <TableHead>Instrumento</TableHead>
                                        <TableHead>Progresso Mensal</TableHead>
                                        <TableHead>Meta</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {progressData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.student}</TableCell>
                                            <TableCell>{item.instrument}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={item.progress} className="w-32" />
                                                    <span>{item.progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{item.goal}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline">Detalhes</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="patterns" className="mt-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Trajetória de Aprendizagem Recomendada</CardTitle>
                                <CardDescription>Um caminho sugerido para o domínio de um instrumento.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="relative space-y-6">
                                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-border -z-10"></div>
                                    {learningPath.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className={`flex items-center justify-center h-12 w-12 rounded-full border-2 ${item.completed ? 'bg-accent border-accent text-accent-foreground' : 'bg-muted border-muted-foreground/20'}`}>
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    <span>Duração: {item.weeks} semanas</span> | <span>Conclusão: {item.completion}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Insights de Aprendizagem</CardTitle>
                                <CardDescription>Padrões identificados pela IA para otimizar o estudo.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {insights.map((insight, index) => (
                                     <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Lightbulb className="h-5 w-5 text-primary mt-1" />
                                        <p className="text-sm text-muted-foreground">{insight}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
