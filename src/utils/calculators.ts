import type { Transaction } from '../types';

export const calculateTotals = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
        acc.balance += curr.amount;
      } else {
        acc.expenses += curr.amount;
        acc.balance -= curr.amount;
      }
      return acc;
    },
    { balance: 0, income: 0, expenses: 0 }
  );
};