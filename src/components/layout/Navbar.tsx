import { useStore } from '../../store/useStore';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  Globe, 
  Sun, 
  Moon, 
  ChevronDown, 
  DatabaseZap 
} from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { 
    role, 
    searchQuery, 
    setSearchQuery, 
    currency, 
    setCurrency, 
    isLoadingRates,
    isDarkMode,
    toggleDarkMode,
    userName 
  } = useStore();

  const userInitial = userName ? userName.trim().charAt(0).toUpperCase() : null;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* 1. LEFT SECTION: MOBILE MENU & BRANDING */}
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="p-2 mr-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden transition-all active:scale-90"
            aria-label="Open Menu"
          >
            <Menu size={22} />
          </button>
          
          <div className="lg:hidden flex items-center gap-2.5 group">
             <div className="relative w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <DatabaseZap size={16} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
               <span className="font-black text-slate-900 dark:text-white text-sm tracking-tighter uppercase leading-none">Zorvyn</span>
               <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Hub</span>
             </div>
          </div>
        </div>

        {/* 2. CENTER SECTION: GLOBAL SEARCH */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="relative w-full max-w-md hidden sm:block group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search ledger records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 pl-11 pr-4 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 3. RIGHT SECTION: ACTIONS & IDENTITY */}
        <div className="flex items-center gap-2 md:gap-5">
          
          {/* CURRENCY SELECTOR: Advanced Theme Fix */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <Globe size={14} className={isLoadingRates ? "animate-spin text-blue-500" : "text-slate-400"} />
            <div className="relative flex items-center">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-[11px] font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer uppercase appearance-none pr-5 z-10"
              >
                <option value="USD" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">USD</option>
                <option value="INR" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">INR</option>
                <option value="EUR" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EUR</option>
                <option value="GBP" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">GBP</option>
              </select>
              <ChevronDown size={10} className="absolute right-0 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* THEME TOGGLE */}
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* PROFILE & ROLE: The "Advanced" Section */}
          <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800 ml-2">
            <div className="hidden xl:flex flex-col items-end justify-center">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">
                {userName || 'OPERATOR_01'}
              </span>

              {/* Dynamic Status Badge */}
              <div className={`
                relative flex items-center gap-2 px-2.5 py-0.5 rounded-full border
                backdrop-blur-md transition-all duration-500
                ${role === 'admin' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-[0_0_12px_-3px_rgba(16,185,129,0.3)]' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-[0_0_12px_-3px_rgba(245,158,11,0.3)]'
                }
              `}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${role === 'admin' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${role === 'admin' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.15em] font-mono">
                  {role === 'admin' ? 'System Admin' : 'Read Only'}
                </span>
              </div>
            </div>

            {/* Avatar with Glow Effect */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-60 transition duration-500 blur-sm"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg border border-slate-200 dark:border-slate-700 cursor-pointer transition-all active:scale-95">
                {userInitial || <User size={20} />}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;