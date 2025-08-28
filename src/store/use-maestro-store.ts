
import { create } from 'zustand';
import type { Student, Teacher, Instrument, CalendarEvent, Document, Evaluation } from '@/lib/types';
import { initialEvents, initialDocuments, initialStudents, initialTeachers, initialInstruments } from '@/lib/mock-data';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';

interface MaestroState {
    students: Student[];
    teachers: Teacher[];
    instruments: Instrument[];
    events: CalendarEvent[];
    documents: Document[];
    evaluations: Evaluation[];
    loading: boolean;

    fetchAllData: () => Promise<void>;
    seedDatabase: () => Promise<void>;

    // Student Actions
    addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
    updateStudent: (id: string, updatedStudent: Partial<Omit<Student, 'id'>>) => Promise<void>;
    removeStudent: (id: string) => Promise<void>;
    getActiveStudents: () => Student[];

    // Teacher Actions
    addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<void>;
    updateTeacher: (id: string, updatedTeacher: Partial<Omit<Teacher, 'id'>>) => Promise<void>;
    removeTeacher: (id: string) => Promise<void>;
    getActiveTeachers: () => Teacher[];

    // Instrument Actions
    addInstrument: (instrument: Omit<Instrument, 'id'>) => Promise<void>;
    updateInstrument: (id: string, updatedInstrument: Partial<Omit<Instrument, 'id'>>) => Promise<void>;
    removeInstrument: (id: string) => Promise<void>;

    // Event Actions (mantendo como mock por enquanto)
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (id: number, updatedEvent: Partial<Omit<CalendarEvent, 'id'>>) => void;
    removeEvent: (id: number) => void;
    getUpcomingConcerts: () => CalendarEvent[];

    // Document Actions (mantendo como mock por enquanto)
    addDocument: (document: Omit<Document, 'id'>) => void;
    updateDocument: (id: number, updatedDocument: Partial<Omit<Document, 'id'>>) => void;
    removeDocument: (id: number) => void;

    // Evaluation Actions (mantendo como mock por enquanto)
    addEvaluation: (evaluation: Omit<Evaluation, 'id'>) => void;
}

const fetchCollection = async <T>(collectionName: string): Promise<T[]> => {
    if (!db) return [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

export const useMaestroStore = create<MaestroState>((set, get) => ({
    // Initial State
    students: [],
    teachers: [],
    instruments: [],
    events: initialEvents,
    documents: initialDocuments,
    evaluations: [],
    loading: true,

    fetchAllData: async () => {
        set({ loading: true });
        try {
            if (!db) {
                console.warn("Firebase not configured, skipping fetch.");
                set({ loading: false });
                return;
            }
            const [students, teachers, instruments] = await Promise.all([
                fetchCollection<Student>('students'),
                fetchCollection<Teacher>('teachers'),
                fetchCollection<Instrument>('instruments'),
            ]);
            set({ students, teachers, instruments, loading: false });
        } catch (error) {
            console.error("Error fetching data from Firestore: ", error);
            set({ loading: false });
        }
    },
    
    seedDatabase: async () => {
        if (!db) throw new Error("A conexão com o Firebase não está configurada.");

        const batch = writeBatch(db);

        const studentsCollection = collection(db, 'students');
        initialStudents.forEach((student) => {
          const { id, ...studentData } = student;
          const docRef = doc(studentsCollection);
          batch.set(docRef, studentData);
        });
    
        const teachersCollection = collection(db, 'teachers');
        initialTeachers.forEach((teacher) => {
          const { id, ...teacherData } = teacher;
          const docRef = doc(teachersCollection);
          batch.set(docRef, teacherData);
        });

        const instrumentsCollection = collection(db, 'instruments');
        initialInstruments.forEach((instrument) => {
          const { id, ...instrumentData } = instrument;
          const docRef = doc(instrumentsCollection);
          batch.set(docRef, instrumentData);
        });
    
        await batch.commit();
        // After seeding, fetch all data again to update the state
        await get().fetchAllData();
    },


    // Student Actions
    addStudent: async (student) => {
        if (!db) return;
        const docRef = await addDoc(collection(db, 'students'), student);
        set(state => ({ students: [...state.students, { id: docRef.id, ...student }] }));
    },
    updateStudent: async (id, updatedStudent) => {
        if (!db) return;
        const studentDoc = doc(db, 'students', id);
        await updateDoc(studentDoc, updatedStudent);
        set(state => ({
            students: state.students.map(s => s.id === id ? { ...s, ...updatedStudent } : s)
        }));
    },
    removeStudent: async (id) => {
        if (!db) return;
        await deleteDoc(doc(db, 'students', id));
        set(state => ({ students: state.students.filter(s => s.id !== id) }));
    },
    getActiveStudents: () => get().students.filter(student => student.status === 'active'),

    // Teacher Actions
    addTeacher: async (teacher) => {
        if (!db) return;
        const docRef = await addDoc(collection(db, 'teachers'), teacher);
        set(state => ({ teachers: [...state.teachers, { id: docRef.id, ...teacher }] }));
    },
    updateTeacher: async (id, updatedTeacher) => {
        if (!db) return;
        const teacherDoc = doc(db, 'teachers', id);
        await updateDoc(teacherDoc, updatedTeacher);
        set(state => ({
            teachers: state.teachers.map(t => t.id === id ? { ...t, ...updatedTeacher } : t)
        }));
    },
    removeTeacher: async (id) => {
        if (!db) return;
        await deleteDoc(doc(db, 'teachers', id));
        set(state => ({ teachers: state.teachers.filter(t => t.id !== id) }));
    },
    getActiveTeachers: () => get().teachers.filter(teacher => teacher.status === 'active'),

    // Instrument Actions
    addInstrument: async (instrument) => {
        if (!db) return;
        const docRef = await addDoc(collection(db, 'instruments'), instrument);
        set(state => ({ instruments: [...state.instruments, { id: docRef.id, ...instrument }] }));
    },
    updateInstrument: async (id, updatedInstrument) => {
        if (!db) return;
        const instrumentDoc = doc(db, 'instruments', id);
        await updateDoc(instrumentDoc, updatedInstrument);
        set(state => ({
            instruments: state.instruments.map(i => i.id === id ? { ...i, ...updatedInstrument } : i)
        }));
    },
    removeInstrument: async (id) => {
        if (!db) return;
        await deleteDoc(doc(db, 'instruments', id));
        set(state => ({ instruments: state.instruments.filter(i => i.id !== id) }));
    },
    
    // Mock Actions (mantidos para não quebrar a UI existente)
    addEvent: (event) => set(state => ({ events: [...state.events, { ...event, date: new Date(event.date), id: Math.max(0, ...state.events.map(e => e.id)) + 1 }] })),
    updateEvent: (id, updatedEvent) => set(state => ({ events: state.events.map(event => event.id === id ? { ...event, ...updatedEvent, date: updatedEvent.date ? new Date(updatedEvent.date) : event.date } : event) })),
    removeEvent: (id) => set(state => ({ events: state.events.filter(event => event.id !== id) })),
    getUpcomingConcerts: () => get().events.filter(event => event.type === 'Concerto' && event.status === 'Próxima'),
    addDocument: (document) => set(state => ({ documents: [...state.documents, { ...document, id: Math.max(0, ...state.documents.map(d => d.id)) + 1 }] })),
    updateDocument: (id, updatedDocument) => set(state => ({ documents: state.documents.map(doc => doc.id === id ? { ...doc, ...updatedDocument } : doc) })),
    removeDocument: (id) => set(state => ({ documents: state.documents.filter(doc => doc.id !== id) })),
    addEvaluation: (evaluation) => set(state => ({ evaluations: [...state.evaluations, { ...evaluation, id: Math.max(0, ...state.evaluations.map(e => e.id)) + 1 }] })),
}));
