import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { X, PlusCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input'; 
import { Button } from '../../components/ui/Button'; 
import type { Category } from '../../types';

const CATEGORIES: Category[] = [
  'Food', 'Transport', 'Rent', 'Salary', 'Utilities', 
  'Entertainment', 'Shopping', 'Health', 'Miscellaneous'
];

const AddTransactionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addTransaction } = useStore();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as 'income' | 'expense'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTx = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
    };

    addTransaction(newTx);
    onClose();
    
    // Reset form
    setFormData({ description: '', amount: '', category: 'Food', type: 'expense' });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-100">
              <PlusCircle size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">New Transaction</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <Input 
            label="Description"
            className="text-slate-900" // Forced visibility
            placeholder="What was this for?"
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Amount ($)"
              type="number"
              step="0.01"
              className="text-slate-900" // Forced visibility
              placeholder="0.00"
              required
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Type</label>
              <select 
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer text-slate-900"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="expense" className="bg-white text-slate-900">Expense</option>
                <option value="income" className="bg-white text-slate-900">Income</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Category</label>
            <select 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer text-slate-900"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-white text-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-100"
            >
              Create Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;