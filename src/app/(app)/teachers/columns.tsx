'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
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
import type { Teacher } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TeacherForm } from '@/components/teacher-form';
import { useMaestroStore } from '@/store/use-maestro-store';
import Link from 'next/link';

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'instruments',
    header: 'Instrumentos',
    cell: ({ row }) => {
      const instruments = row.getValue('instruments') as string[];
      return <div className="flex gap-1">{instruments.join(', ')}</div>;
    },
  },
  {
    accessorKey: 'availability',
    header: 'Disponibilidade',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusVariant =
        status === 'active'
          ? 'default'
          : 'destructive';
      
      const statusText = status === 'active' ? 'Ativo' : 'Inativo';

      return <Badge variant={statusVariant} className={cn(
        status === 'active' && 'bg-green-500/20 text-green-700 hover:bg-green-500/30',
        status === 'inactive' && 'bg-red-500/20 text-red-700 hover:bg-red-500/30',
        'border-none'
      )}>{statusText}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const teacher = row.original;
      return <ActionsCell teacher={teacher} />;
    },
  },
];


const ActionsCell = ({ teacher }: { teacher: Teacher }) => {
    const removeTeacher = useMaestroStore(state => state.removeTeacher);

    if (!teacher.id) return null;

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
          <DropdownMenuItem asChild>
            <Link href="/calendar">Ver Calendário</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <TeacherForm teacher={teacher} />
          <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={() => removeTeacher(teacher.id!)}
          >
            Excluir Professor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
