import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleInputChange, handleInputBlur, useFormattedNumberInput } from '@/lib/input-utils';
import type React from 'react';

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
  // Use the reusable hook to handle decimals gracefully without cluttering this component
  const {
    input: interestRateInput,
    onChange: handleInterestRateChange,
    onBlur: handleInterestRateBlur,
  } = useFormattedNumberInput(interestRate, setInterestRate);

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
