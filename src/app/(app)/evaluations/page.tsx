
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
import { Input } from "@/components/ui/input";

const CriteriaItem = ({ label, onRate, rating, max = 20, step = 1 }: { label: string, onRate: (value: number) => void, rating?: number, max?: number, step?: number }) => (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">
        <p className="text-sm">{label}</p>
        <Input 
            type="number" 
            className="w-24" 
            value={rating ?? ''}
            onChange={(e) => onRate(parseFloat(e.target.value))}
            min={0}
            max={max}
            step={step}
            placeholder="0"
        />
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
                <CardTitle>Ficha de Avaliação - Aluno</CardTitle>
                <CardDescription>Turma: Piano Intermediário | Professor: Carlos Oliveira | Data: 10/11/2023</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Critérios (0-20)</h4>
                        <CriteriaItem label="Postura e posicionamento" onRate={(v) => handleRate('postura', v)} rating={ratings['postura']} max={20} />
                        <CriteriaItem label="Precisão rítmica" onRate={(v) => handleRate('ritmo', v)} rating={ratings['ritmo']} max={20} />
                        <CriteriaItem label="Afinação e qualidade sonora" onRate={(v) => handleRate('afinacao', v)} rating={ratings['afinacao']} max={20} />
                        <CriteriaItem label="Domínio técnico" onRate={(v) => handleRate('dominio', v)} rating={ratings['dominio']} max={20} />
                        <CriteriaItem label="Interpretação e expressividade" onRate={(v) => handleRate('interpretacao', v)} rating={ratings['interpretacao']} max={20} />
                        <CriteriaItem label="Dinâmica e fraseado" onRate={(v) => handleRate('dinamica', v)} rating={ratings['dinamica']} max={20} />
                    </div>
                    <div>
                         <h4 className="font-semibold text-lg mb-2">Resultados</h4>
                         <Card className="bg-muted/50 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between font-bold pt-2 border-t"><span>Média Final (0-20):</span> <span>16.5</span></div>
                                <div className="flex justify-between font-bold"><span>Média Final (0-5):</span> <span>4.1</span></div>
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
                <CardTitle>Avaliação de Desempenho - Professor</CardTitle>
                <CardDescription>Período: 2º Semestre 2023 | Avaliador: Coord. Maria Silva</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Critérios (0-10)</h4>
                        <CriteriaItem label="Domínio dos conteúdos" onRate={(v) => handleRate('conteudos', v)} rating={ratings['conteudos']} max={10} step={0.1} />
                        <CriteriaItem label="Capacidade de planificação" onRate={(v) => handleRate('planificacao', v)} rating={ratings['planificacao']} max={10} step={0.1} />
                        <CriteriaItem label="Capacidade de comunicação" onRate={(v) => handleRate('comunicacao', v)} rating={ratings['comunicacao']} max={10} step={0.1} />
                        <CriteriaItem label="Adaptação aos alunos" onRate={(v) => handleRate('adaptacao', v)} rating={ratings['adaptacao']} max={10} step={0.1} />
                        <CriteriaItem label="Nível de desempenho artístico" onRate={(v) => handleRate('desempenho', v)} rating={ratings['desempenho']} max={10} step={0.1} />
                        <CriteriaItem label="Atualização e pesquisa musical" onRate={(v) => handleRate('pesquisa', v)} rating={ratings['pesquisa']} max={10} step={0.1} />
                    </div>
                     <div>
                         <h4 className="font-semibold text-lg mb-2">Resultados</h4>
                         <Card className="bg-muted/50 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between font-bold pt-2 border-t"><span>Média Final (0-10):</span> <span>8.8</span></div>
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

const StaffEvaluationForm = () => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const handleRate = (criteria: string, value: number) => {
        setRatings(prev => ({ ...prev, [criteria]: value }));
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Avaliação de Desempenho - Funcionário</CardTitle>
                <CardDescription>Departamento: Administração | Avaliador: Coord. Maria Silva</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Critérios (0-10)</h4>
                        <CriteriaItem label="Conhecimento das funções" onRate={(v) => handleRate('conhecimento', v)} rating={ratings['conhecimento']} max={10} step={0.1} />
                        <CriteriaItem label="Qualidade do trabalho" onRate={(v) => handleRate('qualidade', v)} rating={ratings['qualidade']} max={10} step={0.1} />
                        <CriteriaItem label="Produtividade e eficiência" onRate={(v) => handleRate('produtividade', v)} rating={ratings['produtividade']} max={10} step={0.1} />
                        <CriteriaItem label="Assiduidade e pontualidade" onRate={(v) => handleRate('assiduidade', v)} rating={ratings['assiduidade']} max={10} step={0.1} />
                        <CriteriaItem label="Comunicação e atendimento" onRate={(v) => handleRate('comunicacao', v)} rating={ratings['comunicacao']} max={10} step={0.1} />
                        <CriteriaItem label="Trabalho em equipa" onRate={(v) => handleRate('equipa', v)} rating={ratings['equipa']} max={10} step={0.1} />
                    </div>
                     <div>
                         <h4 className="font-semibold text-lg mb-2">Resultados</h4>
                         <Card className="bg-muted/50 p-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between font-bold pt-2 border-t"><span>Média Final (0-10):</span> <span>9.2</span></div>
                            </div>
                         </Card>
                         <div className="mt-4">
                            <Label>Comentários</Label>
                            <Textarea placeholder="Adicionar comentários sobre o desempenho do funcionário..." className="mt-2" />
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
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="student-eval">Avaliação de Alunos</TabsTrigger>
                    <TabsTrigger value="teacher-eval">Avaliação de Professores</TabsTrigger>
                    <TabsTrigger value="staff-eval">Avaliação de Funcionários</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-6">
                    <div className="space-y-6">
                         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <StatsCard title="Aproveitamento Geral" value="87%" icon={GraduationCap} />
                            <StatsCard title="Avaliação Média Professores" value="8.8/10" icon={Users} />
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
                 <TabsContent value="staff-eval" className="mt-6">
                     <div className="flex flex-wrap gap-4 mb-6">
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todos os Funcionários" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="joao-mendes">João Mendes (Admin)</SelectItem>
                                <SelectItem value="ana-ferreira">Ana Ferreira (Secretaria)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <StaffEvaluationForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}

    