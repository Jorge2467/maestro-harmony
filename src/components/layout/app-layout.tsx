

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  BookOpen,
  Calendar,
  FileCog,
  GraduationCap,
  Guitar,
  HelpCircle,
  Home,
  LineChart,
  Mic,
  Music,
  Search,
  Settings,
  Star,
  Users,
  BrainCircuit,
  LogOut,
  CheckCircle,
  Wrench,
  CalendarPlus,
  UserPlus,
  Shield,
  Folder,
  FileText,
  PanelLeft,
  Bot,
  BarChart,
  MessageSquare,
  Video,
  ClipboardCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { mockActivities } from '@/lib/mock-data';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMaestroStore } from '@/store/use-maestro-store';
import { useUser } from '@/contexts/user-context';


const navItems = [
  {
    title: 'Principal',
    items: [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
      { href: '/statistics', icon: LineChart, label: 'Estatísticas' },
    ],
  },
  {
    title: 'Gestão',
    items: [
      { href: '/students', icon: GraduationCap, label: 'Alunos' },
      { href: '/teachers', icon: Users, label: 'Professores' },
      { href: '/instruments', icon: Guitar, label: 'Instrumentos' },
      { href: '/curriculum', icon: BookOpen, label: 'Currículos' },
      { href: '/documents', icon: Folder, label: 'Documentos' },
    ],
  },
   {
    title: 'Análise e Ensino',
    items: [
        { href: '/progress-analysis', icon: BarChart, label: 'Análise de Progresso' },
        { href: '/video-lessons', icon: Video, label: 'Videoaulas' },
        { href: '/evaluations', icon: CheckCircle, label: 'Avaliações' },
    ],
  },
  {
    title: 'Inteligência Artificial',
    items: [
        { href: '/ai-recommendation', icon: BrainCircuit, label: 'Recomendação IA' },
        { href: '/reports', icon: FileText, label: 'Relatórios IA' },
        { href: '/ai-assistant', icon: Bot, label: 'Assistente IA' },
        { href: '/ai-analytics', icon: BarChart, label: 'Análise Preditiva' },
        { href: '/ai-matching', icon: Bot, label: 'Matching IA' },
    ]
  },
  {
    title: 'Eventos',
    items: [
      { href: '/auditions', icon: Mic, label: 'Audições' },
      { href: '/concerts', icon: Music, label: 'Concertos' },
      { href: '/masterclasses', icon: Star, label: 'Masterclasses' },
    ],
  },
  {
    title: 'Ferramentas',
    items: [
        { href: '/calendar', icon: Calendar, label: 'Calendário' },
        { href: '/tasks', icon: ClipboardCheck, label: 'Tarefas' },
        { href: '/messaging', icon: MessageSquare, label: 'Mensagens' },
    ]
  }
];

const bottomNavItems = [
    { href: '/settings', icon: Settings, label: 'Configurações' },
    { href: '/help', icon: HelpCircle, label: 'Ajuda & Suporte' },
    { href: '/admin/dashboard', icon: Shield, label: 'Admin', requiredRole: 'admin' },
]

function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { students, teachers, concerts } = useMaestroStore(state => ({
    students: state.students,
    teachers: state.teachers,
    concerts: state.events,
  }));

  const getBadgeCount = (href: string) => {
    switch (href) {
      case '/students':
        return students.length > 0 ? students.length.toString() : null;
      case '/teachers':
        return teachers.length > 0 ? teachers.length.toString() : null;
      case '/concerts':
        const concertCount = concerts.filter(c => c.type === 'Concerto').length;
        return concertCount > 0 ? concertCount.toString() : null;
      default:
        return null;
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-primary text-primary-foreground flex-col hidden md:flex">
        <div className="flex items-center gap-3 p-6 border-b border-primary-foreground/10">
          <div className="bg-primary-foreground/20 p-2 rounded-lg">
            <Music className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold">Maestro Harmony</h2>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {navItems.map((section) => (
            <div key={section.title} className="p-4">
              <h3 className="px-2 text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider mb-2">
                  {section.title}
              </h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                        pathname.startsWith(item.href) && "bg-primary-foreground/10"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {getBadgeCount(item.href) && <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full px-2 py-0.5">{getBadgeCount(item.href)}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <ul>
            {bottomNavItems.map((item) => {
              if (item.requiredRole && user && item.requiredRole !== user.role) {
                return null;
              }
              return (
                 <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                        pathname.startsWith(item.href) && "bg-primary-foreground/10"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
            )})}
          </ul>
        </div>
    </aside>
  );
}

const iconMap: { [key: string]: LucideIcon } = {
  CheckCircle,
  Wrench,
  CalendarPlus,
  UserPlus,
};

function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative text-muted-foreground hover:text-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="p-2">
          <div className='flex justify-between items-center mb-2 p-2'>
            <h4 className="font-medium">Notificações</h4>
            <Button variant="link" size="sm" className="text-primary p-0 h-auto">Limpar tudo</Button>
          </div>
          <ul className="space-y-1">
            {mockActivities.slice(0, 4).map((activity, index) => {
              const Icon = iconMap[activity.icon];
              return (
                <li key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background mt-1">
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AppHeader() {
  const { user } = useUser();
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 shrink-0">
       {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AppSidebar />
          </SheetContent>
        </Sheet>
      )}
      <div className="relative flex-1 hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar..." className="pl-9 bg-muted" />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Notifications />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{(user.displayName || user.email || 'U').substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
                <p className="font-medium">{user.displayName || 'Usuário'}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/profile">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className='text-destructive focus:text-destructive'>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { fetchAllData } = useMaestroStore();

  React.useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);
  
  return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6 bg-background overflow-y-auto">{children}</main>
        </div>
      </div>
  );
}
