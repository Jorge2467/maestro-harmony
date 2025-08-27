
import { EventCard } from "@/components/event-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CalendarEvent } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ConcertListProps {
    concerts: CalendarEvent[];
}

const eventStatusColors: { [key: string]: string } = {
    Próxima: 'bg-blue-500/20 text-blue-700',
    Realizada: 'bg-green-500/20 text-green-700',
    Cancelada: 'bg-red-500/20 text-red-700',
  };

export function ConcertList({ concerts }: ConcertListProps) {
    return (
        <div className="space-y-8 mt-4">
            {concerts.filter(c => c.status === 'Próxima').slice(0, 2).map(concert => (
                <EventCard key={concert.id} event={concert} />
            ))}
            
            <Card>
                <CardHeader>
                    <CardTitle>Todos os Concertos</CardTitle>
                    <CardDescription>Lista completa de concertos agendados e passados.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Evento</TableHead>
                                <TableHead>Local</TableHead>
                                <TableHead>Participantes</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {concerts.map(concert => (
                                <TableRow key={concert.id}>
                                    <TableCell>{format(concert.date, 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>{concert.title}</TableCell>
                                    <TableCell>{concert.location}</TableCell>
                                    <TableCell>{concert.participants?.length || 0}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={cn('border-none', eventStatusColors[concert.status ?? ''])}>
                                            {concert.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                                <DropdownMenuItem>Programação</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
