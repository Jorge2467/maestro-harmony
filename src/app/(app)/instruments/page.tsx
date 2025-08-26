import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockInstruments } from '@/lib/mock-data';
import { PlusCircle } from 'lucide-react';

export default function InstrumentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Instrumentos">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Instrumento
        </Button>
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockInstruments} />
      </div>
    </div>
  );
}
