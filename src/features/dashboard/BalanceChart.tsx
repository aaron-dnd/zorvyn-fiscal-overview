import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';

const BalanceChart = () => {
  // 1. Destructure currency and rates from store
  const { transactions, currency, rates } = useStore();

  // 2. Map data to include the converted currency amount
  const data = transactions
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(t => {
      // Calculate converted amount based on selected currency
      const rate = rates[currency] || 1;
      const convertedAmount = t.amount * rate;

      return {
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: parseFloat(convertedAmount.toFixed(2)) // Keep it as a number for Recharts
      };
    });

  return (
    <Card title="Balance Trend" className="h-[400px]">
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {/* 3. Replaced hardcoded stroke with CSS variable for grid lines */}
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="var(--border-card)" 
          />
          
          <XAxis 
            dataKey="date" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            stroke="var(--text-muted)" // Theme-aware axis text
          />
          
          <YAxis 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            stroke="var(--text-muted)" // Theme-aware axis text
            tickFormatter={(val) => `${currency} ${val}`} // 4. Dynamic Currency Prefix
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-card)', 
              borderRadius: '12px', 
              border: '1px solid var(--border-card)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              color: 'var(--text-main)'
            }}
            itemStyle={{ color: 'var(--text-main)' }}
            labelStyle={{ color: 'var(--text-muted)', fontWeight: 'bold' }}
            formatter={(value: number) => [`${currency} ${value}`, 'Amount']}
          />
          
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorAmt)" 
            strokeWidth={3} // Slightly thicker for that "Pinterest" aesthetic
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceChart;