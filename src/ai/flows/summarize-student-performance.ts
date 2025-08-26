'use server';
/**
 * @fileOverview An AI agent that summarizes a student's performance.
 *
 * - summarizeStudentPerformance - A function that summarizes a student's performance.
 * - SummarizeStudentPerformanceInput - The input type for the summarizeStudentPerformance function.
 * - SummarizeStudentPerformanceOutput - The return type for the summarizeStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentPerformanceInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  studentLevel: z.string().describe('The level of the student (e.g., Beginner, Intermediate, Advanced).'),
  instrument: z.string().describe('The instrument the student is learning (e.g., Piano, Violin, Guitar).'),
  performanceDetails: z.string().describe('Detailed information about the student\'s performance, progress, and areas of concern.'),
});
export type SummarizeStudentPerformanceInput = z.infer<typeof SummarizeStudentPerformanceInputSchema>;

const SummarizeStudentPerformanceOutputSchema = z.object({
  summary: z.string().describe('A summary of the student\'s performance, including areas of improvement and suggestions for future learning paths.'),
});
export type SummarizeStudentPerformanceOutput = z.infer<typeof SummarizeStudentPerformanceOutputSchema>;

export async function summarizeStudentPerformance(input: SummarizeStudentPerformanceInput): Promise<SummarizeStudentPerformanceOutput> {
  return summarizeStudentPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentPerformancePrompt',
  input: {schema: SummarizeStudentPerformanceInputSchema},
  output: {schema: SummarizeStudentPerformanceOutputSchema},
  prompt: `You are an AI assistant that helps music coordinators by summarizing student performance.

  Based on the details provided, create a concise summary of the student's performance. The summary should include key strengths,
  areas where the student needs improvement, and suggestions for future learning paths. Be encouraging and constructive.

  Student Name: {{{studentName}}}
  Student Level: {{{studentLevel}}}
  Instrument: {{{instrument}}}
  Performance Details: {{{performanceDetails}}}

  Summary:
  `,
});

const summarizeStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'summarizeStudentPerformanceFlow',
    inputSchema: SummarizeStudentPerformanceInputSchema,
    outputSchema: SummarizeStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
