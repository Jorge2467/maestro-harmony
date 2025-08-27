'use server';

import { z } from 'zod';
import { analyzeCurriculumDocument } from '@/ai/flows/analyze-curriculum-document';

const CurriculumAnalysisSchema = z.object({
  instrument: z.string().min(1, { message: 'Selecione um instrumento.' }),
  level: z.string().min(1, { message: 'Selecione um nível.' }),
  document: z.instanceof(File).refine(file => file.size > 0, 'Selecione um documento.'),
});

export async function getCurriculumAnalysis(prevState: any, formData: FormData) {
    const validatedFields = CurriculumAnalysisSchema.safeParse({
        instrument: formData.get('instrument'),
        level: formData.get('level'),
        document: formData.get('document'),
    });

    if (!validatedFields.success) {
        return {
        type: 'error' as const,
        errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { instrument, level, document } = validatedFields.data;

    try {
        const arrayBuffer = await document.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const documentDataUri = `data:${document.type};base64,${buffer.toString('base64')}`;

        const result = await analyzeCurriculumDocument({
            instrument,
            level,
            documentDataUri,
        });

        return {
            type: 'success' as const,
            data: result,
        };
    } catch (error) {
        console.error(error);
        return {
            type: 'error' as const,
            errors: { _form: ['Ocorreu um erro ao analisar o documento. Tente novamente.'] },
        };
    }
}
