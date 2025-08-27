import { create } from 'zustand';
import type { Student, Teacher, Instrument, CalendarEvent, Document } from '@/lib/types';
import { initialStudents, initialTeachers, initialInstruments, initialEvents, initialDocuments } from '@/lib/mock-data';

interface MaestroState {
    students: Student[];
    teachers: Teacher[];
    instruments: Instrument[];
    events: CalendarEvent[];
    documents: Document[];

    // Student Actions
    addStudent: (student: Omit<Student, 'id'>) => void;
    updateStudent: (id: number, updatedStudent: Partial<Omit<Student, 'id'>>) => void;
    removeStudent: (id: number) => void;
    getActiveStudents: () => Student[];

    // Teacher Actions
    addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
    updateTeacher: (id: number, updatedTeacher: Partial<Omit<Teacher, 'id'>>) => void;
    removeTeacher: (id: number) => void;
    getActiveTeachers: () => Teacher[];

    // Instrument Actions
    addInstrument: (instrument: Omit<Instrument, 'id'>) => void;
    updateInstrument: (id: number, updatedInstrument: Partial<Omit<Instrument, 'id'>>) => void;
    removeInstrument: (id: number) => void;

    // Event Actions
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (id: number, updatedEvent: Partial<Omit<CalendarEvent, 'id'>>) => void;
    removeEvent: (id: number) => void;
    getUpcomingConcerts: () => CalendarEvent[];

    // Document Actions
    addDocument: (document: Omit<Document, 'id'>) => void;
    updateDocument: (id: number, updatedDocument: Partial<Omit<Document, 'id'>>) => void;
    removeDocument: (id: number) => void;
}

export const useMaestroStore = create<MaestroState>((set, get) => ({
    // Initial State
    students: initialStudents,
    teachers: initialTeachers,
    instruments: initialInstruments,
    events: initialEvents,
    documents: initialDocuments,

    // Student Actions
    addStudent: (student) => set(state => ({
        students: [...state.students, { ...student, id: Math.max(0, ...state.students.map(s => s.id)) + 1 }]
    })),
    updateStudent: (id, updatedStudent) => set(state => ({
        students: state.students.map(student =>
            student.id === id ? { ...student, ...updatedStudent } : student
        )
    })),
    removeStudent: (id) => set(state => ({
        students: state.students.filter(student => student.id !== id)
    })),
    getActiveStudents: () => get().students.filter(student => student.status === 'active'),

    // Teacher Actions
    addTeacher: (teacher) => set(state => ({
        teachers: [...state.teachers, { ...teacher, id: Math.max(0, ...state.teachers.map(t => t.id)) + 1 }]
    })),
    updateTeacher: (id, updatedTeacher) => set(state => ({
        teachers: state.teachers.map(teacher =>
            teacher.id === id ? { ...teacher, ...updatedTeacher } : teacher
        )
    })),
    removeTeacher: (id) => set(state => ({
        teachers: state.teachers.filter(teacher => teacher.id !== id)
    })),
    getActiveTeachers: () => get().teachers.filter(teacher => teacher.status === 'active'),

    // Instrument Actions
    addInstrument: (instrument) => set(state => ({
        instruments: [...state.instruments, { ...instrument, id: Math.max(0, ...state.instruments.map(i => i.id)) + 1 }]
    })),
    updateInstrument: (id, updatedInstrument) => set(state => ({
        instruments: state.instruments.map(instrument =>
            instrument.id === id ? { ...instrument, ...updatedInstrument } : instrument
        )
    })),
    removeInstrument: (id) => set(state => ({
        instruments: state.instruments.filter(instrument => instrument.id !== id)
    })),

    // Event Actions
    addEvent: (event) => set(state => ({
        events: [...state.events, { ...event, date: new Date(event.date), id: Math.max(0, ...state.events.map(e => e.id)) + 1 }]
    })),
    updateEvent: (id, updatedEvent) => set(state => ({
        events: state.events.map(event =>
            event.id === id ? { ...event, ...updatedEvent, date: updatedEvent.date ? new Date(updatedEvent.date) : event.date } : event
        )
    })),
    removeEvent: (id) => set(state => ({
        events: state.events.filter(event => event.id !== id)
    })),
    getUpcomingConcerts: () => get().events.filter(event => event.type === 'Concerto' && event.status === 'Próxima'),

    // Document Actions
    addDocument: (document) => set(state => ({
        documents: [...state.documents, { ...document, id: Math.max(0, ...state.documents.map(d => d.id)) + 1 }]
    })),
    updateDocument: (id, updatedDocument) => set(state => ({
        documents: state.documents.map(doc =>
            doc.id === id ? { ...doc, ...updatedDocument } : doc
        )
    })),
    removeDocument: (id) => set(state => ({
        documents: state.documents.filter(doc => doc.id !== id)
    }))
}));
