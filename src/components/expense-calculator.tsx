'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Home, Info } from 'lucide-react';
import type React from 'react';
import { useState, useEffect } from 'react';

export default function ExpenseCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(0);
  const [strata, setStrata] = useState<number>(0);
  const [council, setCouncil] = useState<number>(0);
  const [water, setWater] = useState<number>(0);

  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(0);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [weeklyTotal, setWeeklyTotal] = useState<number>(0);

  // Fixed values
  const depositPercentage = 5;
  const interestRate = 5.93;
  const loanTermYears = 30;

  useEffect(() => {
    // Calculate loan amount (95% of property price)
    const calculatedLoanAmount = propertyPrice * 0.95;
    setLoanAmount(calculatedLoanAmount);

    // Calculate monthly mortgage payment using standard mortgage formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    if (calculatedLoanAmount > 0) {
      const monthlyInterestRate = interestRate / 100 / 12;
      const numberOfPayments = loanTermYears * 12;

      const monthlyPayment =
        (calculatedLoanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      setMonthlyMortgage(monthlyPayment);
    } else {
      setMonthlyMortgage(0);
    }
  }, [propertyPrice]);

  useEffect(() => {
    // Convert quarterly fees to monthly by dividing by 3
    const monthlyStrata = strata / 3;
    const monthlyCouncil = council / 3;
    const monthlyWater = water / 3;

    // Calculate monthly total
    const monthly = monthlyMortgage + monthlyStrata + monthlyCouncil + monthlyWater;
    setMonthlyTotal(monthly);

    // Calculate weekly total (monthly * 12 / 52)
    const weekly = (monthly * 12) / 52;
    setWeeklyTotal(weekly);
  }, [monthlyMortgage, strata, council, water]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/,/g, '');
      const numericValue = Number.parseFloat(value) || 0;
      setter(numericValue);
    };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numericValue = Number.parseFloat(value) || 0;
    if (numericValue > 0) {
      e.target.value = numericValue.toLocaleString();
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Property Expense Calculator
        </CardTitle>
        <CardDescription>Calculate your monthly and weekly property expenses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        {/* Property Price Section */}
        <div className="bg-muted/50 space-y-4 rounded-lg p-3 sm:p-4">
          <div className="space-y-2">
            <Label htmlFor="property-price">Property Price ($)</Label>
            <Input
              id="property-price"
              type="text"
              min="0"
              placeholder="0"
              onChange={handleInputChange(setPropertyPrice)}
              onBlur={handleInputBlur}
            />
          </div>

          {propertyPrice > 0 && (
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-muted-foreground">Deposit ({depositPercentage}%)</p>
                <p className="font-medium">${(propertyPrice * 0.05).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Loan Amount</p>
                <p className="font-medium">${loanAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Interest Rate</p>
                <p className="font-medium">{interestRate}% p.a.</p>
              </div>
              <div>
                <p className="text-muted-foreground">Loan Term</p>
                <p className="font-medium">{loanTermYears} years</p>
              </div>
            </div>
          )}

          {propertyPrice > 0 && (
            <div className="border-t pt-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Monthly Mortgage Repayment</Label>
                <div className="bg-background rounded-md border p-3">
                  <p className="text-xl font-bold">${Math.round(monthlyMortgage).toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs">Principal and interest over {loanTermYears} years</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quarterly Fees Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <h3 className="font-medium">Quarterly Fees</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="strata">Strata Cost per Quarter ($)</Label>
              <Input
                id="strata"
                type="text"
                min="0"
                placeholder="0.00"
                onChange={handleInputChange(setStrata)}
                onBlur={handleInputBlur}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="council">Council Fees per Quarter ($)</Label>
              <Input
                id="council"
                type="text"
                min="0"
                placeholder="0.00"
                onChange={handleInputChange(setCouncil)}
                onBlur={handleInputBlur}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="water">Water Fees per Quarter ($)</Label>
              <Input
                id="water"
                type="text"
                min="0"
                placeholder="0.00"
                onChange={handleInputChange(setWater)}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 border-t p-4 sm:p-6">
        <div className="text-muted-foreground flex items-start gap-2 text-sm">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>Assumes 5% deposit and {interestRate}% variable interest rate</span>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Monthly Expenses</p>
            <p className="text-2xl font-bold">${Math.round(monthlyTotal).toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Weekly Expenses</p>
            <p className="text-2xl font-bold">${Math.round(weeklyTotal).toLocaleString()}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
