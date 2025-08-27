
'use client';

import { useState } from 'react';
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
import type { Instrument } from '@/lib/types';
import { PlusCircle, Edit } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { useMaestroStore } from '@/store/use-maestro-store';
import { useToast } from '@/hooks/use-toast';

interface InstrumentFormProps {
  instrument?: Instrument;
}

export function InstrumentForm({ instrument }: InstrumentFormProps) {
  const isEditMode = !!instrument;
  const [open, setOpen] = useState(false);
  const students = useMaestroStore(state => state.students);
  const { addInstrument, updateInstrument } = useMaestroStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const studentIdValue = formData.get('studentId') as string;
    
    const newInstrumentData: Omit<Instrument, 'id'> = {
        type: formData.get('type') as string,
        serialNumber: formData.get('serialNumber') as string,
        status: formData.get('status') as Instrument['status'],
        location: formData.get('location') as string,
        studentId: studentIdValue && studentIdValue !== 'null' ? Number(studentIdValue) : null,
        lastMaintenance: formData.get('lastMaintenance') as string,
    };

    try {
        if (isEditMode) {
            updateInstrument(instrument.id, newInstrumentData);
            toast({ title: 'Sucesso', description: 'Instrumento atualizado com sucesso!' });
        } else {
            addInstrument(newInstrumentData);
            toast({ title: 'Sucesso', description: 'Instrumento adicionado com sucesso!' });
        }
        setOpen(false); // Close the dialog on success
    } catch(error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro ao salvar o instrumento.' });
    }
  };


  const Trigger = isEditMode ? (
    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setOpen(true); }}>
      <Edit className="mr-2 h-4 w-4" />
      Editar Instrumento
    </DropdownMenuItem>
  ) : (
    <Button onClick={() => setOpen(true)}>
      <PlusCircle className="mr-2 h-4 w-4" />
      Adicionar Instrumento
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Instrumento' : 'Adicionar Novo Instrumento'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Altere as informações do instrumento abaixo.' : 'Preencha os detalhes do novo instrumento.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="type">Tipo</Label>
                <Input id="type" name="type" defaultValue={instrument?.type} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="serialNumber">Nº de Série</Label>
                <Input id="serialNumber" name="serialNumber" defaultValue={instrument?.serialNumber} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={instrument?.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Em Uso">Em Uso</SelectItem>
                    <SelectItem value="Em Reparo">Em Reparo</SelectItem>
                    <SelectItem value="Avariado">Avariado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" name="location" defaultValue={instrument?.location} placeholder="Ex: Sala 3, Com aluno..." />
              </div>
              <div className="space-y-1.5">
                  <Label htmlFor="studentId">Associado a</Label>
                  <Select name="studentId" defaultValue={instrument?.studentId?.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">Ninguém</SelectItem>
                      {students.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                              {student.name}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
               <div className="space-y-1.5">
                <Label htmlFor="lastMaintenance">Última Manutenção</Label>
                <Input id="lastMaintenance" name="lastMaintenance" type="date" defaultValue={instrument?.lastMaintenance} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="submit">{isEditMode ? 'Salvar Alterações' : 'Adicionar Instrumento'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
