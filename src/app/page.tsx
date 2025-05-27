import { ExpenseCalculator } from '@/components/expense-calculator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 font-[family-name:var(--font-geist-sans)] sm:p-8 md:p-24">
      <ExpenseCalculator />
    </div>
  );
}
