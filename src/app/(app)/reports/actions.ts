
"use server";

import { summarizeStudentPerformance } from "@/ai/flows/summarize-student-performance";
import { z } from "zod";

const SummarySchema = z.object({
  studentName: z.string().min(1, { message: "Selecione um aluno." }),
  instrument: z.string().min(1, { message: "Selecione um instrumento." }),
  performanceDetails: z.string().min(10, { message: "Por favor, descreva o desempenho com mais detalhes." }),
  studentLevel: z.string().min(1, { message: "Selecione um nível." }),
  course: z.string().min(1, { message: "Selecione um curso." }),
});

export async function getSummary(prevState: any, formData: FormData) {
  const validatedFields = SummarySchema.safeParse({
    studentName: formData.get("studentName"),
    instrument: formData.get("instrument"),
    performanceDetails: formData.get("performanceDetails"),
    studentLevel: formData.get("studentLevel"),
    course: formData.get("course"),
  });

  if (!validatedFields.success) {
    return {
      type: "error" as const,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await summarizeStudentPerformance(validatedFields.data);
    return {
      type: "success" as const,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error" as const,
      errors: { _form: ["Ocorreu um erro ao gerar o relatório. Tente novamente."] },
    };
  }
}
