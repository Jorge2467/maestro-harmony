'use client';

import { useMaestroStore } from '@/store/use-maestro-store';
import { useParams, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Clock, User, Book, Music, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

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

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const student = useMaestroStore((state) =>
    state.students.find((s) => s.id === id)
  );

  if (!student) {
    return (
        <div className="flex h-full items-center justify-center">
            <p>Aluno não encontrado.</p>
        </div>
    );
  }

  const statusVariant =
    student.status === 'active'
      ? 'default'
      : student.status === 'pending'
      ? 'secondary'
      : 'destructive';

  const statusText =
    student.status === 'active' ? 'Ativo' : student.status === 'pending' ? 'Pendente' : 'Inativo';

  return (
    <div>
      <PageHeader title="Detalhes do Aluno" >
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center gap-4">
                 <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${student.email}`} alt={student.name} />
                    <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{student.name}</CardTitle>
                    <p className="text-muted-foreground">{student.email}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Badge variant={statusVariant} className={cn(
                    'text-sm',
                    student.status === 'active' && 'bg-green-500/20 text-green-700 hover:bg-green-500/30',
                    student.status === 'pending' && 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30',
                    student.status === 'inactive' && 'bg-red-500/20 text-red-700 hover:bg-red-500/30',
                    'border-none'
                )}>
                    {statusText}
                </Badge>
                <Separator />
                <DetailItem icon={Music} label="Instrumento" value={student.instrument} />
                <DetailItem icon={Award} label="Nível" value={student.level} />
                <DetailItem icon={Book} label="Curso" value={student.course} />
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Horário Semanal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <DetailItem icon={Clock} label="Instrumento" value={student.schedule?.instrumento} />
                <DetailItem icon={Clock} label="Classe de Conjunto" value={student.schedule?.classeDeConjunto} />
                <DetailItem icon={Clock} label="Formação Musical" value={student.schedule?.formacaoMusical} />
                <DetailItem icon={Clock} label="Outras Disciplinas" value={student.schedule?.outrasDisciplinas} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
