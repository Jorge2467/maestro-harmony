
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
import type { Instrument } from '@/lib/types';
import { cn } from '@/lib/utils';
import { mockStudents } from '@/lib/mock-data';
import { InstrumentForm } from '@/components/instrument-form';

export const columns: ColumnDef<Instrument>[] = [
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'serialNumber',
    header: 'Número de Série',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const statusClass =
        status === 'Disponível'
          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30'
          : status === 'Em Uso'
          ? 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'
          : status === 'Em Reparo'
          ? 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30'
          : 'bg-orange-500/20 text-orange-700 hover:bg-orange-500/30';

      return <Badge variant="secondary" className={cn('border-none', statusClass)}>{status}</Badge>;
    },
  },
   {
    accessorKey: 'location',
    header: 'Localização',
     cell: ({ row }) => {
        const location = row.getValue('location') as string;
        return <span className="text-muted-foreground">{location || 'N/A'}</span>;
    }
  },
  {
    accessorKey: 'studentId',
    header: 'Associado a',
    cell: ({ row }) => {
      const studentId = row.getValue('studentId') as number | null;
      if (!studentId) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      const student = mockStudents.find((s) => s.id === studentId);
      return <span>{student?.name || 'Desconhecido'}</span>;
    }
  },
  {
    accessorKey: 'lastMaintenance',
    header: 'Última Manutenção',
    cell: ({ row }) => {
        const date = new Date(row.getValue('lastMaintenance'))
        return <span>{date.toLocaleDateString('pt-BR')}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const instrument = row.original;

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
            <DropdownMenuItem>Ver Histórico</DropdownMenuItem>
            <DropdownMenuSeparator />
            <InstrumentForm instrument={instrument} />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              Excluir Instrumento
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
