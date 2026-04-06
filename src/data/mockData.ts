import type { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  // --- APRIL 2026 (Current Month - This will show in "This Month") ---
  { id: '11', date: '2026-04-05', amount: 5500, category: 'Salary', type: 'income', description: 'April Paycheck' },
  { id: '12', date: '2026-04-02', amount: 1200, category: 'Rent', type: 'expense', description: 'April Rent' },
  { id: '13', date: '2026-04-04', amount: 250, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '14', date: '2026-04-06', amount: 80, category: 'Entertainment', type: 'expense', description: 'Steam Game' },

  // --- MARCH 2026 (Last Month - Used for the "Vs Last Month" comparison) ---
  { id: '1', date: '2026-03-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Paycheck' },
  { id: '2', date: '2026-03-02', amount: 1200, category: 'Rent', type: 'expense', description: 'March Rent' },
  { id: '3', date: '2026-03-05', amount: 150, category: 'Food', type: 'expense', description: 'Grocery Run' },
  { id: '4', date: '2026-03-07', amount: 45, category: 'Transport', type: 'expense', description: 'Uber Ride' },
  { id: '5', date: '2026-03-10', amount: 200, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: '8', date: '2026-03-18', amount: 120, category: 'Food', type: 'expense', description: 'Dinner Out' },
  { id: '9', date: '2026-03-20', amount: 800, category: 'Salary', type: 'income', description: 'Freelance Project' },

  // --- FEBRUARY 2026 (To make the 6-month chart look active) ---
  { id: '15', date: '2026-02-15', amount: 1800, category: 'Shopping', type: 'expense', description: 'Laptop' },
];