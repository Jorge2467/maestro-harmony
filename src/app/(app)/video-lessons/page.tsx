
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, PlayCircle } from "lucide-react";
import Image from "next/image";

const videoData = [
  { id: 'intro-piano', title: "Introdução ao Piano - Acordes Básicos", instructor: "Prof. Carlos Oliveira", date: "12/08/2023", duration: "15:30", description: "Aprenda os acordes básicos para iniciantes no piano e as técnicas corretas de posicionamento das mãos.", category: "Piano", thumb: "/images/thumb-piano.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 'tecnica-violino', title: "Técnicas Avançadas de Violino", instructor: "Prof. Maria Santos", date: "05/08/2023", duration: "22:15", description: "Domine as técnicas de vibrato, pizzicato e spiccato para elevar sua performance no violino.", category: "Violino", thumb: "/images/thumb-violin.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 'solo-guitarra', title: "Como Desenvolver Solos de Guitarra Criativos", instructor: "Prof. Ricardo Almeida", date: "28/07/2023", duration: "18:42", description: "Aprenda a criar solos memoráveis usando escalas pentatônicas e técnicas de improvisação.", category: "Guitarra", thumb: "/images/thumb-guitar.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 'tecnica-vocal', title: "Técnica Vocal: Controle de Respiração", instructor: "Prof. Ana Costa", date: "20/07/2023", duration: "25:10", description: "Exercícios práticos para melhorar seu controle de respiração e projeção vocal.", category: "Canto", thumb: "/images/thumb-vocal.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 'harmonia-avancada', title: "Harmonia Avançada: Progressões de Acordes", instructor: "Prof. Carlos Oliveira", date: "15/07/2023", duration: "32:05", description: "Entenda as progressões de acordes mais usadas na música popular e como aplicá-las.", category: "Teoria Musical", thumb: "/images/thumb-theory.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 'flauta-embocadura', title: "Flauta Transversal: Técnicas de Embocadura", instructor: "Prof. Juliana Martins", date: "10/07/2023", duration: "19:30", description: "Aprenda as técnicas corretas de embocadura para produzir um som limpo e consistente.", category: "Flauta", thumb: "/images/thumb-flute.jpg", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

const filters = ["Todos", "Piano", "Violino", "Guitarra", "Flauta", "Canto", "Teoria Musical"];

export default function VideoLessonsPage() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [selectedVideo, setSelectedVideo] = useState<typeof videoData[0] | null>(null);

    const filteredVideos = activeFilter === "Todos"
        ? videoData
        : videoData.filter(video => video.category === activeFilter);

    return (
        <div>
            <PageHeader title="Biblioteca de Videoaulas">
                <Button><PlusCircle className="mr-2" /> Nova Videoaula</Button>
            </PageHeader>

            <Card>
                <CardHeader>
                    <div className="flex flex-wrap gap-2">
                        {filters.map(filter => (
                            <Button 
                                key={filter} 
                                variant={activeFilter === filter ? "default" : "secondary"}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map(video => (
                            <Card key={video.id} className="overflow-hidden group">
                                <CardHeader className="p-0 relative">
                                    <Image 
                                        src={`https://picsum.photos/400/225?random=${video.id}`}
                                        alt={video.title} 
                                        width={400} 
                                        height={225} 
                                        className="w-full h-auto aspect-video object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="secondary" className="rounded-full h-14 w-14" onClick={() => setSelectedVideo(video)}>
                                            <PlayCircle className="h-8 w-8 text-primary" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{video.duration}</div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                                    <CardDescription>{video.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="text-xs text-muted-foreground justify-between">
                                    <span>{video.instructor}</span>
                                    <span>{video.date}</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Dialog open={!!selectedVideo} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0">
                    <DialogHeader className="p-4">
                        <DialogTitle>{selectedVideo?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video">
                        {selectedVideo && (
                             <iframe 
                                width="100%" 
                                height="100%" 
                                src={selectedVideo.videoUrl} 
                                title={selectedVideo.title} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen>
                            </iframe>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
