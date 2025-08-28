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

export default function ConcertDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const concert = useMaestroStore((state) =>
    state.events.find((e) => e.id === Number(id))
  );

  if (!concert) {
    return (
        <div className="flex h-full items-center justify-center">
            <p>Concerto não encontrado.</p>
        </div>
    );
  }

  return (
    <div>
      <PageHeader title="Detalhes do Concerto" >
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl">{concert.title}</CardTitle>
                    <CardDescription>{concert.type}</CardDescription>
                </div>
                <Badge variant="secondary" className={cn('border-none text-sm', eventStatusColors[concert.status ?? ''])}>
                    {concert.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <DetailItem icon={Calendar} label="Data" value={format(new Date(concert.date), 'dd/MM/yyyy')} />
                <DetailItem icon={Clock} label="Hora" value={`${format(new Date(concert.date), 'HH:mm')} - ${concert.endTime ? format(new Date(concert.endTime), 'HH:mm') : ''}`} />
                <DetailItem icon={MapPin} label="Local" value={concert.location} />
                <DetailItem icon={Users} label="Lotação" value={concert.capacity} />
            </div>
            <div className="space-y-4">
                <DetailItem icon={Info} label="Descrição" value={concert.description} />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
