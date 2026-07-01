import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, icon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-textMuted">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-textMuted pointer-events-none">
              {icon}
            </div>
          )}
          <select
            className={cn(
              "w-full h-12 rounded-xl px-4 py-3 text-sm font-medium appearance-none",
              "glass-input",
              "bg-surface select-none pr-10",
              icon ? "pl-11" : "",
              error ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger/20" : "",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface text-text">
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron icon for Select */}
          <div className="absolute right-3.5 text-textMuted pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-xs font-medium text-danger transition-all duration-200">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
