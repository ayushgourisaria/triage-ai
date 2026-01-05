import { StatsCards } from '@/components/overview/stats-cards';
import { RiskDistributionChart } from '@/components/overview/risk-distribution-chart';
import { PatientFlowChart } from '@/components/overview/patient-flow-chart';

export default function Home() {
  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">ED Overview</h1>
        <p className="text-muted-foreground">
          A real-time snapshot of the Emergency Department.
        </p>
      </div>

      <StatsCards />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <RiskDistributionChart className="lg:col-span-2" />
        <PatientFlowChart className="lg:col-span-3" />
      </div>
    </div>
  );
}
