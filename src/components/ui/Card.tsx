interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card = ({ children, title, className = "" }: CardProps) => (
  <div className={`
    bg-[var(--bg-card)] 
    border border-[var(--bg-card-border)] 
    rounded-xl shadow-sm p-6 
    transition-all duration-300
    ${className}
  `}>
    {title && (
      <h3 className="text-sm font-semibold text-[var(--text-muted)] mb-4 uppercase tracking-wider">
        {title}
      </h3>
    )}
    {children}
  </div>
);