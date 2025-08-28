'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConcertList } from "./concert-list";
import { ConcertForm } from "./concert-form";
import { ProgramForm } from "./program-form";
import { ParticipantsForm } from "./participants-form";

export function ConcertTabs() {
    const [activeTab, setActiveTab] = useState("list");
    const [selectedConcertId, setSelectedConcertId] = useState<number | null>(null);

    const handleSelectProgram = (concertId: number) => {
        setSelectedConcertId(concertId);
        setActiveTab("program");
    }

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="list">Próximos Concertos</TabsTrigger>
                <TabsTrigger value="add">Agendar Concerto</TabsTrigger>
                <TabsTrigger value="program">Programação</TabsTrigger>
                <TabsTrigger value="participants">Participantes</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                <ConcertList onSelectProgram={handleSelectProgram} />
            </TabsContent>
            <TabsContent value="add">
                <ConcertForm />
            </TabsContent>
            <TabsContent value="program">
                <ProgramForm concertId={selectedConcertId} />
            </TabsContent>
            <TabsContent value="participants">
                <ParticipantsForm concertId={selectedConcertId} />
            </TabsContent>
        </Tabs>
    );
}
