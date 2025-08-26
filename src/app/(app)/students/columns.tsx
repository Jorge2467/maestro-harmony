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
import type { Student } from '@/lib/types';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
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
            <DropdownMenuItem>Editar Aluno</DropdownMenuItem>
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              Excluir Aluno
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
