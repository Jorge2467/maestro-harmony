
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Book } from "lucide-react"; // Using available icons

interface Metric {
    value: string;
    label: string;
}

interface AiRecommendationCardProps {
    title: string;
    description: string;
    metrics: Metric[];
}

const iconMap: { [key: string]: React.ElementType } = {
    "Otimizar Horários de Aula": Lightbulb,
    "Repositório de Partituras": Book,
}

export function AiRecommendationCard({ title, description, metrics }: AiRecommendationCardProps) {
    const Icon = iconMap[title] || Book;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{title}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex flex-col items-center p-3 rounded-lg bg-muted/50 flex-1">
                            <p className="text-lg font-bold">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button size="sm">Implementar</Button>
                    <Button size="sm" variant="outline">Simular Resultados</Button>
                    <Button size="sm" variant="ghost">Mais Detalhes</Button>
                </div>
            </CardContent>
        </Card>
    );
}
