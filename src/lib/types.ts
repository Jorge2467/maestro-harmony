
export type Student = {
  id: number;
  name: string;
  email: string;
  instrument: 'Piano' | 'Violino' | 'Violão' | 'Flauta' | 'Violoncelo' | 'Saxofone';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  status: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
};

export type Teacher = {
  id: number;
  name: string;
  instruments: string[];
  availability: string;
  status: 'active' | 'inactive';
  email?: string; // Optional email
};

export type Instrument = {
  id: number;
  type: string;
  serialNumber: string;
  status: 'Disponível' | 'Em Uso' | 'Em Reparo';
  lastMaintenance: string;
  studentId?: number | null;
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
};

export type Document = {
  id: number;
  title: string;
  type: 'Partitura' | 'Regulamento' | 'Comunicado' | 'Outro';
  uploadDate: string;
  fileUrl: string;
};
