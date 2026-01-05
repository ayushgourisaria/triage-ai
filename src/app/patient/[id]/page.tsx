import { patients } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  PersonStanding,
  Bed,
  Ambulance,
  History,
  ClipboardList,
  Activity,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { AiInsights } from './ai-insights';

function getArrivalMode(mode: number) {
    const modes: { [key: number]: { text: string; icon: React.ElementType } } = {
        1: { text: 'Ambulance', icon: Ambulance },
        2: { text: 'Walk-in', icon: PersonStanding },
        6: { text: 'Other', icon: PersonStanding },
        7: { text: 'Other', icon: PersonStanding },
    };
    return modes[mode] || modes[6];
}

function getInsuranceStatus(status: number) {
    const statuses: { [key: number]: string } = {
        1: 'Private',
        2: 'Medicaid',
        3: 'Medicare',
        4: 'Self-pay',
    };
    return statuses[status] || 'Unknown';
}


export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = patients.find((p) => p.patient_id === params.id);

  if (!patient) {
    notFound();
  }

  const arrival = getArrivalMode(patient.arrivalmode);
  const insurance = getInsuranceStatus(patient.insurance_status);
  
  const chiefComplaints = [
    patient.cc_chestpain ? 'Chest Pain' : null,
    patient.cc_shortnessofbreath ? 'Shortness of Breath' : null,
    patient.cc_alteredmentalstatus ? 'Altered Mental Status' : null,
  ].filter(Boolean);

  return (
    <div className="container mx-auto p-0">
      <div className="mb-6 flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/census">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Patient: {patient.patient_id}
          </h1>
          <p className="text-muted-foreground">
            Detailed clinical information and predictive insights.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="grid gap-8 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Patient Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="font-semibold">Demographics</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Age</div>
                            <div>{patient.age}</div>
                            <div className="text-muted-foreground">Insurance</div>
                            <div>{insurance}</div>
                        </div>
                        <Separator />
                         <div className="font-semibold">Arrival</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                             <div className="text-muted-foreground">Mode</div>
                             <div className="flex items-center gap-2"><arrival.icon className="h-4 w-4" /> {arrival.text}</div>
                             <div className="text-muted-foreground">Timestamp</div>
                             <div>{new Date(patient.arrival_timestamp).toLocaleString()}</div>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <div className="font-semibold">Triage & Status</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">ESI</div>
                            <div>{patient.esi}</div>
                            <div className="text-muted-foreground">Risk Level</div>
                            <div>
                                <Badge variant={patient.risk_level === 'High' ? 'destructive' : 'secondary'}>
                                    {patient.risk_level}
                                </Badge>
                            </div>
                            <div className="text-muted-foreground">Current Status</div>
                            <div className="capitalize">{patient.current_status.replace('_', ' ')}</div>
                            <div className="text-muted-foreground">Bed</div>
                            <div>{patient.bed_no || 'N/A'}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>Triage Vitals</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-lg font-bold">{patient.triage_vital_hr} bpm</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">SBP</p>
                  <p className="text-lg font-bold">{patient.triage_vital_sbp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Resp. Rate</p>
                  <p className="text-lg font-bold">{patient.triage_vital_rr}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">O2 Sat.</p>
                  <p className="text-lg font-bold">{patient.triage_vital_o2}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Thermometer className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Temp</p>
                  <p className="text-lg font-bold">{patient.triage_vital_temp}°F</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <AiInsights patient={patient} />
        </div>

        <div className="space-y-8">
          <Card>
             <CardHeader>
                <CardTitle>Clinical Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="mb-2 font-semibold flex items-center gap-2"><ClipboardList className="h-4 w-4"/> Chief Complaint</h4>
                    {chiefComplaints.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {chiefComplaints.map(cc => <Badge key={cc} variant="secondary">{cc}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Not specified</p>
                    )}
                </div>
                <Separator />
                <div>
                    <h4 className="mb-2 font-semibold flex items-center gap-2"><History className="h-4 w-4"/> History</h4>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">ED Visits</div>
                        <div>{patient.n_edvisits}</div>
                        <div className="text-muted-foreground">Admissions</div>
                        <div>{patient.n_admissions}</div>
                    </div>
                </div>
                 <Separator />
                <div>
                    <h4 className="mb-2 font-semibold flex items-center gap-2"><Bed className="h-4 w-4"/> Disposition</h4>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Predicted Risk</div>
                        <div>{(patient.predicted_admission_risk * 100).toFixed(0)}%</div>
                        <div className="text-muted-foreground">Outcome</div>
                        <div>{patient.disposition === 1 ? 'Admitted' : 'Discharged'}</div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
