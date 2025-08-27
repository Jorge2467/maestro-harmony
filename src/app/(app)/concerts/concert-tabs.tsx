'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConcertList } from "./concert-list";
import { ConcertForm } from "./concert-form";
import { ProgramForm } from "./program-form";
import { ParticipantsForm } from "./participants-form";

export function ConcertTabs() {
    return (
        <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="list">Próximos Concertos</TabsTrigger>
                <TabsTrigger value="add">Agendar Concerto</TabsTrigger>
                <TabsTrigger value="program">Programação</TabsTrigger>
                <TabsTrigger value="participants">Participantes</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                <ConcertList />
            </TabsContent>
            <TabsContent value="add">
                <ConcertForm />
            </TabsContent>
            <TabsContent value="program">
                <ProgramForm />
            </TabsContent>
            <TabsContent value="participants">
                <ParticipantsForm />
            </TabsContent>
        </Tabs>
    );
}
