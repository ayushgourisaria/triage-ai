'use server';

/**
 * @fileOverview Analyzes the patient's chief complaint to highlight potential underlying conditions or risks.
 *
 * - getChiefComplaintInsights - A function that analyzes the chief complaint and returns insights.
 * - ChiefComplaintInsightsInput - The input type for the getChiefComplaintInsights function.
 * - ChiefComplaintInsightsOutput - The return type for the getChiefComplaintInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChiefComplaintInsightsInputSchema = z.object({
  chiefComplaint: z
    .string()
    .describe('The patient’s chief complaint as a text description.'),
  patientVitals: z
    .string()
    .optional()
    .describe("The patient's vitals like heart rate, blood pressure, and temperature."),
  patientHistory: z
    .string()
    .optional()
    .describe("The patient's medical history."),
});
export type ChiefComplaintInsightsInput = z.infer<
  typeof ChiefComplaintInsightsInputSchema
>;

const ChiefComplaintInsightsOutputSchema = z.object({
  insights: z.string().describe('Bulleted list of insights derived from the chief complaint.'),
  potentialRisks: z
    .string()
    .describe('Bulleted list of potential risks associated with the chief complaint.'),
});
export type ChiefComplaintInsightsOutput = z.infer<
  typeof ChiefComplaintInsightsOutputSchema
>;

export async function getChiefComplaintInsights(
  input: ChiefComplaintInsightsInput
): Promise<ChiefComplaintInsightsOutput> {
  return chiefComplaintInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chiefComplaintInsightsPrompt',
  input: {schema: ChiefComplaintInsightsInputSchema},
  output: {schema: ChiefComplaintInsightsOutputSchema},
  prompt: `You are an experienced triage nurse analyzing patient information.

  Based on the patient's chief complaint, vitals and medical history, provide insights and potential risks.
  Format each as a bulleted list (using "- " for each bullet).

  Chief Complaint: {{{chiefComplaint}}}
  Vitals: {{{patientVitals}}}
  Medical History: {{{patientHistory}}}
  
  Example Response:
  Insights:
  - Insight 1
  - Insight 2
  Potential Risks:
  - Risk 1
  - Risk 2
  `,
});

const chiefComplaintInsightsFlow = ai.defineFlow(
  {
    name: 'chiefComplaintInsightsFlow',
    inputSchema: ChiefComplaintInsightsInputSchema,
    outputSchema: ChiefComplaintInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
