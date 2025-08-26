import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockStudents } from '@/lib/mock-data';
import { PlusCircle } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Alunos">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Aluno
        </Button>
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockStudents} />
      </div>
    </div>
  );
}
