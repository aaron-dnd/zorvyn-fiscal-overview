import { useStore } from '../../store/useStore';
import { Search, Filter } from 'lucide-react';

const TransactionFilters = () => {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useStore();

  const categories = ['All', 'Food', 'Transport', 'Rent', 'Salary', 'Utilities', 'Entertainment', 'Shopping'];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // Background and Text now follow the theme variables
          className="w-full pl-10 pr-4 py-2 bg-[var(--bg-main)] border border-[var(--border-card)] text-[var(--text-main)] rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-[var(--text-muted)]"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-[var(--text-muted)]" />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          // Matches the search input styling for consistency
          className="bg-[var(--bg-main)] border border-[var(--border-card)] text-[var(--text-main)] rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
        >
          {categories.map(cat => (
            <option key={cat} value={cat} className="bg-[var(--bg-card)]">
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TransactionFilters;