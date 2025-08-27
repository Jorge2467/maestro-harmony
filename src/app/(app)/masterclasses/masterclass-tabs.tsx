'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MasterclassList } from "./masterclass-list";
import { EventForm } from "@/components/event-form";
import { MasterclassDetailsForm } from "./masterclass-details-form";

export function MasterclassTabs() {
    return (
        <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list">Próximas Masterclasses</TabsTrigger>
                <TabsTrigger value="add">Agendar Masterclass</TabsTrigger>
                <TabsTrigger value="details">Detalhes do Evento</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                <MasterclassList />
            </TabsContent>
            <TabsContent value="add">
                 <EventForm />
            </TabsContent>
            <TabsContent value="details">
                <MasterclassDetailsForm />
            </TabsContent>
        </Tabs>
    );
}
