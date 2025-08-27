'use server';
/**
 * @fileOverview An AI agent that analyzes curriculum documents.
 *
 * - analyzeCurriculumDocument - A function that analyzes a curriculum document and extracts key information.
 * - AnalyzeCurriculumDocumentInput - The input type for the analyzeCurriculumDocument function.
 * - AnalyzeCurriculumDocumentOutput - The return type for the analyzeCurriculumDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCurriculumDocumentInputSchema = z.object({
  documentDataUri: z.string().describe(
    "A curriculum document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  instrument: z.string().describe('The instrument for which to extract the curriculum.'),
  level: z.string().describe('The level for which to extract the curriculum (e.g., Iniciante, Intermediário, Avançado).'),
});
export type AnalyzeCurriculumDocumentInput = z.infer<typeof AnalyzeCurriculumDocumentInputSchema>;

const AnalyzeCurriculumDocumentOutputSchema = z.object({
  objetivos: z.string().describe('The learning objectives extracted from the document.'),
  repertorio: z.string().describe('The suggested repertoire extracted from the document.'),
  exercicios: z.string().describe('The technical exercises extracted from the document.'),
  observacoes: z.string().describe('Any relevant observations or additional notes from the document analysis.'),
});
export type AnalyzeCurriculumDocumentOutput = z.infer<typeof AnalyzeCurriculumDocumentOutputSchema>;

export async function analyzeCurriculumDocument(input: AnalyzeCurriculumDocumentInput): Promise<AnalyzeCurriculumDocumentOutput> {
  return analyzeCurriculumDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCurriculumDocumentPrompt',
  input: {schema: AnalyzeCurriculumDocumentInputSchema},
  output: {schema: AnalyzeCurriculumDocumentOutputSchema},
  prompt: `You are an expert in music education and curriculum design.
  Your task is to analyze the provided document for the specified instrument and level,
  and extract the curriculum information into the following categories: Objetivos, Repertório, and Exercícios Técnicos.

  Document to analyze: {{media url=documentDataUri}}
  Instrument: {{{instrument}}}
  Level: {{{level}}}

  Based on the document, extract the information. For each category, provide a bulleted list.
  If the document does not contain explicit information for a category, state that.
  Finally, provide a brief summary or any important observations in the 'observacoes' field.`,
});

const analyzeCurriculumDocumentFlow = ai.defineFlow(
  {
    name: 'analyzeCurriculumDocumentFlow',
    inputSchema: AnalyzeCurriculumDocumentInputSchema,
    outputSchema: AnalyzeCurriculumDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
