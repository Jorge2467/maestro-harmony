'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, FileText, Download } from 'lucide-react';
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
import type { Document } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { DocumentForm } from '@/components/document-form';
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


export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{row.original.title}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
        const type = row.getValue('type') as string;
        const typeClass = 
            type === 'Partitura' ? 'bg-blue-500/20 text-blue-700' :
            type === 'Regulamento' ? 'bg-yellow-500/20 text-yellow-700' :
            type === 'Comunicado' ? 'bg-purple-500/20 text-purple-700' :
            'bg-muted';
        
        return <Badge variant="secondary" className={cn('border-none', typeClass)}>{type}</Badge>;
    }
  },
  {
    accessorKey: 'uploadDate',
    header: 'Data de Upload',
    cell: ({ row }) => {
        const date = new Date(row.getValue('uploadDate'))
        return <span>{date.toLocaleDateString('pt-BR')}</span>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const document = row.original;

      return (
         <AlertDialog>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={document.fileUrl} target="_blank" download>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DocumentForm document={document} />
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        Excluir
                    </DropdownMenuItem>
                </AlertDialogTrigger>
            </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isto irá excluir permanentemente o documento
                    e remover os seus dados dos nossos servidores.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Excluir</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
