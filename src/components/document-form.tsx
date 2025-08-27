
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Document } from '@/lib/types';
import { Upload, Edit } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';

interface DocumentFormProps {
  document?: Document;
}

export function DocumentForm({ document }: DocumentFormProps) {
  const isEditMode = !!document;

  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Edit className="mr-2 h-4 w-4" />
      Editar
    </DropdownMenuItem>
  ) : (
    <Button>
      <Upload className="mr-2 h-4 w-4" />
      Carregar Documento
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Documento' : 'Carregar Novo Documento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do documento abaixo.' : 'Preencha os detalhes do novo documento.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input id="title" defaultValue={document?.title} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="type">Tipo de Documento</Label>
            <Select defaultValue={document?.type}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Partitura">Partitura</SelectItem>
                <SelectItem value="Regulamento">Regulamento</SelectItem>
                <SelectItem value="Comunicado">Comunicado</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="file">Arquivo</Label>
            <Input id="file" type="file" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Carregar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
