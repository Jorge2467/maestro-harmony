import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockTeachers } from '@/lib/mock-data';
import { PlusCircle } from 'lucide-react';

export default function TeachersPage() {
  return (
    <div>
      <PageHeader title="Gestão de Professores">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Professor
        </Button>
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockTeachers} />
      </div>
    </div>
  );
}
