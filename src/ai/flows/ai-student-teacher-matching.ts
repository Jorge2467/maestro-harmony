'use server';
/**
 * @fileOverview An AI-powered tool that recommends the most suitable instructor or learning path for each student.
 *
 * - recommendTeacher - A function that handles the teacher recommendation process.
 * - RecommendTeacherInput - The input type for the recommendTeacher function.
 * - RecommendTeacherOutput - The return type for the recommendTeacher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTeacherInputSchema = z.object({
  studentGoals: z.string().describe('The goals of the student.'),
  studentLevel: z.string().describe('The current level of the student (e.g., beginner, intermediate, advanced).'),
  studentProgress: z.string().describe('A description of the student’s progress.'),
});
export type RecommendTeacherInput = z.infer<typeof RecommendTeacherInputSchema>;

const RecommendTeacherOutputSchema = z.object({
  teacherRecommendation: z.string().describe('The recommended teacher for the student.'),
  learningPathRecommendation: z.string().describe('The recommended learning path for the student.'),
});
export type RecommendTeacherOutput = z.infer<typeof RecommendTeacherOutputSchema>;

export async function recommendTeacher(input: RecommendTeacherInput): Promise<RecommendTeacherOutput> {
  return recommendTeacherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTeacherPrompt',
  input: {schema: RecommendTeacherInputSchema},
  output: {schema: RecommendTeacherOutputSchema},
  prompt: `You are an AI assistant designed to recommend the best teacher and learning path for music students.

  Consider the student's goals, current level, and progress to provide personalized recommendations.

  Student Goals: {{{studentGoals}}}
  Student Level: {{{studentLevel}}}
  Student Progress: {{{studentProgress}}}

  Based on this information, which teacher and learning path do you recommend?`,
});

const recommendTeacherFlow = ai.defineFlow(
  {
    name: 'recommendTeacherFlow',
    inputSchema: RecommendTeacherInputSchema,
    outputSchema: RecommendTeacherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
