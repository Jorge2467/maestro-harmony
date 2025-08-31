
import { create } from 'zustand';
import type { Student, Teacher, Instrument, CalendarEvent, Document, Evaluation, User } from '@/lib/types';
import { initialEvents, initialDocuments, initialStudents, initialTeachers, initialInstruments } from '@/lib/mock-data';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch, getDoc } from 'firebase/firestore';

interface MaestroState {
    students: Student[];
    teachers: Teacher[];
    instruments: Instrument[];
    events: CalendarEvent[];
    documents: Document[];
    evaluations: Evaluation[];
    loading: boolean;
    currentUser: User | null;

    fetchCurrentUser: (uid: string) => Promise<void>;
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
    updateEvent: (id: string | number, updatedEvent: Partial<Omit<CalendarEvent, 'id'>>) => void;
    removeEvent: (id: string | number) => void;
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
    students: initialStudents,
    teachers: initialTeachers,
    instruments: initialInstruments,
    events: initialEvents,
    documents: initialDocuments,
    evaluations: [],
    loading: false,
    currentUser: null,

    fetchCurrentUser: async (uid) => {
        if (!db) {
            console.log("DEMO MODE: Setting mock user");
            set({ currentUser: { uid: 'mock-user-id', name: 'Coordenador Demo', email: 'coordenador@demo.com', role: 'coordinator', photoURL: `https://i.pravatar.cc/40?u=coord` } });
            return;
        };
        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                const currentUser: User = {
                    uid: uid,
                    name: data.name || null,
                    email: data.email || null,
                    photoURL: data.photoURL,
                    role: data.role || 'coordinator',
                    phone: data.phone,
                };
                set({ currentUser });
            } else {
                console.warn(`User document not found for uid: ${uid}`);
                // In a real app, you might want to create a default user document here
                // For now, we can set a basic user object for the session
                set({ currentUser: { uid, name: 'New User', email: null, role: 'coordinator' } });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },

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
        if (db) {
            const docRef = await addDoc(collection(db, 'students'), student);
            set(state => ({ students: [...state.students, { id: docRef.id, ...student }] }));
        } else {
            console.log("DEMO MODE: Adding student locally");
            const newStudent = { ...student, id: Date.now().toString() };
            set(state => ({ students: [...state.students, newStudent] }));
        }
    },
    updateStudent: async (id, updatedStudent) => {
        if (db) {
            const studentDoc = doc(db, 'students', id);
            await updateDoc(studentDoc, updatedStudent);
        } else {
            console.log(`DEMO MODE: Updating student ${id} locally`);
        }
        set(state => ({
            students: state.students.map(s => String(s.id) === String(id) ? { ...s, ...updatedStudent } : s)
        }));
    },
    removeStudent: async (id) => {
        if (db) {
            await deleteDoc(doc(db, 'students', id));
        } else {
            console.log(`DEMO MODE: Removing student ${id} locally`);
        }
        set(state => ({ students: state.students.filter(s => String(s.id) !== String(id)) }));
    },
    getActiveStudents: () => get().students.filter(student => student.status === 'active'),

    // Teacher Actions
    addTeacher: async (teacher) => {
        if (db) {
            const docRef = await addDoc(collection(db, 'teachers'), teacher);
            set(state => ({ teachers: [...state.teachers, { id: docRef.id, ...teacher }] }));
        } else {
            console.log("DEMO MODE: Adding teacher locally");
            const newTeacher = { ...teacher, id: Date.now().toString() };
            set(state => ({ teachers: [...state.teachers, newTeacher] }));
        }
    },
    updateTeacher: async (id, updatedTeacher) => {
        if (db) {
            const teacherDoc = doc(db, 'teachers', id);
            await updateDoc(teacherDoc, updatedTeacher);
        } else {
            console.log(`DEMO MODE: Updating teacher ${id} locally`);
        }
        set(state => ({
            teachers: state.teachers.map(t => String(t.id) === String(id) ? { ...t, ...updatedTeacher } : t)
        }));
    },
    removeTeacher: async (id) => {
        if (db) {
            await deleteDoc(doc(db, 'teachers', id));
        } else {
            console.log(`DEMO MODE: Removing teacher ${id} locally`);
        }
        set(state => ({ teachers: state.teachers.filter(t => String(t.id) !== String(id)) }));
    },
    getActiveTeachers: () => get().teachers.filter(teacher => teacher.status === 'active'),

    // Instrument Actions
    addInstrument: async (instrument) => {
        if (db) {
            const docRef = await addDoc(collection(db, 'instruments'), instrument);
            set(state => ({ instruments: [...state.instruments, { id: docRef.id, ...instrument }] }));
        } else {
            console.log("DEMO MODE: Adding instrument locally");
            const newInstrument = { ...instrument, id: Date.now().toString() };
            set(state => ({ instruments: [...state.instruments, newInstrument] }));
        }
    },
    updateInstrument: async (id, updatedInstrument) => {
        if (db) {
            const instrumentDoc = doc(db, 'instruments', id);
            await updateDoc(instrumentDoc, updatedInstrument);
        } else {
            console.log(`DEMO MODE: Updating instrument ${id} locally`);
        }
        set(state => ({
            instruments: state.instruments.map(i => String(i.id) === String(id) ? { ...i, ...updatedInstrument } : i)
        }));
    },
    removeInstrument: async (id) => {
        if (db) {
            await deleteDoc(doc(db, 'instruments', id));
        } else {
            console.log(`DEMO MODE: Removing instrument ${id} locally`);
        }
        set(state => ({ instruments: state.instruments.filter(i => String(i.id) !== String(id)) }));
    },
    
    // Mock Actions (mantidos para não quebrar a UI existente)
    addEvent: (event) => set(state => ({ events: [...state.events, { ...event, date: new Date(event.date), id: Date.now().toString() }] })),
    updateEvent: (id, updatedEvent) => set(state => ({ events: state.events.map(event => String(event.id) === String(id) ? { ...event, ...updatedEvent, date: updatedEvent.date ? new Date(updatedEvent.date) : event.date } : event) })),
    removeEvent: (id) => set(state => ({ events: state.events.filter(event => String(event.id) !== String(id)) })),
    getUpcomingConcerts: () => get().events.filter(event => event.type === 'Concerto' && event.status === 'Próxima'),
    addDocument: (document) => set(state => ({ documents: [...state.documents, { ...document, id: Math.max(0, ...state.documents.map(d => d.id)) + 1 }] })),
    updateDocument: (id, updatedDocument) => set(state => ({ documents: state.documents.map(doc => doc.id === id ? { ...doc, ...updatedDocument } : doc) })),
    removeDocument: (id) => set(state => ({ documents: state.documents.filter(doc => doc.id !== id) })),
    addEvaluation: (evaluation) => set(state => ({ evaluations: [...state.evaluations, { ...evaluation, id: Math.max(0, ...state.evaluations.map(e => e.id)) + 1 }] })),
}));
