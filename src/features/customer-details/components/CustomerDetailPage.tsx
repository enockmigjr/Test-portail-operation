import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import {
  ArrowLeft,
  Calendar,
  Building,
  Phone,
  Mail,
  MapPin,
  Laptop,
  CreditCard,
  Ticket,
  UserPlus,
  RefreshCw,
  Wrench,
  Cpu,
  FileText,
  AlertCircle,
  Clock,
  Play,
  Pause,
  Archive,
} from 'lucide-react';
import { useCustomerDetails } from '../hooks/useCustomerDetails';
import { useCustomerActivities } from '../hooks/useCustomerActivities';
import { useAccountAction } from '@/features/operations/hooks/useAccountAction';
import { formatDate } from '@/lib/format';
import { StatusBadge } from '@/components/feedback/StatusBadge';
import { ActionConfirmDialog } from '@/features/operations/components/ActionConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorFallback } from '@/components/feedback/ErrorFallback';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

type ActionType = 'activate' | 'suspend' | 'reopen' | 'archive';

export function CustomerDetailPage() {
  const { customerId } = useParams({ from: '/customers/$customerId' });

  // Chargement des données détaillées et activités via Query hooks
  const { data: customer, isLoading: isDetailsLoading, isError: isDetailsError, refetch: refetchDetails } = useCustomerDetails(customerId);
  const { data: activities, isLoading: isActivitiesLoading, isError: isActivitiesError, refetch: refetchActivities } = useCustomerActivities(customerId);

  // Hook pour les actions opérationnelles
  const { mutateAsync: performAction, isPending: isActionPending } = useAccountAction();

  // État local du dialogue de confirmation d'action
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);

  const handleActionConfirm = async (reason: string) => {
    if (!activeAction) return;

    const actionPromise = performAction({
      customerId,
      action: activeAction,
      reason,
    });

    toast.promise(actionPromise, {
      loading: `Executing ${activeAction} operation...`,
      success: () => {
        setActiveAction(null);
        return `Account ${activeAction}d successfully!`;
      },
      error: `Could not complete the ${activeAction} operation.`,
    });
  };

  // Rendu de l'icône de la timeline selon le type d'événement
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'account_created':
        return <UserPlus className="h-4 w-4 text-emerald-600" />;
      case 'status_change':
        return <RefreshCw className="h-4 w-4 text-indigo-600" />;
      case 'admin_action':
        return <Wrench className="h-4 w-4 text-rose-600" />;
      case 'system_event':
        return <Cpu className="h-4 w-4 text-slate-600" />;
      case 'note_added':
        return <FileText className="h-4 w-4 text-amber-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  // Rendu de la couleur de fond de l'icône de la timeline
  const getTimelineIconBg = (type: string) => {
    switch (type) {
      case 'account_created':
        return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50';
      case 'status_change':
        return 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/50';
      case 'admin_action':
        return 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50';
      case 'system_event':
        return 'bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800/80';
      case 'note_added':
        return 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/20 dark:border-rose-900/50';
      case 'high':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/20 dark:border-amber-900/50';
      case 'medium':
        return 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-900/50';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-900/50 dark:border-slate-800/80';
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-900/50';
      case 'in_progress':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950/20 dark:border-indigo-900/50';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-900/50 dark:border-slate-800/80';
    }
  };

  if (isDetailsError) {
    return (
      <div className="py-12">
        <ErrorFallback
          title="Could not load customer data"
          message="We encountered an issue connecting to the operational API. Please try again."
          onRetry={() => {
            refetchDetails();
            refetchActivities();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Top */}
      <div>
        <Button asChild variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 pl-0">
          <Link to="/customers" search={{ page: 1, limit: 10, search: '', status: 'all', region: 'all', sortBy: 'name', sortOrder: 'asc' }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customer Directory
          </Link>
        </Button>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
            <Building className="h-7 w-7 text-indigo-600" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {isDetailsLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : (
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{customer?.name}</h1>
              )}
              {isDetailsLoading ? (
                <Skeleton className="h-6 w-16 rounded-full" />
              ) : (
                customer && <StatusBadge status={customer.status} />
              )}
            </div>
            {isDetailsLoading ? (
              <Skeleton className="h-4 w-64 mt-2" />
            ) : (
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                <span>ID: {customer?.id}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Created {customer && formatDate(customer.createdAt).split(',')[0]}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Status Actions Bar */}
        {!isDetailsLoading && customer && (
          <div className="flex flex-wrap gap-2.5 items-center">
            {/* Activer */}
            {(customer.status === 'pending' || customer.status === 'suspended') && (
              <Button
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 gap-1.5 shadow-none"
                onClick={() => setActiveAction(customer.status === 'suspended' ? 'reopen' : 'activate')}
                disabled={isActionPending}
              >
                <Play className="h-4 w-4" />
                {customer.status === 'suspended' ? 'Reopen Account' : 'Activate'}
              </Button>
            )}

            {/* Suspendre */}
            {customer.status === 'active' && (
              <Button
                variant="outline"
                className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800 gap-1.5 shadow-none"
                onClick={() => setActiveAction('suspend')}
                disabled={isActionPending}
              >
                <Pause className="h-4 w-4" />
                Suspend Account
              </Button>
            )}

            {/* Archiver */}
            {customer.status !== 'archived' && (
              <Button
                variant="outline"
                className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 gap-1.5 shadow-none"
                onClick={() => setActiveAction('archive')}
                disabled={isActionPending}
              >
                <Archive className="h-4 w-4" />
                Archive
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1/3) - Profile & Technical */}
        <div className="space-y-6 lg:col-span-1">
          {/* Card 1: Customer Profile */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 pb-4">
              <CardTitle className="text-base font-semibold text-slate-800">Customer Profile</CardTitle>
              <CardDescription>Core information regarding the customer identity.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {isDetailsLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))
              ) : (
                customer && (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-slate-400" />
                        {customer.email}
                      </p>
                    </div>

                    <Separator className="border-slate-100" />

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</span>
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {customer.phone}
                      </p>
                    </div>

                    <Separator className="border-slate-100" />

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</span>
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-slate-400" />
                        {customer.company}
                      </p>
                    </div>

                    <Separator className="border-slate-100" />

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Plan</span>
                      <p className="text-sm font-semibold text-indigo-700 flex items-center gap-1.5">
                        <Laptop className="h-4 w-4 text-indigo-400" />
                        {customer.plan} Plan
                      </p>
                    </div>
                  </>
                )
              )}
            </CardContent>
          </Card>

          {/* Card 2: Operational Info */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 pb-4">
              <CardTitle className="text-base font-semibold text-slate-800">Operational metadata</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {isDetailsLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))
              ) : (
                customer && (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Region</span>
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {customer.metadata.region}
                      </p>
                    </div>

                    <Separator className="border-slate-100" />

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Industry</span>
                      <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-slate-400" />
                        {customer.metadata.industry}
                      </p>
                    </div>

                    <Separator className="border-slate-100" />

                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Sync</span>
                      <p className="text-xs font-medium text-slate-500">
                        {formatDate(customer.updatedAt)}
                      </p>
                    </div>
                  </>
                )
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Columns (2/3) - Related Records & Timeline */}
        <div className="space-y-6 lg:col-span-2">
          {/* Card 3: Related Records */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200/60">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                Related Records
              </CardTitle>
              <CardDescription>Active subscriptions and support tickets associated with this account.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-6">
              {/* Sub-Section 1: Subscriptions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" />
                  Subscriptions ({customer?.subscriptions.length || 0})
                </h4>
                {isDetailsLoading ? (
                  <Skeleton className="h-16 w-full" />
                ) : !customer || customer.subscriptions.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No active subscriptions found for this client.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {customer.subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 border border-slate-200 rounded-lg flex flex-col justify-between hover:bg-slate-50/30 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-sm font-semibold text-slate-800 leading-tight">{sub.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border uppercase ${
                              sub.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : sub.status === 'past_due'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {sub.status.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-slate-900 mt-2 block">
                            ${sub.price}{' '}
                            <span className="text-xs font-normal text-slate-400">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium mt-3 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Period end: {formatDate(sub.currentPeriodEnd).split(',')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="border-slate-100" />

              {/* Sub-Section 2: Support Tickets */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="h-4 w-4" />
                  Support Tickets ({customer?.tickets.length || 0})
                </h4>
                {isDetailsLoading ? (
                  <Skeleton className="h-16 w-full" />
                ) : !customer || customer.tickets.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No historical support tickets registered.</p>
                ) : (
                  <div className="space-y-2.5">
                    {customer.tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-3 border border-slate-200 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-slate-50/30 transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="text-sm font-semibold text-slate-800 leading-tight block">{ticket.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                              ID: {ticket.id}
                            </span>
                            <span className="text-[10px] text-slate-300">•</span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              Opened {formatDate(ticket.createdAt).split(',')[0]}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Priority badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          {/* Status badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getTicketStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Activity History Timeline */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200/60">
              <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                Activity Timeline
              </CardTitle>
              <CardDescription>Chronological audit log of operations, system events, and notes.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isActivitiesLoading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="flex gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : isActivitiesError ? (
                <ErrorFallback title="Timeline load failed" onRetry={refetchActivities} />
              ) : !activities || activities.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No records in the timeline yet.</p>
              ) : (
                /* Timeline structure */
                <div className="relative pl-6 space-y-6 border-l-2 border-slate-200/70 ml-3">
                  {activities.map((act) => (
                    <div key={act.id} className="relative group/timeline-item">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-10 top-0.5 rounded-full border-2 p-1.5 flex items-center justify-center shadow-sm shrink-0 h-8 w-8 ${getTimelineIconBg(act.type)}`}>
                        {getTimelineIcon(act.type)}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-sm font-semibold text-slate-800 leading-tight">
                            {act.description}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            {formatDate(act.timestamp)}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          Performed by <span className="font-semibold text-slate-600">{act.performedBy}</span>
                        </span>
                        
                        {/* Event Reason if present */}
                        {act.metadata?.reason && (
                          <div className="mt-2 p-2 border border-slate-100 rounded-md bg-slate-50 text-xs text-slate-600 italic flex items-start gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <span>Justification: "{act.metadata.reason}"</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialogue */}
      {activeAction && (
        <ActionConfirmDialog
          action={activeAction}
          isOpen={!!activeAction}
          onClose={() => setActiveAction(null)}
          onConfirm={handleActionConfirm}
          isPending={isActionPending}
        />
      )}
    </div>
  );
}


export default CustomerDetailPage;
