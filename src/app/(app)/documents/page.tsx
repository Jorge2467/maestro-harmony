
'use client';

import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { DocumentForm } from '@/components/document-form';
import { useMaestroStore } from '@/store/use-maestro-store';

export default function DocumentsPage() {
  const documents = useMaestroStore((state) => state.documents);

  return (
    <div>
      <PageHeader title="Gestão de Documentos">
        <DocumentForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={documents} />
      </div>
    </div>
  );
}
