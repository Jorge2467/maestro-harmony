'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Clock, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Student } from '@/lib/types';
import { cn } from '@/lib/utils';
import { StudentForm } from '@/components/student-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMaestroStore } from '@/store/use-maestro-store';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const student = row.original;
      const avatarFallback = student.name.substring(0, 2).toUpperCase();
      return (
        <div className="flex items-center gap-3">
           <Avatar className="h-8 w-8">
              <AvatarImage src={`https://i.pravatar.cc/40?u=${student.email}`} alt={student.name} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{student.name}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'instrument',
    header: 'Instrumento',
  },
  {
    accessorKey: 'level',
    header: 'Nível',
  },
   {
    accessorKey: 'course',
    header: 'Curso',
    cell: ({ row }) => {
      const course = row.getValue('course') as string;
      return <span className="text-muted-foreground">{course || 'N/A'}</span>;
    }
  },
  {
    accessorKey: 'schedule',
    header: 'Horário',
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      if (!schedule?.instrumento) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      
      const hasMoreSchedules = schedule.classeDeConjunto || schedule.formacaoMusical || schedule.outrasDisciplinas;
      
      return (
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{schedule.instrumento}</span>
            {hasMoreSchedules && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <PlusCircle className="h-4 w-4 text-blue-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Este aluno tem horários adicionais.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusVariant =
        status === 'active'
          ? 'default'
          : status === 'pending'
          ? 'secondary'
          : 'destructive';
      
      const statusText =
        status === 'active' ? 'Ativo' : status === 'pending' ? 'Pendente' : 'Inativo';

      return <Badge variant={statusVariant} className={cn(
        status === 'active' && 'bg-green-500/20 text-green-700 hover:bg-green-500/30',
        status === 'pending' && 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30',
        status === 'inactive' && 'bg-red-500/20 text-red-700 hover:bg-red-500/30',
        'border-none'
      )}>{statusText}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const student = row.original;
      const removeStudent = useMaestroStore(state => state.removeStudent);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.email)}
            >
              Copiar email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <StudentForm student={student} />
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            <DropdownMenuItem 
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() => removeStudent(student.id)}
            >
              Excluir Aluno
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
