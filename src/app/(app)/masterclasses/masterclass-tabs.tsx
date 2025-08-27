'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CalendarEvent } from "@/lib/types";
import { MasterclassList } from "./masterclass-list";
import { EventForm } from "@/components/event-form";
import { MasterclassDetailsForm } from "./masterclass-details-form";

interface MasterclassTabsProps {
    masterclasses: CalendarEvent[];
}

export function MasterclassTabs({ masterclasses }: MasterclassTabsProps) {
    return (
        <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list">Próximas Masterclasses</TabsTrigger>
                <TabsTrigger value="add">Agendar Masterclass</TabsTrigger>
                <TabsTrigger value="details">Detalhes do Evento</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                <MasterclassList masterclasses={masterclasses} />
            </TabsContent>
            <TabsContent value="add">
                 <EventForm />
            </TabsContent>
            <TabsContent value="details">
                <MasterclassDetailsForm masterclasses={masterclasses} />
            </TabsContent>
        </Tabs>
    );
}
