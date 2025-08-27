
'use client';

import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { InstrumentForm } from '@/components/instrument-form';
import { useMaestroStore } from '@/store/use-maestro-store';

export default function InstrumentsPage() {
  const instruments = useMaestroStore((state) => state.instruments);

  return (
    <div>
      <PageHeader title="Gestão de Instrumentos">
        <InstrumentForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={instruments} />
      </div>
    </div>
  );
}
