import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockDocuments } from '@/lib/mock-data';
import { PlusCircle, Upload } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Documentos">
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Carregar Documento
        </Button>
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockDocuments} />
      </div>
    </div>
  );
}
