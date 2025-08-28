
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Plus } from "lucide-react";
import { LevelDistributionChart } from "@/components/dashboard/level-distribution-chart";
import { StudentEvolutionChart } from "@/components/dashboard/student-evolution-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { GraduationCap, Users, Music, Trophy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";


const RatingButton = ({ value, selected, onClick }: { value: number, selected: boolean, onClick: (value: number) => void }) => (
    <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
            "rounded-full h-9 w-9",
            selected && "bg-primary text-primary-foreground border-primary"
        )}
        onClick={() => onClick(value)}
    >
        {value}
    </Button>
);

const CriteriaItem = ({ label, onRate, rating }: { label: string, onRate: (value: number) => void, rating?: number }) => (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
        <p>{label}</p>
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(value => (
                <RatingButton key={value} value={value} selected={rating === value} onClick={() => onRate(value)} />
            ))}
        </div>
    </div>
);

const StudentEvaluationForm = () => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const handleRate = (criteria: string, value: number) => {
        setRatings(prev => ({ ...prev, [criteria]: value }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ficha de Avaliação - Ana Silva</CardTitle>
                <CardDescription>Turma: Piano Intermediário | Professor: Carlos Oliveira | Data: 10/11/2023</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Critérios Técnicos</h4>
                        <CriteriaItem label="Postura e posicionamento" onRate={(v) => handleRate('postura', v)} rating={ratings['postura']} />
                        <CriteriaItem label="Precisão rítmica" onRate={(v) => handleRate('ritmo', v)} rating={ratings['ritmo']} />
                        <CriteriaItem label="Afinação e qualidade sonora" onRate={(v) => handleRate('afinacao', v)} rating={ratings['afinacao']} />
                        <CriteriaItem label="Domínio técnico do instrumento" onRate={(v) => handleRate('dominio', v)} rating={ratings['dominio']} />

                        <h4 className="font-semibold text-lg mt-6 mb-2">Critérios Artísticos</h4>
                        <CriteriaItem label="Interpretação e expressividade" onRate={(v) => handleRate('interpretacao', v)} rating={ratings['interpretacao']} />
                        <CriteriaItem label="Dinâmica e fraseado" onRate={(v) => handleRate('dinamica', v)} rating={ratings['dinamica']} />
                    </div>
                    <div>
                         <h4 className="font-semibold text-lg mb-2">Resultados</h4>
                         <Card className="bg-muted/50 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Técnica:</span> <span>4.0</span></div>
                                <div className="flex justify-between"><span>Artístico:</span> <span>3.0</span></div>
                                <div className="flex justify-between"><span>Pontualidade:</span> <span>5.0</span></div>
                                <div className="flex justify-between"><span>Participação:</span> <span>4.0</span></div>
                                <div className="flex justify-between font-bold pt-2 border-t"><span>Média Final:</span> <span>4.0</span></div>
                            </div>
                         </Card>
                         <div className="mt-4">
                            <Label>Observações</Label>
                            <Textarea placeholder="Adicionar observações sobre o desempenho do aluno..." className="mt-2" />
                         </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Avaliação</Button>
            </CardFooter>
        </Card>
    )
}

const TeacherEvaluationForm = () => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const handleRate = (criteria: string, value: number) => {
        setRatings(prev => ({ ...prev, [criteria]: value }));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Avaliação de Desempenho - Prof. Carlos Oliveira</CardTitle>
                <CardDescription>Período: 2º Semestre 2023 | Avaliador: Coord. Maria Silva</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Competências Pedagógicas</h4>
                        <CriteriaItem label="Domínio dos conteúdos" onRate={(v) => handleRate('conteudos', v)} rating={ratings['conteudos']} />
                        <CriteriaItem label="Capacidade de planificação" onRate={(v) => handleRate('planificacao', v)} rating={ratings['planificacao']} />
                        <CriteriaItem label="Capacidade de comunicação" onRate={(v) => handleRate('comunicacao', v)} rating={ratings['comunicacao']} />
                        <CriteriaItem label="Adaptação aos alunos" onRate={(v) => handleRate('adaptacao', v)} rating={ratings['adaptacao']} />

                        <h4 className="font-semibold text-lg mt-6 mb-2">Competências Artísticas</h4>
                        <CriteriaItem label="Nível de desempenho artístico" onRate={(v) => handleRate('desempenho', v)} rating={ratings['desempenho']} />
                        <CriteriaItem label="Atualização e pesquisa musical" onRate={(v) => handleRate('pesquisa', v)} rating={ratings['pesquisa']} />
                    </div>
                     <div>
                         <h4 className="font-semibold text-lg mb-2">Resultados</h4>
                         <Card className="bg-muted/50 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Pedagógicas:</span> <span>4.0</span></div>
                                <div className="flex justify-between"><span>Artísticas:</span> <span>4.0</span></div>
                                <div className="flex justify-between"><span>Relacionamento:</span> <span>4.5</span></div>
                                <div className="flex justify-between"><span>Assiduidade:</span> <span>5.0</span></div>
                                <div className="flex justify-between font-bold pt-2 border-t"><span>Média Final:</span> <span>4.4</span></div>
                            </div>
                         </Card>
                         <div className="mt-4">
                            <Label>Comentários</Label>
                            <Textarea placeholder="Adicionar comentários sobre o desempenho do professor..." className="mt-2" />
                         </div>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Avaliação</Button>
            </CardFooter>
        </Card>
    );
};


export default function EvaluationsPage() {
    return (
        <div>
            <PageHeader title="Sistema de Avaliação">
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Exportar Relatório
                </Button>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nova Avaliação
                </Button>
            </PageHeader>
            <Tabs defaultValue="dashboard">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="student-eval">Avaliação de Alunos</TabsTrigger>
                    <TabsTrigger value="teacher-eval">Avaliação de Professores</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-6">
                    <div className="space-y-6">
                         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard title="Aproveitamento Geral" value="87%" icon={GraduationCap} />
                            <StatsCard title="Avaliação Média Professores" value="4.6/5" icon={Users} />
                            <StatsCard title="Participação em Recitais" value="92%" icon={Music} />
                            <StatsCard title="Prémios e Distinções" value="24" icon={Trophy} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <StudentEvolutionChart />
                            <LevelDistributionChart />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="student-eval" className="mt-6">
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todas as Turmas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="piano-iniciante">Piano Iniciante</SelectItem>
                                <SelectItem value="violino-avancado">Violino Avançado</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todos os Alunos" />
                            </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="ana-silva">Ana Silva</SelectItem>
                                <SelectItem value="joao-santos">João Santos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <StudentEvaluationForm />
                </TabsContent>
                <TabsContent value="teacher-eval" className="mt-6">
                     <div className="flex flex-wrap gap-4 mb-6">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todos os Professores" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="carlos-oliveira">Carlos Oliveira</SelectItem>
                                <SelectItem value="maria-santos">Maria Santos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <TeacherEvaluationForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
