'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { patients } from '@/lib/data';
import { cn } from '@/lib/utils';

const chartConfig = {
  patients: {
    label: 'Patients',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PatientFlowChart({ className }: { className?: string }) {
  const chartData = React.useMemo(() => {
    const counts = patients.reduce(
      (acc, patient) => {
        if (patient.current_status === 'waiting') {
          acc.waiting++;
        } else if (patient.current_status === 'being_seen') {
          acc.being_seen++;
        }
        return acc;
      },
      { waiting: 0, being_seen: 0 }
    );
    return [
      { status: 'Waiting', patients: counts.waiting },
      { status: 'Being Seen', patients: counts.being_seen },
    ];
  }, []);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Patient Flow</CardTitle>
        <CardDescription>
          Number of patients waiting vs. being seen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="patients" fill="var(--color-patients)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
