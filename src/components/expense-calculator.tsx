'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, RotateCcw } from 'lucide-react';
import ExpenseResults from './ExpenseResults';
import PropertyPriceSection from './PropertyPriceSection';
import QuarterlyFeesSection from './QuarterlyFeesSection';
import { useExpenseCalculations } from './use-expense-calculations';

export default function ExpenseCalculator() {
  const calculations = useExpenseCalculations();

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Expense Calculator
            </CardTitle>
            <CardDescription>Calculate your monthly and weekly property expenses</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={calculations.resetAll} className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <PropertyPriceSection
          propertyPrice={calculations.propertyPrice}
          loanAmount={calculations.loanAmount}
          monthlyMortgage={calculations.monthlyMortgage}
          depositPercentage={calculations.depositPercentage}
          interestRate={calculations.interestRate}
          loanTermYears={calculations.loanTermYears}
          setPropertyPrice={calculations.setPropertyPrice}
        />

        <QuarterlyFeesSection
          strata={calculations.strata}
          council={calculations.council}
          water={calculations.water}
          setStrata={calculations.setStrata}
          setCouncil={calculations.setCouncil}
          setWater={calculations.setWater}
        />
      </CardContent>

      <ExpenseResults
        monthlyTotal={calculations.monthlyTotal}
        weeklyTotal={calculations.weeklyTotal}
        depositPercentage={calculations.depositPercentage}
        interestRate={calculations.interestRate}
      />
    </Card>
  );
}
