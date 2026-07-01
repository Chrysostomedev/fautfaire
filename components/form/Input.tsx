import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-textMuted">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-textMuted">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "w-full h-12 rounded-xl px-4 py-3 text-sm font-medium",
              "glass-input",
              icon ? "pl-11" : "",
              error ? "border-danger focus:border-danger focus:ring-1 focus:ring-danger/20" : "",
              className
            )}
            ref={ref}
            {...props}
          />
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

Input.displayName = "Input";
