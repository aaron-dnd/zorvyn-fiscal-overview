import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PageWrapper = ({ children, title, subtitle }: PageWrapperProps) => {
  return (
    /* 1. Added max-w and padding for a polished layout */
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 md:px-0">
      
      <header className="relative">
        {/* 2. Added dark:text-white for the main heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
          {title}
        </h1>
        
        {/* 3. Added dark:text-slate-400 for the subtitle */}
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium italic border-l-2 border-blue-500/20 pl-4 transition-colors duration-300">
            {subtitle}
          </p>
        )}
      </header>
      
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;