"use client";

import React from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { patients, Patient } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SortKey = keyof Patient;

const columns: {
  key: SortKey;
  header: string;
  render: (patient: Patient) => React.ReactNode;
}[] = [
  {
    key: 'recommended_priority_rank',
    header: 'Rank',
    render: (p) => <span className="font-mono">{p.recommended_priority_rank}</span>,
  },
  {
    key: 'patient_id',
    header: 'Patient',
    render: (p) => (
      <Link href={`/patient/${p.patient_id}`} className="font-medium text-primary hover:underline">
        {p.patient_id}
      </Link>
    ),
  },
  {
    key: 'risk_level',
    header: 'Risk',
    render: (p) => (
      <Badge
        variant={p.risk_level === 'High' ? 'destructive' : 'secondary'}
        className={cn(
          p.risk_level === 'High' && 'bg-red-500/20 text-red-400 border-red-500/30',
          p.risk_level === 'Low' && 'bg-green-500/20 text-green-400 border-green-500/30'
        )}
      >
        {p.risk_level}
      </Badge>
    ),
  },
  {
    key: 'esi',
    header: 'ESI',
    render: (p) => p.esi,
  },
  {
    key: 'time_in_ed_minutes',
    header: 'Time in ED',
    render: (p) => `${p.time_in_ed_minutes} min`,
  },
  {
    key: 'current_status',
    header: 'Status',
    render: (p) => (
      <span
        className={cn(
          'capitalize',
          p.current_status === 'waiting'
            ? 'text-yellow-400'
            : 'text-blue-400'
        )}
      >
        {p.current_status.replace('_', ' ')}
      </span>
    ),
  },
  {
    key: 'bed_no',
    header: 'Bed',
    render: (p) => p.bed_no || <span className="text-muted-foreground">N/A</span>,
  },
];

export function DataTable() {
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey;
    direction: 'asc' | 'desc';
  } | null>({ key: 'recommended_priority_rank', direction: 'asc' });

  const [filter, setFilter] = React.useState('');

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = React.useMemo(() => {
    let sortableItems = [...patients];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);
  
  const filteredPatients = sortedPatients.filter(p =>
    p.patient_id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <Input
          placeholder="Filter by Patient ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>
                <Button variant="ghost" onClick={() => handleSort(col.key)}>
                  {col.header}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow
              key={patient.patient_id}
              className={cn(
                patient.risk_level === 'High' && 'bg-destructive/10 hover:bg-destructive/20'
              )}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>{col.render(patient)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
