import { PageHeader } from '@/components/page-header';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { mockInstruments } from '@/lib/mock-data';
import { InstrumentForm } from '@/components/instrument-form';

export default function InstrumentsPage() {
  return (
    <div>
      <PageHeader title="Gestão de Instrumentos">
        <InstrumentForm />
      </PageHeader>
      <div className="bg-card p-4 rounded-lg border">
         <DataTable columns={columns} data={mockInstruments} />
      </div>
    </div>
  );
}
