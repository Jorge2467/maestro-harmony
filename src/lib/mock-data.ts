
import type { Student, Teacher, Instrument, CalendarEvent, Document } from '@/lib/types';

export const initialStudents: Student[] = [
  { id: 1, name: "Ana Silva", email: "ana.silva@example.com", instrument: "Piano", level: "Intermediário", status: "active", course: "Curso Básico (Articulado)", schedule: { instrumento: "Seg, Qua 16:00-17:00", classeDeConjunto: "Sex 18:00-19:30", formacaoMusical: "Ter 15:00-16:00" } },
  { id: 2, name: "Carlos Oliveira", email: "carlos.o@example.com", instrument: "Violino", level: "Avançado", status: "active", course: "Curso Secundário (Articulado)", schedule: { instrumento: "Ter, Qui 17:00-18:30", classeDeConjunto: "Sex 18:00-19:30", formacaoMusical: "Qua 18:00-19:00" } },
  { id: 3, name: "Mariana Costa", email: "mari.costa@example.com", instrument: "Flauta", level: "Iniciante", status: "pending", course: "Iniciação (3-5 anos)", schedule: { instrumento: "Sáb 10:00-11:00" } },
  { id: 4, name: "João Pereira", email: "joao.pereira@example.com", instrument: "Guitarra", level: "Intermediário", status: "active", course: "Curso Livre", schedule: { instrumento: "Sex 19:00-20:30" } },
  { id: 5, name: "Beatriz Lima", email: "bia.lima@example.com", instrument: "Violoncelo", level: "Avançado", status: "active", course: "Curso Secundário (Supletivo)", schedule: { instrumento: "Seg, Qua 18:00-19:00", classeDeConjunto: "Sex 18:00-19:30", formacaoMusical: "Qui 18:00-19:00" } },
  { id: 6, name: "Lucas Souza", email: "lucas.souza@example.com", instrument: "Saxofone", level: "Iniciante", status: "inactive", course: "Curso Básico (Supletivo)" },
  { id: 7, name: "Sofia Rodrigues", email: "sofia.r@example.com", instrument: "Piano", level: "Avançado", status: "active", course: "Curso Secundário (Articulado)", schedule: { instrumento: "Ter, Qui 15:00-16:30", classeDeConjunto: "Sex 18:00-19:30", formacaoMusical: "Qua 17:00-18:00", outrasDisciplinas: "Música de Câmara: Seg 19:00-20:00" } },
  { id: 8, name: "Gabriel Alves", email: "gabriel.alves@example.com", instrument: "Violino", level: "Iniciante", status: "pending", course: "Música para Bebés (0-36m)" },
];

export const initialTeachers: Teacher[] = [
    { 
      id: 1, name: 'Marcos Vinicius', instruments: ['Piano', 'Teclado'], availability: 'Manhãs', status: 'active', email: 'marcos.v@example.com',
      charge: 'Chefe de Departamento de Teclas',
      schedule: {
        "Segunda": "09:00 - 13:00", "Terça": "09:00 - 13:00", "Quarta": "09:00 - 13:00",
        "Quinta": "N/A", "Sexta": "09:00 - 12:00", "Sábado": "N/A"
      },
      tee: "Acompanhamento de alunos de piano para recitais."
    },
    { 
      id: 2, name: 'Juliana Paes', instruments: ['Violino', 'Viola'], availability: 'Tardes', status: 'active', email: 'juliana.p@example.com',
      charge: 'Professora Titular de Cordas',
      schedule: {
        "Segunda": "14:00 - 18:00", "Terça": "14:00 - 18:00", "Quarta": "N/A",
        "Quinta": "14:00 - 18:00", "Sexta": "14:00 - 17:00", "Sábado": "N/A"
      },
      tee: "Preparação da orquestra de cordas júnior."
    },
    { 
      id: 3, name: 'Ricardo Gomes', instruments: ['Violão', 'Guitarra'], availability: 'Noites', status: 'inactive', email: 'ricardo.g@example.com',
      charge: 'Professor Assistente',
      schedule: {
        "Segunda": "18:00 - 21:00", "Terça": "18:00 - 21:00", "Quarta": "18:00 - 21:00",
        "Quinta": "18:00 - 21:00", "Sexta": "N/A", "Sábado": "N/A"
      },
      tee: ""
    },
    { 
      id: 4, name: 'Clara Nunes', instruments: ['Flauta', 'Clarinete'], availability: 'Manhãs e Tardes', status: 'active', email: 'clara.n@example.com',
      charge: 'Professora de Sopros',
      schedule: {
        "Segunda": "N/A", "Terça": "10:00 - 16:00", "Quarta": "10:00 - 16:00",
        "Quinta": "10:00 - 16:00", "Sexta": "N/A", "Sábado": "10:00 - 13:00"
      },
      tee: "Coordenação do quinteto de sopros."
    },
    { 
      id: 5, name: 'Fábio Rocha', instruments: ['Violoncelo'], availability: 'Tardes', status: 'active', email: 'fabio.r@example.com',
      charge: 'Professor Substituto',
      schedule: {
        "Segunda": "15:00 - 19:00", "Terça": "N/A", "Quarta": "15:00 - 19:00",
        "Quinta": "15:00 - 19:00", "Sexta": "15:00 - 19:00", "Sábado": "N/A"
      },
      tee: ""
    },
];

export const initialInstruments: Instrument[] = [
    { id: 1, type: 'Piano de Cauda', serialNumber: 'YMH-12345', status: 'Disponível', lastMaintenance: '2023-10-15', studentId: null, location: 'Sala de Concertos' },
    { id: 2, type: 'Violino Stradivarius', serialNumber: 'STR-67890', status: 'Em Uso', lastMaintenance: '2024-01-20', studentId: 2, location: 'Com aluno' },
    { id: 3, type: 'Violão Clássico', serialNumber: 'GIB-11223', status: 'Em Reparo', lastMaintenance: '2023-11-05', studentId: null, location: 'Luthieria' },
    { id: 4, type: 'Flauta Transversal', serialNumber: 'FLT-44556', status: 'Disponível', lastMaintenance: '2024-02-10', studentId: null, location: 'Armazém 1' },
    { id: 5, type: 'Violoncelo', serialNumber: 'VCL-77889', status: 'Em Uso', lastMaintenance: '2023-12-30', studentId: 5, location: 'Com aluno' },
    { id: 6, type: 'Saxofone Alto', serialNumber: 'SAX-99001', status: 'Avariado', lastMaintenance: '2024-03-01', studentId: null, location: 'Armazém 1' },
];

export const mockActivities = [
    { icon: "CheckCircle", title: "Avaliação concluída", description: "Ana Silva completou sua avaliação de piano", time: "Há 2 horas" },
    { icon: "Wrench", title: "Solicitação de reparo", description: "Violino #12 enviado para manutenção", time: "Há 5 horas" },
    { icon: "CalendarPlus", title: "Novo evento agendado", description: "Masterclass de piano com João Carlos", time: "Há 1 dia" },
    { icon: "UserPlus", title: "Novo aluno", description: "Pedro Santos matriculado em violoncelo", time: "Há 2 dias" },
];

export const initialEvents: CalendarEvent[] = [
    { id: 1, date: new Date(), title: 'Audição de Piano', description: 'Audições semestrais para alunos de piano.', type: 'Audição', time: '14:00 - 17:00', location: 'Auditório Principal', status: 'Próxima', participants: initialStudents.filter(s => s.instrument === 'Piano').slice(0,4) },
    { id: 2, date: new Date(), title: 'Reunião de Professores', description: 'Reunião mensal de alinhamento.', type: 'Reunião', time: '10:00 - 11:00', location: 'Sala de Reuniões', status: 'Próxima' },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Concerto de Cordas', description: 'Apresentação da orquestra de cordas.', type: 'Concerto', time: '19:00', location: 'Teatro Municipal', status: 'Próxima' },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 12)), title: 'Masterclass de Violino', description: 'com Maestro Itzhak Perlman.', type: 'Masterclass', time: '15:00', location: 'Sala de Concertos', status: 'Próxima' },
    { id: 5, date: new Date(new Date().setDate(new Date().getDate() - 3)), title: 'Concerto de Gala', description: 'Apresentação anual de gala.', type: 'Concerto', time: '20:00', location: 'Teatro Municipal', status: 'Realizada' },
    { id: 6, date: new Date(new Date().setDate(new Date().getDate() + 25)), title: 'Concerto de Música de Câmara', description: 'Obras de Mozart e Beethoven.', type: 'Concerto', time: '20:00', location: 'Sala de Concertos', status: 'Próxima' },
    { id: 7, date: new Date(new Date().setDate(new Date().getDate() + 40)), title: 'Audição de Sopros', description: 'Audição para alunos de flauta e clarinete.', type: 'Audição', time: '16:00', location: 'Auditório Principal', status: 'Próxima', participants: initialStudents.filter(s => s.instrument === 'Flauta') }

];

export const initialDocuments: Document[] = [
    { id: 1, title: "Regulamento Interno 2024", type: "Regulamento", uploadDate: "2024-01-15", fileUrl: "#" },
    { id: 2, title: "Partitura: Sinfonia No. 5 - Beethoven", type: "Partitura", uploadDate: "2024-02-20", fileUrl: "#" },
    { id: 3, title: "Comunicado: Feriado de Carnaval", type: "Comunicado", uploadDate: "2024-02-05", fileUrl: "#" },
    { id: 4, title: "Partitura: Ária na corda Sol - Bach", type: "Partitura", uploadDate: "2024-03-10", fileUrl: "#" },
    { id: 5, title: "Atestado de Matrícula - Modelo", type: "Outro", uploadDate: "2024-01-20", fileUrl: "#" },
];


export const studentDistributionData = [
  { name: 'Piano', value: 42, fill: 'var(--color-chart-1)' },
  { name: 'Violino', value: 28, fill: 'var(--color-chart-2)' },
  { name: 'Violão', value: 35, fill: 'var(--color-chart-3)' },
  { name: 'Flauta', value: 18, fill: 'var(--color-chart-4)' },
  { name: 'Violoncelo', value: 12, fill: 'var(--color-chart-5)' },
  { name: 'Saxofone', value: 7, fill: 'var(--color-chart-1)' },
];

export const instrumentStatusData = [
  { name: 'Disponíveis', value: 65, fill: 'var(--color-chart-2)' },
  { name: 'Em Uso', value: 45, fill: 'var(--color-chart-1)' },
  { name: 'Em Reparo', value: 7, fill: 'var(--color-chart-3)' },
  { name: 'Indisponíveis', value: 3, fill: 'var(--color-chart-4)' },
];

export const studentEvolutionData = [
  { month: 'Jan', students: 85 },
  { month: 'Fev', students: 92 },
  { month: 'Mar', students: 105 },
  { month: 'Abr', students: 118 },
  { month: 'Mai', students: 125 },
  { month: 'Jun', students: 138 },
  { month: 'Jul', students: 142 },
];

export const levelDistributionData = [
  { instrument: 'Piano', Iniciante: 10, Intermediário: 20, Avançado: 12 },
  { instrument: 'Violino', Iniciante: 8, Intermediário: 12, Avançado: 8 },
  { instrument: 'Violão', Iniciante: 15, Intermediário: 15, Avançado: 5 },
  { instrument: 'Flauta', Iniciante: 10, Intermediário: 5, Avançado: 3 },
  { instrument: 'Violoncelo', Iniciante: 4, Intermediário: 4, Avançado: 4 },
];
