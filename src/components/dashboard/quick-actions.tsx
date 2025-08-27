
'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { UserPlus, CalendarPlus, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const actions = [
  {
    icon: UserPlus,
    title: 'Novo Aluno',
    desc: 'Adicionar novo estudante ao sistema',
    path: '/students',
  },
  {
    icon: CalendarPlus,
    title: 'Agendar Evento',
    desc: 'Criar novo concerto ou audição',
    path: '/calendar',
  },
  {
    icon: Bot,
    title: 'Assistente IA',
    desc: 'Obter ajuda inteligente',
    path: '/ai-assistant',
  },
];

export function QuickActions() {
  const router = useRouter();
  const { toast } = useToast();

  const handleActionClick = (path?: string) => {
    if (path) {
      router.push(path);
    } else {
      toast({
        title: 'Funcionalidade em desenvolvimento',
        description: 'O módulo de pagamentos será implementado em breve.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Card
          key={index}
          className="group cursor-pointer p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          onClick={() => handleActionClick(action.path)}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <action.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </div>
          </div>
        </Card>
      ))}
       <Card
          className="group cursor-pointer p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          onClick={() => handleActionClick()}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Registrar Pagamento</h3>
              <p className="text-sm text-muted-foreground">Registrar mensalidade recebida</p>
            </div>
          </div>
        </Card>
    </div>
  );
}
