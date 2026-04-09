import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'female'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'muted';

const variants: Record<BadgeVariant, string> = {
  default:
    'bg-purple-50/70 text-purple-600 dark:bg-purple-950/60 dark:text-purple-200',
  female: 'bg-pink-50/80 text-pink-700 dark:bg-pink-950/70 dark:text-pink-200',
  success:
    'bg-green-50/70 text-green-600 dark:bg-green-950/60 dark:text-green-200',
  danger: 'bg-red-50/70 text-red-600 dark:bg-red-950/60 dark:text-red-200',
  warning: 'bg-blue-50/70 text-blue-600 dark:bg-blue-950/60 dark:text-blue-200',
  info: 'bg-sky-50/70 text-sky-600 dark:bg-sky-950/60 dark:text-sky-200',
  muted:
    'bg-slate-100/80 text-slate-600 dark:bg-slate-900/70 dark:text-slate-200',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const baseClass =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-none';

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(baseClass, variants[variant], className)}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';
