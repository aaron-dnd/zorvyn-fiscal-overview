export type Role = 'admin' | 'viewer';

export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food' 
  | 'Transport' 
  | 'Rent' 
  | 'Salary' 
  | 'Utilities' 
  | 'Entertainment' 
  | 'Shopping'
  | 'Health'
  | 'Miscellaneous';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}