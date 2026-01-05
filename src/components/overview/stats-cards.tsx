import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { patients } from '@/lib/data';
import { Users, Clock, LogIn, Activity } from 'lucide-react';

export function StatsCards() {
  const totalPatients = patients.length;
  const { totalTime, waitingPatients } = patients.reduce(
    (acc, patient) => {
      acc.totalTime += patient.time_in_ed_minutes;
      if (patient.current_status === 'waiting') {
        acc.waitingPatients += 1;
      }
      return acc;
    },
    { totalTime: 0, waitingPatients: 0 }
  );

  const avgTimeInED =
    totalPatients > 0 ? Math.round(totalTime / totalPatients) : 0;
  const predictedAdmissions = patients.filter(
    (p) => p.risk_level === 'High'
  ).length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: Users,
    },
    {
      title: 'Avg. Time in ED',
      value: `${avgTimeInED} min`,
      icon: Clock,
    },
    {
      title: 'Predicted Admissions',
      value: predictedAdmissions,
      icon: LogIn,
    },
    {
      title: 'Patients Waiting',
      value: waitingPatients,
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
