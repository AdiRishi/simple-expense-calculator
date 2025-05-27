import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Property Expense Calculator',
  description:
    'Calculate your monthly and weekly property ownership costs including mortgage payments, strata fees, council rates, and water charges. Plan your property investment with accurate expense estimates.',
  keywords: [
    'property calculator',
    'mortgage calculator',
    'expense calculator',
    'property investment',
    'strata fees',
    'council rates',
    'property costs',
  ],
  authors: [{ name: 'Property Expense Calculator' }],
  openGraph: {
    title: 'Property Expense Calculator',
    description:
      'Calculate your monthly and weekly property ownership costs including mortgage payments, strata fees, council rates, and water charges.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Property Expense Calculator',
    description:
      'Calculate your monthly and weekly property ownership costs including mortgage payments, strata fees, council rates, and water charges.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
