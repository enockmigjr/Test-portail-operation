import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({
  title = 'An error occurred',
  message = 'We encountered an error while loading this data. Please try again.',
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl bg-red-50/50 border border-red-100">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 border border-red-200 text-red-600 mb-4 shadow-sm">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-1">{title}</h3>
      <p className="text-sm text-red-700 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="destructive" size="sm" className="shadow-sm">
          Retry Request
        </Button>
      )}
    </div>
  );
}

export default ErrorFallback;
