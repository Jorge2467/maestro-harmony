
'use client';

import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { TeacherForm } from '@/components/teacher-form';
import { useMaestroStore } from '@/store/use-maestro-store';

export default function TeachersPage() {
  const teachers = useMaestroStore((state) => state.teachers);
  
  return (
    <div>
      <PageHeader title="Gestão de Professores">
        <TeacherForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={teachers} />
      </div>
    </div>
  );
}
