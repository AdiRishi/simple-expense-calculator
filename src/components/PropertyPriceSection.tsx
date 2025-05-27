import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type React from 'react';
import { handleInputChange, handleInputBlur } from './input-utils';

interface PropertyPriceSectionProps {
  propertyPrice: number;
  loanAmount: number;
  monthlyMortgage: number;
  depositPercentage: number;
  interestRate: number;
  loanTermYears: number;
  setPropertyPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function PropertyPriceSection({
  propertyPrice,
  loanAmount,
  monthlyMortgage,
  depositPercentage,
  interestRate,
  loanTermYears,
  setPropertyPrice,
}: PropertyPriceSectionProps) {
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
