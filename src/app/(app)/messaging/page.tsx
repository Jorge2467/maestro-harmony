
'use client';

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const threads = [
  { id: 1, name: 'Professores de Piano', preview: 'Precisamos combinar o repertório...', unread: 2, avatar: 'PP' },
  { id: 2, name: 'Equipe de Coordenação', preview: 'Reunião confirmada para sexta...', unread: 0, avatar: 'EC' },
  { id: 3, name: 'Ana Silva', preview: 'Obrigada pelo feedback, professor!', unread: 0, avatar: 'AS' },
  { id: 4, name: 'Grupo de Violino', preview: 'Lembrando do ensaio geral...', unread: 1, avatar: 'GV' },
];

const messages = [
  { id: 1, sender: 'Maria Santos', text: 'Pessoal, precisamos combinar o repertório para o recital do próximo mês.', time: '10:15 AM', type: 'received' },
  { id: 2, sender: 'Você', text: 'Já tenho algumas sugestões. Podemos conversar hoje após as aulas?', time: '10:18 AM', type: 'sent' },
  { id: 3, sender: 'Ricardo Almeida', text: 'Para mim hoje é perfeito. Sugiro que cada um traga 2-3 peças para discutirmos.', time: '10:22 AM', type: 'received' },
  { id: 4, sender: 'Juliana Martins', text: 'Ótima ideia! Levo algumas sugestões para os alunos iniciantes também.', time: '10:25 AM', type: 'received' },
];


export default function MessagingPage() {
  const [activeThread, setActiveThread] = useState(1);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Sistema de Mensagens">
        <Button>
          <Plus className="mr-2" /> Nova Mensagem
        </Button>
      </PageHeader>
      
      <Card className="flex-1 flex overflow-hidden">
        <CardContent className="flex w-full p-0">
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Conversas</h3>
            </div>
            <ScrollArea className="h-full">
              <div className="p-2">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThread(thread.id)}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer hover:bg-muted",
                      activeThread === thread.id && "bg-muted"
                    )}
                  >
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{thread.name}</p>
                        {thread.unread > 0 && <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">{thread.unread}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{thread.preview}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-2/3 flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{threads.find(t => t.id === activeThread)?.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{threads.find(t => t.id === activeThread)?.name}</h3>
                <p className="text-sm text-muted-foreground">4 participantes</p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex flex-col", msg.type === 'sent' ? 'items-end' : 'items-start')}>
                     <div className={cn(
                       "max-w-md p-3 rounded-lg text-sm",
                       msg.type === 'sent' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                     )}>
                       {msg.type === 'received' && <p className="font-semibold mb-1">{msg.sender}</p>}
                       <p>{msg.text}</p>
                       <p className="text-xs opacity-70 mt-2 text-right">{msg.time}</p>
                     </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input placeholder="Digite sua mensagem..." />
                <Button size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
