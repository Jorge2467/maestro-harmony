import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const curriculumData = {
  "Piano": {
    "Iniciante": {
      objetivos: ["Postura correta", "Leitura de notas básicas", "Escalas maiores simples"],
      repertorio: ["Minuet in G - Bach", "Ode to Joy - Beethoven"],
      exercicios: ["Hanon #1-5", "Czerny Op. 599"],
    },
    "Intermediário": {
      objetivos: ["Escalas maiores e menores", "Inversões de acordes", "Leitura à primeira vista"],
      repertorio: ["Für Elise - Beethoven", "Sonatina in C Major - Clementi"],
      exercicios: ["Hanon #6-20", "Escalas de Arpejos"],
    },
    "Avançado": {
      objetivos: ["Técnica de virtuose", "Interpretação complexa", "Harmonia avançada"],
      repertorio: ["Clair de Lune - Debussy", "Sonata ao Luar - Beethoven"],
      exercicios: ["Estudos de Chopin", "Invenções a duas vozes de Bach"],
    },
  },
  "Violino": {
    "Iniciante": {
      objetivos: ["Postura do arco e violino", "Notas nas cordas soltas", "Ritmo básico"],
      repertorio: ["Twinkle, Twinkle, Little Star", "Canções folclóricas simples"],
      exercicios: ["Escalas de uma oitava", "Exercícios de arco"],
    },
    "Intermediário": {
        objetivos: ["Vibrato", "Mudança de posição (3ª)", "Leitura em clave de sol"],
        repertorio: ["Concerto em Lá Menor - Vivaldi", "Humoresque - Dvořák"],
        exercicios: ["Escalas de duas oitavas", "Estudos de Kreutzer"],
      },
    "Avançado": {
        objetivos: ["Técnica de arco avançada", "Duplas cordas", "Interpretação de concertos"],
        repertorio: ["Partitas de Bach", "Concertos de Mendelssohn"],
        exercicios: ["Estudos de Paganini", "Escalas em terças e oitavas"],
      },
  },
  "Violão": {
    "Iniciante": {
        objetivos: ["Acordes básicos (maiores e menores)", "Batidas simples", "Afinação do instrumento"],
        repertorio: ["Asa Branca", "Stand by Me"],
        exercicios: ["Troca de acordes", "Exercícios de digitação"],
      },
  }
};


export default function CurriculumPage() {
  return (
    <div>
      <PageHeader title="Currículos" />
      <div className="space-y-4">
        {Object.entries(curriculumData).map(([instrument, levels]) => (
          <Accordion key={instrument} type="single" collapsible className="w-full bg-card border rounded-lg px-6">
            <AccordionItem value={instrument}>
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                {instrument}
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {Object.entries(levels).map(([level, details]) => (
                        <AccordionItem value={level} key={level} className="border-b-0">
                            <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-md px-4 py-2 text-lg font-medium hover:no-underline">
                                {level}
                            </AccordionTrigger>
                            <AccordionContent className="p-4 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-md mb-2">Objetivos</h4>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {details.objetivos.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-md mb-2">Repertório Sugerido</h4>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {details.repertorio.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-md mb-2">Exercícios Técnicos</h4>
                                     <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {details.exercicios.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
