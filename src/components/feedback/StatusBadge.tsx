import { Badge } from '@/components/ui/badge';
import type { CustomerStatus } from '@/types/customer';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: CustomerStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const configs: Record<CustomerStatus, { label: string; class: string }> = {
    active: {
      label: 'Active',
      class: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
    },
    suspended: {
      label: 'Suspended',
      class: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50',
    },
    pending: {
      label: 'Pending',
      class: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50',
    },
    archived: {
      label: 'Archived',
      class: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800/80',
    },
  };

  const config = configs[status] || { label: status, class: '' };

  return (
    <Badge
      variant="outline"
      className={cn('px-2.5 py-0.5 rounded-full font-medium text-xs border shadow-sm', config.class, className)}
    >
      {config.label}
    </Badge>
  );
}

export default StatusBadge;
