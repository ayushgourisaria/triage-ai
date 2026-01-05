'use server';

/**
 * @fileOverview Summarizes a patient's medical history, including previous ED visits and admissions.
 *
 * - summarizePatientHistory - A function that handles the summarization process.
 * - SummarizePatientHistoryInput - The input type for the summarizePatientHistory function.
 * - SummarizePatientHistoryOutput - The return type for the summarizePatientHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientHistoryInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient whose history needs to be summarized.'),
  nEdVisits: z.number().describe('The number of previous ED visits for the patient.'),
  nAdmissions: z.number().describe('The number of previous admissions for the patient.'),
  chiefComplaint: z.string().optional().describe('The patient\'s chief complaint.'),
  triageVitals: z.string().optional().describe('The patient\'s triage vitals.'),
});
export type SummarizePatientHistoryInput = z.infer<typeof SummarizePatientHistoryInputSchema>;

const SummarizePatientHistoryOutputSchema = z.object({
  summary: z.string().describe('A summary of the patient\'s medical history.'),
});
export type SummarizePatientHistoryOutput = z.infer<typeof SummarizePatientHistoryOutputSchema>;

export async function summarizePatientHistory(input: SummarizePatientHistoryInput): Promise<SummarizePatientHistoryOutput> {
  return summarizePatientHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatientHistoryPrompt',
  input: {schema: SummarizePatientHistoryInputSchema},
  output: {schema: SummarizePatientHistoryOutputSchema},
  prompt: `You are a medical professional summarizing patient history. Please provide a concise summary of the following information for patient ID {{{patientId}}}:

Number of previous ED visits: {{{nEdVisits}}}
Number of previous admissions: {{{nAdmissions}}}
Chief complaint: {{{chiefComplaint}}}
Triage vitals: {{{triageVitals}}}

Provide a summary of the patient's medical history.`,
});

const summarizePatientHistoryFlow = ai.defineFlow(
  {
    name: 'summarizePatientHistoryFlow',
    inputSchema: SummarizePatientHistoryInputSchema,
    outputSchema: SummarizePatientHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
