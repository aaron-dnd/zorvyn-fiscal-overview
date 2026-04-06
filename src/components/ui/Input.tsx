import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 bg-slate-50 border rounded-xl outline-none transition-all
          focus:ring-2 focus:ring-blue-100 focus:bg-white
          ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-red-500 ml-1">{error}</p>
      )}
    </div>
  );
};