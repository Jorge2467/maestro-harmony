

'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, History, Plus, Send, Music, Calendar, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
    sender: 'user' | 'bot';
    text: string | React.ReactNode;
}

const initialMessage: Message = {
    sender: 'bot',
    text: (
        <div>
            <p>Olá! Sou seu assistente de IA. Posso ajudá-lo com:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Análise de dados e relatórios</li>
                <li>Recomendações pedagógicas</li>
                <li>Planejamento de eventos</li>
                <li>Previsões financeiras</li>
            </ul>
            <p className="mt-3">O que gostaria de explorar hoje?</p>
        </div>
    )
};


export default function AiAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getAIResponse = (query: string) => {
        query = query.toLowerCase();

        if (query.includes('aluno') || query.includes('estudante')) {
            return `Com base na nossa base de dados, tenho informações sobre 142 alunos ativos. Posso ajudá-lo com:<br><br>
            • Análise de desempenho individual ou por turma<br>
            • Recomendações pedagógicas personalizadas<br>
            • Identificação de alunos com potencial para competições<br>
            • Alertas sobre alunos em risco de evasão<br><br>
            Sobre qual aspecto gostaria de saber mais?`;
        }
        if (query.includes('financeiro') || query.includes('receita') || query.includes('orçamento')) {
            return `Nossas análises financeiras mostram:<br><br>
            • Receita mensal atual: R$ 42.580,00<br>
            • Previsão de crescimento: +8% no próximo mês<br>
            • Mensalidade média: R$ 320,00<br>
            • Taxa de inadimplência: 3,2%<br><br>
            Posso gerar relatórios detalhados ou simular cenários para o próximo semestre. O que precisa?`;
        }
        if (query.includes('evento') || query.includes('concerto') || query.includes('audição')) {
            return `Detectamos 3 eventos programados para os próximos 60 dias:<br><br>
            • Concerto de Outono (30/09 - Auditório Principal)<br>
            • Recital de Piano (15/10 - Sala de Concertos)<br>
            • Masterclass de Violino (05/11 - Sala 4)<br><br>
            Posso ajudar no planejamento, divulgação ou análise de participação. Qual é o foco?`;
        }
        if (query.includes('professor') || query.includes('instrutor')) {
            return `Nossa equipe pedagógica possui 18 professores ativos:<br><br>
            • 10 especialistas em instrumentos específicos<br>
            • 5 professores de teoria musical<br>
            • 3 maestros/regentes<br><br>
            A carga horária média é de 28h/semana com satisfação de 94% entre os alunos. Precisa de informações específicas?`;
        }
        return `Obrigado por sua pergunta! Com base em nossos dados, posso oferecer insights sobre:<br><br>
            • Desempenho e progresso dos alunos<br>
            • Análises financeiras e projeções<br>
            • Otimização de recursos e espaços<br>
            • Planejamento de eventos e concertos<br>
            • Recomendações pedagógicas<br><br>
            Poderia reformular sua pergunta ou escolher uma dessas áreas?`;
    };


    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = getAIResponse(input);
            setMessages(prev => [...prev, { sender: 'bot', text: <div dangerouslySetInnerHTML={{ __html: botResponse }} /> }]);
            setIsLoading(false);
        }, 1500);
    };


    return (
        <div>
            <PageHeader title="Assistente de IA">
                <Button variant="secondary"><History className="mr-2" /> Histórico</Button>
                <Button><Plus className="mr-2" /> Nova Conversa</Button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                             <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>Assistente Harmony</CardTitle>
                                <CardDescription>Como posso ajudá-lo hoje?</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <ScrollArea className="h-[400px] w-full pr-4 mb-4">
                                <div className="space-y-4">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                            {msg.sender === 'bot' && <Avatar><AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback></Avatar>}
                                            <div className={`max-w-md p-3 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                {typeof msg.text === 'string' ? <p>{msg.text}</p> : msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex items-end gap-3">
                                            <Avatar><AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback></Avatar>
                                            <div className="max-w-md p-3 rounded-lg text-sm bg-muted">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                            <div className="flex items-center gap-2">
                                <Input 
                                    placeholder="Digite sua pergunta ou solicitação..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    disabled={isLoading}
                                />
                                <Button size="icon" onClick={handleSend} disabled={isLoading}><Send className="h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ferramentas de Geração</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-muted"><Music className="h-5 w-5 text-primary" /></div>
                                    <h4 className="font-semibold">Gerador de Programas de Estudo</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">Crie programas de estudo personalizados com base no nível e objetivos do aluno.</p>
                                <Button size="sm" variant="secondary">Criar Programa</Button>
                            </div>
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-muted"><Calendar className="h-5 w-5 text-primary" /></div>
                                    <h4 className="font-semibold">Planejador de Eventos</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">Planeje eventos, com recomendações de datas, repertório e logística.</p>
                                <Button size="sm" variant="secondary">Planejar Evento</Button>
                            </div>
                             <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-muted"><FileText className="h-5 w-5 text-primary" /></div>
                                    <h4 className="font-semibold">Gerador de Orçamentos</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">Crie orçamentos detalhados para projetos, aquisições ou eventos.</p>
                                <Button size="sm" variant="secondary">Criar Orçamento</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
