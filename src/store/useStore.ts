import { create } from 'zustand';
import type { Transaction, Role } from '../types';
import { mockTransactions } from '../data/mockData';

const fetchLatestRates = async (base: string = 'USD') => {
  try {
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}&symbols=INR,EUR,GBP`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Currency API failed, using fallback rates:", error);
    return { INR: 83.5, EUR: 0.92, GBP: 0.78 };
  }
};

export type TabID = 'dashboard' | 'transactions' | 'insights';

interface FinanceState {
  // --- NEW: User State ---
  userName: string;
  setUserName: (name: string) => void;

  transactions: Transaction[];
  role: Role;
  searchQuery: string;
  categoryFilter: string;
  activeTab: TabID;
  isDarkMode: boolean;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  rates: Record<string, number>;
  isLoadingRates: boolean;

  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  resetFilters: () => void;
  setActiveTab: (tab: TabID) => void;
  toggleDarkMode: () => void;
  setCurrency: (currency: 'USD' | 'INR' | 'EUR' | 'GBP') => void;
  loadRates: () => Promise<void>;
}

export const useStore = create<FinanceState>((set, get) => ({
  // --- Initialize userName from LocalStorage ---
  userName: localStorage.getItem('finance_user_name') || '',

  setUserName: (name) => {
    localStorage.setItem('finance_user_name', name); // Persist to browser
    set({ userName: name });
  },

  transactions: mockTransactions,
  role: 'admin',
  searchQuery: '',
  categoryFilter: 'All',
  activeTab: 'dashboard',
  isDarkMode: false, 
  
  currency: 'USD',
  rates: { INR: 83, EUR: 0.92, GBP: 0.78, USD: 1 },
  isLoadingRates: false,

  setRole: (role) => set({ role }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),

  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions] 
  })),
  
  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter(t => t.id !== id)
  })),

  setActiveTab: (activeTab) => set({ activeTab }),

  toggleDarkMode: () => {
    const nextMode = !get().isDarkMode;
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ isDarkMode: nextMode });
  },

  resetFilters: () => set({ searchQuery: '', categoryFilter: 'All' }),
  setCurrency: (currency) => set({ currency }),

  loadRates: async () => {
    set({ isLoadingRates: true });
    const newRates = await fetchLatestRates('USD');
    set({ 
      rates: { ...newRates, USD: 1 }, 
      isLoadingRates: false 
    });
  },
}));