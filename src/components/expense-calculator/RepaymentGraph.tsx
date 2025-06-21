'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingDown } from 'lucide-react';
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { handleInputChange, handleInputBlur } from './input-utils';

interface RepaymentGraphProps {
  loanAmount: number;
  monthlyMortgage: number;
  interestRate: number;
  loanTermYears: number;
  additionalRepayment: number;
  setAdditionalRepayment: React.Dispatch<React.SetStateAction<number>>;
}

interface RepaymentData {
  year: number;
  standardBalance: number;
  withExtraBalance: number;
}

export function RepaymentGraph({
  loanAmount,
  monthlyMortgage,
  interestRate,
  loanTermYears,
  additionalRepayment,
  setAdditionalRepayment,
}: RepaymentGraphProps) {
  const chartConfig = {
    standardBalance: {
      label: 'Standard',
      color: 'var(--chart-1)',
    },
    withExtraBalance: {
      label: 'Extra',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;

  const repaymentData = useMemo(() => {
    if (loanAmount <= 0 || monthlyMortgage <= 0) {
      return [];
    }

    const monthlyRate = interestRate / 100 / 12;
    const data: RepaymentData[] = [];

    // Calculate standard repayment schedule
    let standardBalance = loanAmount;
    let withExtraBalance = loanAmount;

    for (let year = 0; year <= loanTermYears; year++) {
      data.push({
        year,
        standardBalance: Math.max(0, Math.round(standardBalance)),
        withExtraBalance: Math.max(0, Math.round(withExtraBalance)),
      });

      // Calculate 12 months of payments for this year
      for (let month = 0; month < 12 && year < loanTermYears; month++) {
        // Standard repayment
        if (standardBalance > 0) {
          const standardInterestPayment = standardBalance * monthlyRate;
          const standardPrincipalPayment = monthlyMortgage - standardInterestPayment;
          standardBalance = Math.max(0, standardBalance - standardPrincipalPayment);
        }

        // With additional repayment
        if (withExtraBalance > 0) {
          const extraInterestPayment = withExtraBalance * monthlyRate;
          const extraPrincipalPayment = monthlyMortgage - extraInterestPayment + additionalRepayment;
          withExtraBalance = Math.max(0, withExtraBalance - extraPrincipalPayment);
        }
      }
    }

    return data;
  }, [loanAmount, monthlyMortgage, interestRate, loanTermYears, additionalRepayment]);

  const savings = useMemo(() => {
    if (repaymentData.length === 0) return { timeSaved: 0, interestSaved: 0 };

    // Find when each loan is paid off
    const standardPayoffYear = repaymentData.findIndex((d) => d.standardBalance === 0);
    const extraPayoffYear = repaymentData.findIndex((d) => d.withExtraBalance === 0);

    const timeSaved = standardPayoffYear > 0 && extraPayoffYear > 0 ? standardPayoffYear - extraPayoffYear : 0;

    // Calculate total interest saved (simplified calculation)
    const totalAdditionalPayments = additionalRepayment * 12 * (extraPayoffYear > 0 ? extraPayoffYear : loanTermYears);
    const interestSaved = timeSaved * 12 * monthlyMortgage - totalAdditionalPayments;

    return { timeSaved, interestSaved: Math.max(0, interestSaved) };
  }, [repaymentData, additionalRepayment, monthlyMortgage, loanTermYears]);

  if (loanAmount <= 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Loan Repayment Schedule
            </CardTitle>
            <CardDescription>Track your loan balance over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="additional-repayment">Additional Monthly Repayment ($)</Label>
          <Input
            id="additional-repayment"
            type="text"
            min="0"
            placeholder="0"
            value={additionalRepayment.toLocaleString()}
            onChange={handleInputChange(setAdditionalRepayment)}
            onBlur={handleInputBlur}
          />
        </div>

        {additionalRepayment > 0 && savings.timeSaved > 0 && (
          <div className="bg-muted/50 grid grid-cols-1 gap-4 rounded-lg p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Time Saved</p>
              <p className="font-medium text-green-600">{savings.timeSaved} years</p>
            </div>
            <div>
              <p className="text-muted-foreground">Interest Saved</p>
              <p className="font-medium text-green-600">${Math.round(savings.interestSaved).toLocaleString()}</p>
            </div>
          </div>
        )}

        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart accessibilityLayer data={repaymentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="fillStandardBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-standardBalance)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-standardBalance)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillWithExtraBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-withExtraBalance)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-withExtraBalance)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="min-w-[12rem] [&_.flex.justify-between]:justify-start [&_.flex.justify-between]:gap-4"
                />
              }
            />
            <Area
              dataKey="standardBalance"
              type="natural"
              fill="url(#fillStandardBalance)"
              stroke="var(--color-standardBalance)"
              strokeWidth={2}
            />
            {additionalRepayment > 0 && (
              <Area
                dataKey="withExtraBalance"
                type="natural"
                fill="url(#fillWithExtraBalance)"
                stroke="var(--color-withExtraBalance)"
                strokeWidth={2}
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
