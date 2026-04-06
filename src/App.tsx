import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import { useStore } from './store/useStore';

// Feature Components
import StatsGrid from './features/dashboard/StatsGrid';
import BalanceChart from './features/dashboard/BalanceChart';
import CategoryChart from './features/dashboard/CategoryChart';
import TransactionTable from './features/transactions/TransactionTable';
import AddTransactionModal from './features/transactions/AddTransactionModal';
import SpendingInsights from './features/insights/SpendingInsights';
import WelcomeHeader from './components/layout/WelcomeHeader';

function App() {
  const { role, activeTab, isDarkMode } = useStore(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. MOBILE SIDEBAR STATE
  // This state controls the drawer visibility on mobile/tablet.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Theme Sync Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* 2. RESPONSIVE SIDEBAR 
          Pass the state and closer function as props. 
          The 'hidden lg:flex' wrapper is no longer needed because the Sidebar 
          internal logic handles 'lg:static' now. */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="relative flex flex-1 flex-col h-full overflow-hidden">
        
        {/* 3. NAVBAR 
            Pass the opener function to the Hamburger button inside Navbar. */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
            <section className="space-y-8 md:space-y-10">
              
              <WelcomeHeader />
              <StatsGrid />

              <div className="transition-all duration-300">
                {/* 1. DASHBOARD VIEW */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500">
                    <SpendingInsights />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      <BalanceChart />
                      <CategoryChart />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                        Recent Activity
                      </h3>
                      <TransactionTable />
                    </div>
                  </div>
                )}

                {/* 2. TRANSACTIONS VIEW */}
                {activeTab === 'transactions' && (
                  <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                        Global Transaction Ledger
                      </h3>
                      {role === 'admin' && (
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <span className="text-lg">+</span> Add Record
                        </button>
                      )}
                    </div>
                    <TransactionTable />
                  </div>
                )}

                {/* 3. INSIGHTS VIEW */}
                {activeTab === 'insights' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                    <SpendingInsights />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      <CategoryChart />
                      <BalanceChart />
                    </div>
                  </div>
                )}
              </div>
            </section>
            
            <footer className="mt-16 md:mt-20 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-400 dark:text-slate-500 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">
                Fiscal Overview • Enterprise Grade Analytics
              </p>
            </footer>
          </div>
        </main>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;