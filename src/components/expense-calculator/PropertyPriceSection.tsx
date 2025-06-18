import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type React from 'react';
import { useState, useEffect } from 'react';
import { handleInputChange, handleInputBlur } from './input-utils';

interface PropertyPriceSectionProps {
  propertyPrice: number;
  loanAmount: number;
  monthlyMortgage: number;
  depositPercentage: number;
  interestRate: number;
  loanTermYears: number;
  setPropertyPrice: React.Dispatch<React.SetStateAction<number>>;
  setDepositPercentage: React.Dispatch<React.SetStateAction<number>>;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
}

export function PropertyPriceSection({
  propertyPrice,
  loanAmount,
  monthlyMortgage,
  depositPercentage,
  interestRate,
  loanTermYears,
  setPropertyPrice,
  setDepositPercentage,
  setInterestRate,
}: PropertyPriceSectionProps) {
  // Local state to preserve the raw string the user types for the interest rate so we don't prematurely strip the decimal point
  const [interestRateInput, setInterestRateInput] = useState<string>(() => interestRate.toLocaleString());

  // Keep the local input string in sync when the numeric prop changes externally (e.g. when resetting all values)
  useEffect(() => {
    setInterestRateInput(interestRate.toLocaleString());
  }, [interestRate]);

  // Custom onChange handler that updates both the display string and the numeric state used for calculations
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Always reflect whatever the user typed so far
    setInterestRateInput(raw);

    const numericValue = Number.parseFloat(raw.replace(/,/g, ''));
    if (!Number.isNaN(numericValue)) {
      setInterestRate(numericValue);
    }
  };

  // On blur, format the number nicely while preserving decimal places
  const handleInterestRateBlur = () => {
    const numericValue = Number.parseFloat(interestRateInput.replace(/,/g, ''));
    if (!Number.isNaN(numericValue)) {
      setInterestRateInput(numericValue.toLocaleString());
      setInterestRate(numericValue);
    } else {
      // If the input couldn't be parsed, reset to the current numeric value
      setInterestRateInput(interestRate.toLocaleString());
    }
  };

  return (
    <div className="bg-muted/50 space-y-4 rounded-lg p-3 sm:p-4">
      <div className="space-y-2">
        <Label htmlFor="property-price">Property Price ($)</Label>
        <Input
          id="property-price"
          type="text"
          min="0"
          placeholder="0"
          value={propertyPrice.toLocaleString()}
          onChange={handleInputChange(setPropertyPrice)}
          onBlur={handleInputBlur}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deposit-percentage">Deposit (%)</Label>
          <Input
            id="deposit-percentage"
            type="text"
            min="0"
            max="100"
            placeholder="5"
            value={depositPercentage.toLocaleString()}
            onChange={handleInputChange(setDepositPercentage)}
            onBlur={handleInputBlur}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
          <Input
            id="interest-rate"
            type="text"
            min="0"
            placeholder="5.93"
            value={interestRateInput}
            onChange={handleInterestRateChange}
            onBlur={handleInterestRateBlur}
          />
        </div>
      </div>

      {propertyPrice > 0 && (
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Deposit ({depositPercentage}%)</p>
            <p className="font-medium">${(propertyPrice * (depositPercentage / 100)).toLocaleString()}</p>
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
  );
}
