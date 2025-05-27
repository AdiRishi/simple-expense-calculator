import type React from 'react';

export const handleInputChange =
  (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numericValue = Number.parseFloat(value) || 0;
    setter(numericValue);
  };

export const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/,/g, '');
  const numericValue = Number.parseFloat(value) || 0;
  if (numericValue > 0) {
    e.target.value = numericValue.toLocaleString();
  }
};
