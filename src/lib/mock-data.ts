
import type { Student, Teacher, Instrument, CalendarEvent } from '@/lib/types';

export const mockStudents: Student[] = [
  { id: 1, name: "Ana Silva", email: "ana.silva@example.com", instrument: "Piano", level: "Intermediário", status: "active" },
  { id: 2, name: "Carlos Oliveira", email: "carlos.o@example.com", instrument: "Violino", level: "Avançado", status: "active" },
  { id: 3, name: "Mariana Costa", email: "mari.costa@example.com", instrument: "Flauta", level: "Iniciante", status: "pending" },
  { id: 4, name: "João Pereira", email: "joao.pereira@example.com", instrument: "Violão", level: "Intermediário", status: "active" },
  { id: 5, name: "Beatriz Lima", email: "bia.lima@example.com", instrument: "Violoncelo", level: "Avançado", status: "active" },
  { id: 6, name: "Lucas Souza", email: "lucas.souza@example.com", instrument: "Saxofone", level: "Iniciante", status: "inactive" },
  { id: 7, name: "Sofia Rodrigues", email: "sofia.r@example.com", instrument: "Piano", level: "Avançado", status: "active" },
  { id: 8, name: "Gabriel Alves", email: "gabriel.alves@example.com", instrument: "Violino", level: "Iniciante", status: "pending" },
];

export const mockTeachers: Teacher[] = [
    { id: 1, name: 'Marcos Vinicius', instruments: ['Piano', 'Teclado'], availability: 'Manhãs', status: 'active' },
    { id: 2, name: 'Juliana Paes', instruments: ['Violino', 'Viola'], availability: 'Tardes', status: 'active' },
    { id: 3, name: 'Ricardo Gomes', instruments: ['Violão', 'Guitarra'], availability: 'Noites', status: 'inactive' },
    { id: 4, name: 'Clara Nunes', instruments: ['Flauta', 'Clarinete'], availability: 'Manhãs e Tardes', status: 'active' },
    { id: 5, name: 'Fábio Rocha', instruments: ['Violoncelo'], availability: 'Tardes', status: 'active' },
];

export const mockInstruments: Instrument[] = [
    { id: 1, type: 'Piano de Cauda', serialNumber: 'YMH-12345', status: 'Disponível', lastMaintenance: '2023-10-15', studentId: null },
    { id: 2, type: 'Violino Stradivarius', serialNumber: 'STR-67890', status: 'Em Uso', lastMaintenance: '2024-01-20', studentId: 2 },
    { id: 3, type: 'Violão Clássico', serialNumber: 'GIB-11223', status: 'Em Reparo', lastMaintenance: '2023-11-05', studentId: null },
    { id: 4, type: 'Flauta Transversal', serialNumber: 'FLT-44556', status: 'Disponível', lastMaintenance: '2024-02-10', studentId: null },
    { id: 5, type: 'Violoncelo', serialNumber: 'VCL-77889', status: 'Em Uso', lastMaintenance: '2023-12-30', studentId: 5 },
    { id: 6, type: 'Saxofone Alto', serialNumber: 'SAX-99001', status: 'Disponível', lastMaintenance: '2024-03-01', studentId: null },
];

export const mockActivities = [
    { icon: "CheckCircle", title: "Avaliação concluída", description: "Ana Silva completou sua avaliação de piano", time: "Há 2 horas" },
    { icon: "Wrench", title: "Solicitação de reparo", description: "Violino #12 enviado para manutenção", time: "Há 5 horas" },
    { icon: "CalendarPlus", title: "Novo evento agendado", description: "Masterclass de piano com João Carlos", time: "Há 1 dia" },
    { icon: "UserPlus", title: "Novo aluno", description: "Pedro Santos matriculado em violoncelo", time: "Há 2 dias" },
];

export const mockEvents: CalendarEvent[] = [
    { id: 1, date: new Date(), title: 'Audição de Piano', description: 'Audições semestrais para alunos de piano.', type: 'Audição', time: '14:00 - 17:00' },
    { id: 2, date: new Date(), title: 'Reunião de Professores', description: 'Reunião mensal de alinhamento.', type: 'Reunião', time: '10:00 - 11:00' },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 5)), title: 'Concerto de Cordas', description: 'Apresentação da orquestra de cordas.', type: 'Concerto', time: '19:00' },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 12)), title: 'Masterclass de Violino', description: 'com Maestro Itzhak Perlman.', type: 'Masterclass', time: '15:00' },
    { id: 5, date: new Date(new Date().setDate(new Date().getDate() - 3)), title: 'Concerto de Gala', description: 'Apresentação anual de gala.', type: 'Concerto', time: '20:00' }
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
