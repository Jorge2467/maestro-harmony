import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockTeachers } from '@/lib/mock-data';
import { TeacherForm } from '@/components/teacher-form';

export default function TeachersPage() {
  return (
    <div>
      <PageHeader title="Gestão de Professores">
        <TeacherForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockTeachers} />
      </div>
    </div>
  );
}
