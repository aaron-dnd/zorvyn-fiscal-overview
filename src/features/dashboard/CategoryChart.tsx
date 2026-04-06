import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Sector } from 'recharts';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../utils/formatters';

// Professional, slightly desaturated palette for better Dark Mode compatibility
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// This function renders the "Active Shape" when you hover over a slice
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

  return (
    <g>
      <text x={cx} y={cy - 5} dy={8} textAnchor="middle" fill="var(--text-main)" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill="var(--text-muted)" className="text-xs font-medium uppercase tracking-tighter">
        {(percent * 100).toFixed(1)}% of total
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8} // "Expands" the slice
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

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any[], curr) => {
      const existing = acc.find(item => item.name === curr.category);
      const convertedValue = curr.amount * currentRate;

      if (existing) {
        existing.value += convertedValue;
      } else {
        acc.push({ name: curr.category, value: convertedValue });
      }
      return acc;
    }, []);

  return (
    <Card title="Spending Allocation" className="h-[400px]">
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={expenseData}
            cx="50%"
            cy="50%"
            innerRadius={70} // Thinner ring for a more modern look
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={onPieEnter}
            animationBegin={0}
            animationDuration={1200}
          >
            {expenseData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="var(--bg-card)" // Creates "cutouts" between slices
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
              color: 'var(--text-main)'
            }}
            itemStyle={{ color: 'var(--text-main)' }}
            formatter={(value: any) => [
              formatCurrency(Number(value) / currentRate, currency, rates), 
              'Spent'
            ]}
          />
          
          <Legend 
            iconType="circle" 
            layout="horizontal" 
            align="center" 
            verticalAlign="bottom"
            formatter={(value) => <span className="text-[var(--text-muted)] text-xs font-bold uppercase">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CategoryChart;