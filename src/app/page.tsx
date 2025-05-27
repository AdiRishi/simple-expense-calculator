import ExpenseCalculator from '@/components/expense-calculator';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 font-[family-name:var(--font-geist-sans)]">
      <ExpenseCalculator />
    </div>
  );
}
