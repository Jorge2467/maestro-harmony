
'use client';

import { useState } from "react";
import { EventCard } from "@/components/event-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMaestroStore } from "@/store/use-maestro-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConcertForm } from "./concert-form";
import type { CalendarEvent } from "@/lib/types";
import Link from "next/link";

const eventStatusColors: { [key: string]: string } = {
    Próxima: 'bg-blue-500/20 text-blue-700',
    Realizada: 'bg-green-500/20 text-green-700',
    Cancelada: 'bg-red-500/20 text-red-700',
  };

interface ConcertListProps {
    onSelectProgram: (concertId: number) => void;
}

export function ConcertList({ onSelectProgram }: ConcertListProps) {
    const concerts = useMaestroStore(state => state.events.filter(event => event.type === 'Concerto'));
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedConcert, setSelectedConcert] = useState<CalendarEvent | undefined>(undefined);

    const handleEditClick = (concert: CalendarEvent) => {
        setSelectedConcert(concert);
        setIsEditDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsEditDialogOpen(false);
        setSelectedConcert(undefined);
    }

    return (
        <>
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
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/concerts/${concert.id}`}>Ver Detalhes</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditClick(concert)}>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onSelectProgram(concert.id)}>Programação</DropdownMenuItem>
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
            <Dialog open={isEditDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Concerto</DialogTitle>
                    </DialogHeader>
                    <ConcertForm concert={selectedConcert} onFinished={handleDialogClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}
