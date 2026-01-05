import { DataTable } from './data-table';

export default function CensusPage() {
  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Live ED Census</h1>
        <p className="text-muted-foreground">
          Recommended patient priority based on clinical risk.
        </p>
      </div>
      <DataTable />
    </div>
  );
}
