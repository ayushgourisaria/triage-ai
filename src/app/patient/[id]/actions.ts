"use server";

import {
  getChiefComplaintInsights,
  ChiefComplaintInsightsInput,
} from '@/ai/flows/chief-complaint-insights';
import { Patient } from '@/lib/data';

function formatChiefComplaint(patient: Patient): string {
    const complaints = [];
    if (patient.cc_chestpain) complaints.push('chest pain');
    if (patient.cc_shortnessofbreath) complaints.push('shortness of breath');
    if (patient.cc_alteredmentalstatus) complaints.push('altered mental status');
    if (complaints.length === 0) return 'Not specified';
    return complaints.join(', ');
}

function formatVitals(patient: Patient): string {
    return `Heart Rate: ${patient.triage_vital_hr} bpm, SBP: ${patient.triage_vital_sbp}, Resp. Rate: ${patient.triage_vital_rr}, O2 Sat: ${patient.triage_vital_o2}%, Temp: ${patient.triage_vital_temp}°F`;
}

function formatHistory(patient: Patient): string {
    return `Previous ED Visits: ${patient.n_edvisits}, Previous Admissions: ${patient.n_admissions}`;
}

export async function getChiefComplaintInsightsAction(patient: Patient) {
  try {
    const input: ChiefComplaintInsightsInput = {
      chiefComplaint: formatChiefComplaint(patient),
      patientVitals: formatVitals(patient),
      patientHistory: formatHistory(patient),
    };
    const insights = await getChiefComplaintInsights(input);
    return { data: insights };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get AI insights. Please try again.' };
  }
}
