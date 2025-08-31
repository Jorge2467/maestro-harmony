"use server";

import { recommendTeacher, type RecommendTeacherOutput } from "@/ai/flows/ai-student-teacher-matching";
import { z } from "zod";

export type State = {
    type: 'success' | 'error' | null;
    data: RecommendTeacherOutput | null;
    errors: {
        studentGoals?: string[];
        studentLevel?: string[];
        studentProgress?: string[];
        _form?: string[];
    } | null;
};

const RecommendSchema = z.object({
  studentGoals: z.string().min(10, { message: "Por favor, descreva os objetivos com mais detalhes." }),
  studentLevel: z.string().min(3, { message: "Por favor, descreva o nível do aluno." }),
  studentProgress: z.string().min(10, { message: "Por favor, descreva o progresso com mais detalhes." }),
});

export async function getRecommendation(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = RecommendSchema.safeParse({
    studentGoals: formData.get("studentGoals"),
    studentLevel: formData.get("studentLevel"),
    studentProgress: formData.get("studentProgress"),
  });

  if (!validatedFields.success) {
    return {
      type: "error" as const,
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await recommendTeacher(validatedFields.data);
    return {
      type: "success" as const,
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error" as const,
      errors: { _form: ["Ocorreu um erro ao buscar a recomendação. Tente novamente."] },
      data: null,
    };
  }
}
