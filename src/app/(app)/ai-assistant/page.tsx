
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

export default function AiAssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
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
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Estou processando sua solicitação...' }]);
            setTimeout(() => {
                 setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: 'Com base nos nossos dados, aqui está o que encontrei...' }]);
            }, 1500)
        }, 500);
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
                                            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <div className="flex items-center gap-2">
                                <Input 
                                    placeholder="Digite sua pergunta ou solicitação..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <Button size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
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
