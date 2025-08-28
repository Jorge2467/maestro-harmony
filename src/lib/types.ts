export type Student = {
  id?: string;
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
  id?: string;
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
  id?: string;
  type: string;
  serialNumber: string;
  status: 'Disponível' | 'Em Uso' | 'Em Reparo' | 'Avariado';
  lastMaintenance: string;
  studentId?: string | null | number;
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
  participants?: { id: number | string; name: string }[];
  evaluators?: { id: number | string; name: string }[];
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

export type Evaluation = {
    id: number;
    studentId: number;
    teacherId: number;
    date: string;
    criteria: {
        [key: string]: number;
    };
    finalGrade: number;
    comments: string;
}

    