import { EventCard } from "@/components/event-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic } from "lucide-react";
import type { CalendarEvent } from "@/lib/types";

interface AuditionListProps {
    auditions: CalendarEvent[];
}

export function AuditionList({ auditions }: AuditionListProps) {
    return (
        <div className="mt-4">
            {auditions.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {auditions.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
                </div>
            ) : (
                <Card>
                <CardHeader>
                    <CardTitle>Nenhuma Audição Agendada</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
                    <Mic className="w-16 h-16 text-muted-foreground" />
                    <p className="text-muted-foreground">Não há audições agendadas no momento.</p>
                </CardContent>
                </Card>
            )}
        </div>
    );
}
