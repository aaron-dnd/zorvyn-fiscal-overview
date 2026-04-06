import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { TrendingUp, BarChart3, Wallet, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const SpendingInsights = () => {
  const { currency, rates } = useStore();

  const cashFlowData = [
    { month: 'Oct', income: 5000, expense: 4200 },
    { month: 'Nov', income: 5000, expense: 3800 },
    { month: 'Dec', income: 6500, expense: 5100 },
    { month: 'Jan', income: 5200, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 3900 },
    { month: 'Mar', income: 5800, expense: 4150 },
  ];

  const maxVal = Math.max(...cashFlowData.map(d => Math.max(d.income, d.expense)));
  const current = cashFlowData[cashFlowData.length - 1];
  const netSavings = current.income - current.expense;
  const savingsMargin = Math.round((netSavings / current.income) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Main Chart Card */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                <BarChart3 size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Cash Flow Analysis</h3>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-tighter">Income Retention vs. Expenses</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex gap-3">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" /> Income
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500" /> Expense
                </div>
             </div>
          </div>
        </div>

        {/* Adaptive Bars */}
        <div className="relative flex items-end justify-between h-48 w-full gap-2 md:gap-4 px-2">
          {cashFlowData.map((data, i) => {
            const expenseHeight = (data.expense / maxVal) * 100;
            const incomeHeight = (data.income / maxVal) * 100;

            return (
              <div key={i} className="flex-1 flex flex-col items-center h-full group">
                <div className="relative w-full h-full flex items-end justify-center">
                  {/* Income Bar - Darkened slightly for Light Mode visibility */}
                  <div 
                    style={{ height: `${incomeHeight}%` }}
                    className="w-full max-w-[32px] bg-slate-100 dark:bg-slate-800/60 rounded-t-sm absolute transition-all duration-500"
                  />
                  
                  {/* Expense Bar */}
                  <div 
                    style={{ height: `${expenseHeight}%` }}
                    className={`w-full max-w-[32px] rounded-t-sm z-10 transition-all duration-700 group-hover:brightness-110 ${
                      data.expense > data.income ? 'bg-red-500' : 'bg-blue-600 dark:bg-blue-500'
                    }`}
                  />
                </div>
                <span className="mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 2. Bottom Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Net Savings Card */}
        <Card className="bg-blue-600 dark:bg-blue-700 text-white border-none shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Net Retention</p>
              <h4 className="text-lg font-bold">
                {formatCurrency(netSavings, currency, rates)}
              </h4>
            </div>
          </div>
        </Card>

        {/* Efficiency Card */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Efficiency</p>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {savingsMargin}% Saved
              </h4>
            </div>
          </div>
        </Card>

        {/* Status Prompt */}
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full h-fit mt-1">
              <CheckCircle2 size={14} className="text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-tight">Status</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Spending is {savingsMargin > 20 ? 'optimal' : 'aggressive'} this period.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpendingInsights;