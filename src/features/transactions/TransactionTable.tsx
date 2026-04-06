import { useStore } from '../../store/useStore';
import TransactionFilters from './TransactionFilters';
import { Trash2, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionTable = () => {
  const { 
    transactions, 
    searchQuery, 
    categoryFilter, 
    role, 
    deleteTransaction,
    currency, 
    rates 
  } = useStore();

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="overflow-hidden !p-0 shadow-sm border-[var(--border-card)]">
      {/* Filters Header - Background uses var */}
      <div className="p-6 border-b border-[var(--border-card)] bg-[var(--bg-card)]">
        <TransactionFilters />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-main)] border-b border-[var(--border-card)] text-[var(--text-muted)] text-[11px] font-bold uppercase tracking-[0.1em]">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-card)] bg-[var(--bg-card)]">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="group hover:bg-blue-500/5 dark:hover:bg-blue-500/10 transition-all duration-200">
                  <td className="px-6 py-4 text-sm text-[var(--text-muted)] whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-[var(--text-main)] block truncate max-w-[200px]">
                      {t.description}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={t.type === 'income' ? 'success' : 'info'}>
                      {t.category}
                    </Badge>
                  </td>
                  <td className={`px-6 py-4 font-mono font-bold text-sm ${
                    t.type === 'income' ? 'text-emerald-500' : 'text-[var(--text-main)]'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount, currency, rates)}
                  </td>
                  
                  {role === 'admin' && (
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center text-[var(--text-muted)] space-y-2">
                    <AlertCircle className="w-8 h-8 opacity-20" />
                    <p className="text-sm italic font-medium">No transactions match your current filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TransactionTable;