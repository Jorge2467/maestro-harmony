'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditionList } from "./audition-list";
import { EventForm } from "@/components/event-form";
import { EvaluatorsForm } from "./evaluators-form";
import { RequirementsForm } from "./requirements-form";

export function AuditionTabs() {
    return (
        <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="list">Próximas Audições</TabsTrigger>
                <TabsTrigger value="add">Agendar Audição</TabsTrigger>
                <TabsTrigger value="evaluators">Avaliadores</TabsTrigger>
                <TabsTrigger value="requirements">Requisitos</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
                <AuditionList />
            </TabsContent>
            <TabsContent value="add">
                 <EventForm />
            </TabsContent>
            <TabsContent value="evaluators">
                <EvaluatorsForm />
            </TabsContent>
            <TabsContent value="requirements">
                <RequirementsForm />
            </TabsContent>
        </Tabs>
    );
}
