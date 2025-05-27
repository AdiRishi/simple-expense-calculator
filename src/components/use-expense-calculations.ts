import { useState, useEffect } from 'react';
import type React from 'react';

export interface ExpenseCalculations {
  propertyPrice: number;
  strata: number;
  council: number;
  water: number;
  loanAmount: number;
  monthlyMortgage: number;
  monthlyTotal: number;
  weeklyTotal: number;
  setPropertyPrice: React.Dispatch<React.SetStateAction<number>>;
  setStrata: React.Dispatch<React.SetStateAction<number>>;
  setCouncil: React.Dispatch<React.SetStateAction<number>>;
  setWater: React.Dispatch<React.SetStateAction<number>>;
}

export function useExpenseCalculations(): ExpenseCalculations {
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

  return {
    propertyPrice,
    strata,
    council,
    water,
    loanAmount,
    monthlyMortgage,
    monthlyTotal,
    weeklyTotal,
    setPropertyPrice,
    setStrata,
    setCouncil,
    setWater,
  };
}
