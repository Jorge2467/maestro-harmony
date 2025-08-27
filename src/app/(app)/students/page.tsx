import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockStudents } from '@/lib/mock-data';
import { StudentForm } from '@/components/student-form';

export default function StudentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Alunos">
        <StudentForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockStudents} />
      </div>
    </div>
  );
}
