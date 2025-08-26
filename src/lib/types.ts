export type Student = {
  id: number;
  name: string;
  email: string;
  instrument: 'Piano' | 'Violino' | 'Violão' | 'Flauta' | 'Violoncelo' | 'Saxofone';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  status: 'active' | 'inactive' | 'pending';
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
  status: 'Disponível' | 'Em Uso' | 'Em Reparo' | 'Indisponível';
  lastMaintenance: string;
};

export type User = {
  name: string;
  email: string;
  role: 'admin' | 'coordinator';
  avatarUrl?: string;
};
