import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Pencil, Check, Activity } from 'lucide-react';

const WelcomeHeader = () => {
  const { userName, setUserName, activeTab } = useStore();
  const [isEditing, setIsEditing] = useState(!userName);
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <header className="mb-6 md:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Title Section: Responsive text sizes */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
          {activeTab === 'dashboard' ? 'Financial Executive Summary' : `${activeTab} Analysis`}
        </h2>
        
        {/* Desktop-only Badge: Adds that "Advanced" FinTech feel */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Activity size={12} className="text-blue-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Live Feed
          </span>
        </div>
      </div>

      {/* Subtitle / Greeting Section */}
      <div className="mt-2 flex items-start md:items-center gap-2">
        {isEditing ? (
          <div className="flex flex-wrap items-center gap-2 animate-in zoom-in-95 duration-200">
            <span className="text-sm md:text-base text-slate-500 dark:text-slate-400">
              Identity:
            </span>
            <div className="relative">
              <input
                autoFocus
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSave}
                className="bg-slate-100 dark:bg-slate-800/50 border-b-2 border-blue-500 outline-none text-slate-900 dark:text-white font-bold px-2 py-0.5 rounded-t-md w-32 md:w-48 text-sm md:text-base transition-all focus:bg-blue-500/5"
              />
              <Check 
                size={18} 
                className="absolute -right-7 top-1/2 -translate-y-1/2 text-emerald-500 cursor-pointer hover:scale-110 transition-transform" 
                onClick={handleSave} 
              />
            </div>
          </div>
        ) : (
          <div 
            className="group cursor-pointer flex flex-col md:flex-row md:items-center gap-x-2"
            onClick={() => setIsEditing(true)}
          >
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              Welcome back, <span className="text-slate-900 dark:text-white font-bold inline-flex items-center gap-1">
                {userName}
                <Pencil size={12} className="opacity-0 group-hover:opacity-100 transition-all text-blue-500 translate-y-0 group-hover:-translate-y-0.5" />
              </span>
              <span className="hidden sm:inline mx-1">|</span>
              <span className="block sm:inline opacity-80 md:opacity-100">
                Monitoring fiscal health in real-time.
              </span>
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default WelcomeHeader;