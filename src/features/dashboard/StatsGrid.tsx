import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const StatsGrid = () => {
  const { transactions, currency, rates } = useStore();

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  // Updated with theme-friendly color logic
  const stats = [
    { 
      title: 'Total Balance', 
      value: balance, 
      icon: Wallet, 
      color: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-500/10' // Subtle tint for both modes
    },
    { 
      title: 'Total Income', 
      value: income, 
      icon: TrendingUp, 
      color: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      title: 'Total Expenses', 
      value: expenses, 
      icon: TrendingDown, 
      color: 'text-red-600 dark:text-red-400', 
      bg: 'bg-red-500/10' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} transition-colors duration-300`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-muted)]">{stat.title}</p>
              <h2 className="text-2xl font-bold text-[var(--text-main)] transition-colors duration-300">
                {formatCurrency(stat.value, currency, rates)}
              </h2>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;