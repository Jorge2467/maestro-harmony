'use server';

import { db } from '@/lib/firebase';
import { initialStudents, initialTeachers, initialInstruments } from '@/lib/mock-data';
import { collection, writeBatch, doc } from 'firebase/firestore';

export async function seedDatabase() {
  try {
    if (!db) {
      throw new Error("A conexão com o Firebase não está configurada.");
    }
    const batch = writeBatch(db);

    // Seed students
    const studentsCollection = collection(db, 'students');
    initialStudents.forEach((student) => {
      const { id, ...studentData } = student;
      const docRef = doc(studentsCollection);
      batch.set(docRef, studentData);
    });

    // Seed teachers
    const teachersCollection = collection(db, 'teachers');
    initialTeachers.forEach((teacher) => {
      const { id, ...teacherData } = teacher;
      const docRef = doc(teachersCollection);
      batch.set(docRef, teacherData);
    });

    // Seed instruments
    const instrumentsCollection = collection(db, 'instruments');
    initialInstruments.forEach((instrument) => {
      const { id, ...instrumentData } = instrument;
      const docRef = doc(instrumentsCollection);
      batch.set(docRef, instrumentData);
    });

    await batch.commit();

    return {
      type: 'success' as const,
      message: 'Base de dados populada com sucesso!',
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return {
      type: 'error' as const,
      message: `Ocorreu um erro ao popular a base de dados: ${errorMessage}`,
    };
  }
}
