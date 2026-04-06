import { useStore, type TabID } from '../../store/useStore';
import { 
  LayoutDashboard, 
  ReceiptText, 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert,
  DatabaseZap, // Fintech Icon Option 1
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { role, setRole, activeTab, setActiveTab } = useStore();

  const menuItems: { name: string; icon: any; id: TabID }[] = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { name: 'Transactions', icon: ReceiptText, id: 'transactions' },
    { name: 'Insights', icon: TrendingUp, id: 'insights' },
  ];

  // Helper to handle tab clicks on mobile
  const handleTabClick = (id: TabID) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <>
      {/* 1. Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-900 dark:bg-black text-slate-300 flex flex-col shadow-2xl border-r border-slate-800
        transition-transform duration-300 ease-in-out h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* 2.1 Brand Logo Area - FinTech Refinement */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            {/* FINTECH LOGO: Option 1 - The Data Node */}
            <div className="relative flex items-center justify-center h-10 w-10">
              {/* Outer Pulse/Glow */}
              <div className="absolute inset-0 bg-blue-600/30 rounded-xl blur-lg animate-pulse group-hover:bg-blue-600/50" />
              
              {/* Main Square Container */}
              <div className="relative h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <DatabaseZap size={22} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* BRAND NAME */}
            <div className="flex flex-col min-w-max">
              <span className="text-xl font-black text-white tracking-tighter uppercase leading-none">
                Zorvyn
              </span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-0.5 opacity-80">
                Fintech Hub
              </span>
            </div>
          </div>
          
          {/* Close button visible only on Mobile */}
          <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* 2.2 Navigation */}
        <nav className="flex-1 px-4 py-7 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                w-full flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white group'}
              `}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
              <span className="font-semibold text-sm tracking-wide">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* 2.3 Role Switcher Section */}
        <div className="p-4 m-4 mb-8 bg-slate-800/20 rounded-2xl border border-slate-800/50 shadow-inner">
          <div className="flex items-center gap-2 mb-3.5 px-1">
            {role === 'admin' ? 
              <ShieldCheck size={14} className="text-emerald-400" /> : 
              <ShieldAlert size={14} className="text-amber-400" />
            }
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Access Control</span>
          </div>
          
          <div className="relative">
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'viewer')}
              className="w-full bg-slate-950 border border-slate-700 text-xs font-bold rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-600/50 transition-all cursor-pointer appearance-none text-center pr-2"
            >
              <option value="admin">Admin Access</option>
              <option value="viewer">Viewer Mode</option>
            </select>
          </div>
          
          <div className="mt-3.5 flex items-center justify-center gap-1.5 opacity-60">
            <div className={`w-1 h-1 rounded-full ${role === 'admin' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
              {role === 'admin' ? 'Full Write Access' : 'Read Only Mode'}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;