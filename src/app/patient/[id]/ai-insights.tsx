"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal } from 'lucide-react';
import { getChiefComplaintInsightsAction } from './actions';
import type { Patient } from '@/lib/data';
import type { ChiefComplaintInsightsOutput } from '@/ai/flows/chief-complaint-insights';
import { Skeleton } from '@/components/ui/skeleton';

export function AiInsights({ patient }: { patient: Patient }) {
  const [insights, setInsights] =
    useState<ChiefComplaintInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInsights = async () => {
      setIsLoading(true);
      setError(null);
      const result = await getChiefComplaintInsightsAction(patient);
      if (result.error) {
        setError(result.error);
      } else {
        setInsights(result.data || null);
      }
      setIsLoading(false);
    };

    getInsights();
  }, [patient]);

  const renderBulletedList = (text: string) => {
    const items = text.split('- ').filter(item => item.trim() !== '');
    if (items.length === 0 && text.length > 0) {
      return <p className="text-muted-foreground">{text}</p>;
    }
    return (
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {items.map((item, index) => (
                <li key={index}>{item.trim()}</li>
            ))}
        </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Predictive Insights
        </CardTitle>
        <CardDescription>
          AI-generated analysis of patient data for potential risks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/3 mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
        {insights && (
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">Insights</h4>
              {renderBulletedList(insights.insights)}
            </div>
            <div>
              <h4 className="font-semibold text-destructive">Potential Risks</h4>
              {renderBulletedList(insights.potentialRisks)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
