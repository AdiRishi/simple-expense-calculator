# Simple Expense Calculator

A modern, responsive property expense calculator built with Next.js 15, React 19, and Tailwind CSS. Calculate your monthly and weekly property expenses including mortgage payments, strata fees, council rates, and water fees.

## ✨ Features

- **Property Price Calculator**: Calculate mortgage payments based on property price
- **Automatic Calculations**: Real-time updates as you input values
- **Quarterly Fees Support**: Input strata, council, and water fees on a quarterly basis
- **Monthly & Weekly Breakdown**: See both monthly and weekly expense totals
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, accessible interface using shadcn/ui components

## 🧮 Calculations

The calculator uses the following assumptions and formulas:

### Mortgage Calculation

- **Deposit**: 5% of property price
- **Loan Amount**: 95% of property price
- **Interest Rate**: 5.68% per annum (variable)
- **Loan Term**: 30 years
- **Formula**: Standard mortgage payment formula with compound interest

### Expense Breakdown

- **Quarterly fees** (strata, council, water) are automatically converted to monthly amounts
- **Weekly expenses** are calculated as: `(monthly total × 12) ÷ 52`

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd simple-expense-calculator
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting
- `pnpm format` - Format code with Prettier

## 🏗️ Project Structure

```
simple-expense-calculator/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Tailwind CSS
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── expense-calculator.tsx  # Main calculator component
│       └── ui/              # Reusable UI components
│           ├── button.tsx
│           ├── card.tsx
│           ├── input.tsx
│           └── label.tsx
├── public/                  # Static assets
├── package.json
└── README.md
```

## 🎨 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, customizable components
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast development bundler
- **pnpm** - Fast, disk space efficient package manager

### Analytics & Performance

- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring

## 📱 Usage

1. **Enter Property Price**: Input the total property purchase price
2. **View Mortgage Details**: See calculated deposit, loan amount, and monthly mortgage payment
3. **Add Quarterly Fees**: Input strata, council rates, and water fees (quarterly amounts)
4. **See Results**: View your total monthly and weekly property expenses

## 🎯 Use Cases

Perfect for:

- **Property Investors** - Calculate rental property expenses
- **First-time Buyers** - Understand ongoing property costs
- **Financial Planning** - Budget for property ownership
- **Real Estate Professionals** - Quick expense estimates for clients

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Alternatively, you can deploy to any platform that supports Node.js applications:

1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit the [React documentation](https://react.dev)
