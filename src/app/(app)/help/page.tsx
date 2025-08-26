import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, LifeBuoy } from "lucide-react";

const faqData = [
  {
    question: "Como adiciono um novo aluno?",
    answer: "Para adicionar um novo aluno, vá para a seção 'Gestão de Alunos' e clique no botão 'Adicionar Aluno'. Preencha os detalhes necessários no formulário e salve.",
  },
  {
    question: "Onde posso ver o calendário de eventos?",
    answer: "O calendário completo com todos os eventos, como audições, concertos e masterclasses, está disponível na seção 'Calendário' no menu principal.",
  },
  {
    question: "Como solicito a manutenção de um instrumento?",
    answer: "Na página 'Gestão de Instrumentos', encontre o instrumento desejado na lista e use o menu de ações para selecionar 'Solicitar Reparo'. Siga as instruções para completar a solicitação.",
  },
  {
    question: "A recomendação de IA leva em conta o quê?",
    answer: "A IA analisa as metas do aluno, seu nível atual e o progresso recente para sugerir o professor mais compatível e um plano de estudos personalizado, visando otimizar a jornada de aprendizado.",
  },
];

export default function HelpPage() {
  return (
    <div>
      <PageHeader title="Ajuda & Suporte" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <LifeBuoy className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Perguntas Frequentes (FAQ)</CardTitle>
                  <CardDescription>Encontre respostas rápidas para as dúvidas mais comuns.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Precisa de mais ajuda?</CardTitle>
              <CardDescription>Entre em contato com nossa equipe de suporte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <Mail className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a href="mailto:suporte@maestroharmony.com" className="text-sm text-primary hover:underline">
                    suporte@maestroharmony.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg border">
                <Phone className="w-6 h-6 text-muted-foreground" />
                <div>
                  <h4 className="font-semibold">Telefone</h4>
                  <p className="text-sm text-muted-foreground">(11) 4002-8922</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
