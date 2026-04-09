import * as React from 'react';
import { cn } from '@/lib/utils';

const baseClass =
  'h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20';

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(baseClass, className)} {...props}>
    {children}
  </select>
));

Select.displayName = 'Select';
