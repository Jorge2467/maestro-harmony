

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
import { useMaestroStore } from '@/store/use-maestro-store';
import { InstrumentForm } from '@/components/instrument-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

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
      const students = useMaestroStore.getState().students;
      const studentId = row.getValue('studentId') as number | null;
      if (!studentId) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      const student = students.find((s) => s.id === studentId);
      return <span>{student?.name || 'Desconhecido'}</span>;
    }
  },
  {
    accessorKey: 'lastMaintenance',
    header: 'Última Manutenção',
    cell: ({ row }) => {
        const dateValue = row.getValue('lastMaintenance');
        if (!dateValue) return 'N/A';
        const date = new Date(dateValue as string);
        // Add timezone offset to prevent date from shifting
        const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
        return <span>{adjustedDate.toLocaleDateString('pt-BR')}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const instrument = row.original;
      const removeInstrument = useMaestroStore(state => state.removeInstrument);
      const { toast } = useToast();

      const handleDelete = () => {
        removeInstrument(instrument.id);
        toast({
          title: "Instrumento Excluído",
          description: "O instrumento foi removido com sucesso.",
        });
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <InstrumentForm instrument={instrument} />
              <DropdownMenuItem>Solicitar Reparo</DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                 <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    Excluir Instrumento
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
              <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isto irá excluir permanentemente o instrumento.
              </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
