'use client';

import { useMaestroStore } from '@/store/use-maestro-store';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}

const eventStatusColors: { [key: string]: string } = {
    Próxima: 'bg-blue-500/20 text-blue-700',
    Realizada: 'bg-green-500/20 text-green-700',
    Cancelada: 'bg-red-500/20 text-red-700',
};

export default function AuditionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const audition = useMaestroStore((state) =>
    state.events.find((e) => e.id === Number(id))
  );

  if (!audition) {
    return (
        <div className="flex h-full items-center justify-center">
            <p>Audição não encontrada.</p>
        </div>
    );
  }

  return (
    <div>
      <PageHeader title="Detalhes da Audição" >
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl">{audition.title}</CardTitle>
                    <CardDescription>{audition.type}</CardDescription>
                </div>
                <Badge variant="secondary" className={cn('border-none text-sm', eventStatusColors[audition.status ?? ''])}>
                    {audition.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <DetailItem icon={Calendar} label="Data" value={format(new Date(audition.date), 'dd/MM/yyyy')} />
                <DetailItem icon={Clock} label="Hora" value={audition.time} />
                <DetailItem icon={MapPin} label="Local" value={audition.location} />
                {audition.participants && <DetailItem icon={Users} label="Participantes" value={audition.participants.length} />}
            </div>
            <div className="space-y-4">
                <DetailItem icon={Info} label="Descrição" value={audition.description} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
