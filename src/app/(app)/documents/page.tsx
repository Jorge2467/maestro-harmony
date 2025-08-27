import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockDocuments } from '@/lib/mock-data';
import { DocumentForm } from '@/components/document-form';

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Documentos">
        <DocumentForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockDocuments} />
      </div>
    </div>
  );
}
