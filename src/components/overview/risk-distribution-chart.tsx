'use client';

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { patients, type Patient } from '@/lib/data';
import { cn } from '@/lib/utils';

const chartConfig = {
  patients: {
    label: 'Patients',
  },
  low: {
    label: 'Low',
    color: 'hsl(var(--chart-2))',
  },
  medium: {
    label: 'Medium',
    color: 'hsl(var(--chart-3))',
  },
  high: {
    label: 'High',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function RiskDistributionChart({
  className,
}: {
  className?: string;
}) {
  const chartData = React.useMemo(() => {
    const counts = patients.reduce(
      (acc, patient) => {
        const risk = patient.risk_level.toLowerCase();
        if (risk in acc) {
          acc[risk]++;
        }
        return acc;
      },
      { low: 0, medium: 0, high: 0 }
    );
    return [
      { risk: 'low', count: counts.low, fill: 'var(--color-low)' },
      { risk: 'medium', count: counts.medium, fill: 'var(--color-medium)' },
      { risk: 'high', count: counts.high, fill: 'var(--color-high)' },
    ].filter((d) => d.count > 0);
  }, []);

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
        <CardDescription>Patient risk level overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="risk"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={entry.risk} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="risk" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
