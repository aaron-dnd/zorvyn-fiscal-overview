import { useState, useMemo, useCallback } from 'react';
import type { PieProps } from 'recharts';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Sector } from 'recharts';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface ExpenseItem {
  name: string;
  value: number;
}

// Fixed ActiveShapeProps to match exactly what Recharts provides internally
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <text x={cx} y={cy - 5} dy={8} textAnchor="middle" fill="var(--text-main, #1e293b)" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill="var(--text-muted, #64748b)" className="text-xs font-medium uppercase tracking-tighter">
        {(percent * 100).toFixed(1)}% of total
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
    </g>
  );
};

const CategoryChart = () => {
  const { transactions, currency, rates } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const currentRate = rates[currency] || 1;

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  // useMemo prevents recalculating data on every hover/render
  const expenseData = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc: ExpenseItem[], curr) => {
        const existing = acc.find(item => item.name === curr.category);
        const convertedValue = curr.amount * currentRate;

        if (existing) {
          existing.value += convertedValue;
        } else {
          acc.push({ name: curr.category, value: convertedValue });
        }
        return acc;
      }, []);
  }, [transactions, currentRate]);

  if (expenseData.length === 0) {
    return (
      <Card title="Spending Allocation" className="h-[400px] flex items-center justify-center">
        <p className="text-slate-400 font-medium">No data available</p>
      </Card>
    );
  }

  return (
    <Card title="Spending Allocation" className="h-[400px]">
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            {...({
              activeIndex,
              activeShape: renderActiveShape,
              data: expenseData,
              cx: "50%",
              cy: "50%",
              innerRadius: 70,
              outerRadius: 90,
              paddingAngle: 4,
              dataKey: "value",
              onMouseEnter: onPieEnter,
              animationBegin: 0,
              animationDuration: 1200
            } as PieProps)} // Spread + Casting removes the Pie underline
          >
            {expenseData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="var(--bg-card)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-card)', 
              borderRadius: '12px', 
              border: '1px solid var(--border-card)', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            // Explicit typing for formatter value fixes the formatter underline
            formatter={(value) => [
              formatCurrency(value as number || 0, currency, rates), 
              'Spent'
            ]}
          />
          
          <Legend 
            iconType="circle" 
            align="center" 
            verticalAlign="bottom"
            formatter={(value) => (
              <span className="text-[var(--text-muted)] text-[10px] font-bold uppercase ml-1">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;