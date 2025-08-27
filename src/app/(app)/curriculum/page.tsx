import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const curriculumData = {
  "Piano": {
    "Iniciante": {
      objetivos: ["Postura correta e posicionamento das mãos", "Conhecimento do teclado e notas musicais", "Leitura básica de partituras", "Exercícios de digitação independente"],
      repertorio: ["Minuet in G - Bach", "Ode to Joy - Beethoven", "Canções folclóricas simples"],
      exercicios: ["Hanon #1-5", "Czerny Op. 599", "Escalas Maiores (C, G, F)"],
    },
    "Intermediário": {
      objetivos: ["Escalas maiores e menores com arpejos", "Inversões de acordes e progressões", "Leitura à primeira vista", "Introdução à pedalização"],
      repertorio: ["Für Elise - Beethoven", "Sonatina in C Major - Clementi", "The Entertainer - Scott Joplin"],
      exercicios: ["Hanon #6-20", "Escalas de Arpejos em duas oitavas", "Estudos de Burgmüller"],
    },
    "Avançado": {
      objetivos: ["Técnica de virtuose e agilidade", "Interpretação e expressão musical", "Harmonia avançada e contraponto", "Análise de repertório complexo"],
      repertorio: ["Clair de Lune - Debussy", "Sonata ao Luar - Beethoven", "Estudos de Chopin"],
      exercicios: ["Estudos de Chopin e Liszt", "Invenções a duas e três vozes de Bach", "Escalas em todas as tonalidades"],
    },
  },
  "Violino": {
    "Iniciante": {
      objetivos: ["Postura correta do arco e violino", "Notas nas cordas soltas e primeira posição", "Ritmo básico e afinação", "Golpes de arco básicos (détaché)"],
      repertorio: ["Twinkle, Twinkle, Little Star (variações Suzuki)", "Canções folclóricas simples", "Peças do método Suzuki Livro 1"],
      exercicios: ["Escalas de uma oitava (Ré Maior, Lá Maior)", "Exercícios de arco em cordas soltas", "Estudos de Schradieck"],
    },
    "Intermediário": {
        objetivos: ["Desenvolvimento do vibrato", "Mudança de posição (3ª e 5ª)", "Leitura em clave de sol e fá", "Golpes de arco avançados (spiccato, martelé)"],
        repertorio: ["Concerto em Lá Menor - Vivaldi", "Humoresque - Dvořák", "Meditação de Thaïs - Massenet"],
        exercicios: ["Escalas e arpejos de duas oitavas", "Estudos de Kreutzer e Fiorillo", "Exercícios de duplas cordas"],
      },
    "Avançado": {
        objetivos: ["Técnica de arco virtuosa", "Duplas cordas e acordes", "Interpretação de grandes concertos", "Performance de música de câmara"],
        repertorio: ["Partitas de Bach para violino solo", "Concertos de Mendelssohn, Bruch, Brahms", "Caprichos de Paganini"],
        exercicios: ["Estudos e Caprichos de Paganini", "Escalas em terças, sextas e oitavas", "Sonatas de Ysaÿe"],
      },
  },
  "Violão": {
    "Iniciante": {
        objetivos: ["Acordes básicos (maiores e menores)", "Batidas e ritmos simples", "Afinação do instrumento", "Leitura de cifras e tablaturas"],
        repertorio: ["Asa Branca - Luiz Gonzaga", "Stand by Me - Ben E. King", "Wonderwall - Oasis"],
        exercicios: ["Troca de acordes (sequências G-C-D)", "Exercícios de digitação cromática", "Padrões de dedilhado simples"],
      },
     "Intermediário": {
        objetivos: ["Pestanas e acordes complexos", "Técnicas de dedilhado e fingerstyle", "Introdução a escalas e improvisação", "Leitura de partituras básicas"],
        repertorio: ["Dust in the Wind - Kansas", "Blackbird - The Beatles", "Estudos de Leo Brouwer"],
        exercicios: ["Escalas pentatônicas e maiores", "Padrões de arpejo complexos", "Exercícios de ligados (hammer-on/pull-off)"],
      },
      "Avançado": {
        objetivos: ["Domínio do fingerstyle e tapping", "Harmonia avançada e arranjo", "Improvisação em diferentes estilos", "Composição e arranjo para violão"],
        repertorio: ["Asturias - Isaac Albéniz", "Peças de Villa-Lobos", "Músicas de violão brasileiro (Baden Powell, Guinga)"],
        exercicios: ["Escalas modais (dórico, mixolídio, etc.)", "Técnicas de violão percussivo", "Estudos de flamenco e jazz"],
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
