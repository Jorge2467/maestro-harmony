export type Student = {
  id: number;
  name: string;
  email: string;
  instrument: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  status: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
  course?: string;
  schedule?: {
    instrumento?: string;
    classeDeConjunto?: string;
    formacaoMusical?: string;
    outrasDisciplinas?: string;
  }
};

export type Teacher = {
  id: number;
  name: string;
  instruments: string[];
  availability: string;
  status: 'active' | 'inactive';
  email?: string;
  charge?: string;
  schedule?: { [key: string]: string };
  tee?: string;
};

export type Instrument = {
  id: number;
  type: string;
  serialNumber: string;
  status: 'Disponível' | 'Em Uso' | 'Em Reparo' | 'Avariado';
  lastMaintenance: string;
  studentId?: number | null;
  location?: string;
};

export type User = {
  name: string;
  email: string;
  role: 'admin' | 'coordinator';
  avatarUrl?: string;
  phone?: string;
};

export type CalendarEvent = {
  id: number;
  date: Date;
  title: string;
  description: string;
  type: 'Concerto' | 'Audição' | 'Masterclass' | 'Reunião';
  time: string;
  location?: string;
  status?: 'Próxima' | 'Realizada' | 'Cancelada';
  participants?: { id: number; name: string }[];
  evaluators?: { id: number; name: string }[];
  requirements?: string[];
  guest?: string;
  topic?: string;
};

export type Document = {
  id: number;
  title: string;
  type: 'Partitura' | 'Regulamento' | 'Comunicado' | 'Outro';
  uploadDate: string;
  fileUrl: string;
};
