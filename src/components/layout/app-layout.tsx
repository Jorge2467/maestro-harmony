'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  FileCog,
  GitFork,
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
  FileText,
  Folder,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
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
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { mockActivities } from '@/lib/mock-data';
import { useUser } from '@/contexts/user-context';

const navItems = [
  {
    title: 'Principal',
    items: [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
      { href: '/statistics', icon: LineChart, label: 'Estatísticas' },
      { href: '/calendar', icon: Calendar, label: 'Calendário' },
    ],
  },
  {
    title: 'Gestão',
    items: [
      { href: '/students', icon: GraduationCap, label: 'Alunos', badge: '8' },
      { href: '/teachers', icon: Users, label: 'Professores' },
      { href: '/instruments', icon: Guitar, label: 'Instrumentos' },
      { href: '/curriculum', icon: BookOpen, label: 'Currículos' },
      { href: '/documents', icon: Folder, label: 'Documentos' },
      { href: '/ai-matching', icon: BrainCircuit, label: 'Recomendação IA' },
      { href: '/reports', icon: FileText, label: 'Relatórios IA' },
    ],
  },
  {
    title: 'Eventos',
    items: [
      { href: '/auditions', icon: Mic, label: 'Audições' },
      { href: '/concerts', icon: Music, label: 'Concertos' },
      { href: '/masterclasses', icon: Star, label: 'Masterclasses' },
    ],
  },
];

const bottomNavItems = [
    { href: '/settings', icon: Settings, label: 'Configurações' },
    { href: '/help', icon: HelpCircle, label: 'Ajuda & Suporte' },
    { href: '/admin/dashboard', icon: Shield, label: 'Admin', requiredRole: 'admin' },
]

function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-2 justify-center">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Avatar className="size-9 bg-primary/20 text-primary rounded-lg">
                <AvatarFallback className="bg-transparent font-bold">
                    <Music size={20} />
                </AvatarFallback>
            </Avatar>
            <span className={cn(
                "font-bold text-lg text-sidebar-foreground",
                state === 'collapsed' && 'hidden'
            )}>
                Harmony
            </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {navItems.map((section) => (
          <div key={section.title} className="mb-4">
             <h3 className={cn("px-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2", state === 'collapsed' && 'text-center')}>
                {state === 'collapsed' ? section.title.substring(0,3) : section.title}
            </h3>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{
                        children: item.label,
                        side: 'right',
                    }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                      {item.badge && <span className="ml-auto bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5">{item.badge}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            {bottomNavItems.map((item) => {
              if (item.requiredRole && item.requiredRole !== user.role) {
                return null;
              }
              return (
                 <SidebarMenuItem key={item.href}>
                 <SidebarMenuButton
                   asChild
                   isActive={pathname.startsWith(item.href)}
                   tooltip={{
                       children: item.label,
                       side: 'right',
                   }}
                 >
                   <Link href={item.href}>
                     <item.icon />
                     <span>{item.label}</span>
                   </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
            )})}
        </SidebarMenu>
        <div className={cn("mt-4 p-2 text-center text-xs text-sidebar-foreground/60", state === 'collapsed' && 'hidden')}>
            <p>© 2023 Maestro Harmony</p>
        </div>
      </SidebarFooter>
    </Sidebar>
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
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="p-4">
          <h4 className="font-medium text-lg mb-4">Notificações</h4>
          <ul className="space-y-4">
            {mockActivities.slice(0, 4).map((activity, index) => {
              const Icon = iconMap[activity.icon];
              return (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
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
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    // En una aplicación real, aquí invalidarías la sesión del usuario.
    // Por ahora, simplemente redirigimos a la página de login.
    router.replace('/');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Pesquisar..." className="pl-9" />
      </div>
      <div className="flex items-center gap-4">
        <Notifications />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
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
            <DropdownMenuItem onClick={handleLogout} className='text-destructive focus:text-destructive'>
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
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
