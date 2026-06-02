import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ActionType = 'activate' | 'suspend' | 'reopen' | 'archive';

interface ActionConfirmDialogProps {
  action: ActionType | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isPending?: boolean;
}

export function ActionConfirmDialog({
  action,
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: ActionConfirmDialogProps) {
  // Déterminer si l'action nécessite une raison stricte
  const isReasonStrict = action === 'suspend' || action === 'archive';

  // Schéma de validation dynamique
  const schema = z.object({
    reason: isReasonStrict
      ? z.string().min(10, 'Please provide a detailed reason of at least 10 characters.')
      : z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit = (data: FormData) => {
    onConfirm(data.reason || 'Operational action performed.');
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const configs: Record<ActionType, { title: string; desc: string; buttonClass: string; confirmLabel: string }> = {
    activate: {
      title: 'Activate Account',
      desc: 'Are you sure you want to activate this account? The customer will regain full access to their platform services immediately.',
      buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      confirmLabel: 'Activate',
    },
    suspend: {
      title: 'Suspend Account',
      desc: 'Are you sure you want to suspend this account? Access to subscriptions and features will be frozen. A clear operational justification is required.',
      buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white',
      confirmLabel: 'Suspend Account',
    },
    reopen: {
      title: 'Reopen Account',
      desc: 'Are you sure you want to reopen this previously suspended account? Services and active subscriptions will be re-enabled.',
      buttonClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      confirmLabel: 'Reopen Account',
    },
    archive: {
      title: 'Archive Account',
      desc: 'WARNING: Archiving is a final state. The account will be closed, all active subscriptions canceled, and history kept for audit. This action cannot be undone.',
      buttonClass: 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-slate-100',
      confirmLabel: 'Archive Permanently',
    },
  };

  const config = action ? configs[action] : null;

  if (!config) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">
              {config.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 pt-2 leading-normal">
              {config.desc}
            </DialogDescription>
          </DialogHeader>

          {/* Justification Field */}
          <div className="space-y-1.5">
            <label htmlFor="reason" className="text-xs font-semibold text-slate-700">
              Operational Justification {isReasonStrict ? <span className="text-red-500">*</span> : <span className="text-slate-400 font-normal">(optional)</span>}
            </label>
            <Input
              id="reason"
              placeholder={isReasonStrict ? "e.g., Unpaid invoices for May 2026..." : "e.g., Client requested upgrade..."}
              className="border-slate-200"
              {...register('reason')}
              disabled={isPending}
            />
            {errors.reason && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
              className="border-slate-200 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={config.buttonClass}
              disabled={isPending}
            >
              {isPending ? 'Processing...' : config.confirmLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ActionConfirmDialog;
