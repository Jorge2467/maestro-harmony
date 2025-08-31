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
  uid: string;
  name: string | null;
  email: string | null;
  photoURL?: string;
  role: 'admin' | 'coordinator';
  phone?: string;
};

export type CalendarEvent = {
  id: number | string;
  date: Date;
  title: string;
  description?: string;
  type: 'Concerto' | 'Audição' | 'Masterclass' | 'Reunião';
  time: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  status?: 'Próxima' | 'Realizada' | 'Cancelada';
  participants?: { id: number | string; name: string; type?: string; instrument?: string; piece?: string; }[];
  evaluators?: { id: number | string; name: string }[];
  requirements?: string[];
  guest?: string;
  topic?: string;
  program?: { id: string | number; piece: string; composer: string; performer?: string; duration?: number; }[];
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

    