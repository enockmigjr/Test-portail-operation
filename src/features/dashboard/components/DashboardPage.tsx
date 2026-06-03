import {
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity as ActivityIcon,
  RefreshCw,
  UserPlus,
  Wrench,
  Cpu,
  FileText,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorFallback } from '@/components/feedback/ErrorFallback';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = {
  active: '#10b981', // emerald-500
  suspended: '#f43f5e', // rose-500
  pending: '#f59e0b', // amber-500
  archived: '#64748b', // slate-500
};

export function DashboardPage() {
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  const kpiConfig = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers,
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/50',
      description: 'Active accounts database',
    },
    {
      title: 'Active Accounts',
      value: stats?.activeCustomers,
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50',
      description: 'Actively using platform',
    },
    {
      title: 'Suspended Accounts',
      value: stats?.suspendedCustomers,
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/50',
      description: 'Frozen due to policy/billing',
    },
    {
      title: 'Pending Onboarding',
      value: stats?.pendingCustomers,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50',
      description: 'Awaiting activation',
    },
  ];


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

  const getTimelineIconBg = (type: string) => {
    switch (type) {
      case 'account_created':
        return 'bg-emerald-50 border-emerald-200';
      case 'status_change':
        return 'bg-indigo-50 border-indigo-200';
      case 'admin_action':
        return 'bg-rose-50 border-rose-200';
      case 'system_event':
        return 'bg-slate-50 border-slate-200';
      case 'note_added':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  // Convertir la distribution des statuts pour le Pie Chart
  const pieData = stats
    ? stats.statusDistribution.map((item) => ({
        name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        value: item.count,
        color: COLORS[item.status] || '#cbd5e1',
      }))
    : [];

  if (isError) {
    return (
      <div className="py-12">
        <ErrorFallback
          title="Could not load dashboard statistics"
          message="We encountered an issue while calling the metrics API. Please try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time metrics, status distribution, and operational operations logging.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Card key={idx} className="shadow-sm border-slate-200">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3.5 w-32" />
                  </div>
                  <Skeleton className="h-11 w-11 rounded-xl" />
                </CardContent>
              </Card>
            ))
          : kpiConfig.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <Card key={idx} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span>{kpi.description}</span>
                      </p>
                    </div>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center border shrink-0 ${kpi.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth area chart (2/3) */}
        <Card className="shadow-sm border-slate-200 lg:col-span-2">
          <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200/60">
            <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <ActivityIcon className="h-4 w-4 text-indigo-500" />
              Customer Database Growth
            </CardTitle>
            <CardDescription>Accounts created on the platform over the last months.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            {isLoading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : stats && stats.customersByMonth.length > 0 ? (
              <div className="h-[280px] w-full overflow-x-auto overflow-y-hidden md:overflow-hidden">
                <div className="h-full min-w-[600px] md:min-w-0 w-full">
                  <ResponsiveContainer width="100%" height={280} minWidth={0} minHeight={0}>
                    <AreaChart data={stats.customersByMonth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs text-slate-400 font-medium" />
                      <YAxis tickLine={false} axisLine={false} className="text-xs text-slate-400 font-medium" />
                      <Tooltip
                        contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorGrowth)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-slate-400 italic">
                No growth data available.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Status distribution (1/3) */}
        <Card className="shadow-sm border-slate-200 lg:col-span-1">
          <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200/60">
            <CardTitle className="text-base font-semibold text-slate-800">Account Statuses</CardTitle>
            <CardDescription>Current division of account settings.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-6">
            {isLoading ? (
              <Skeleton className="h-[280px] w-full rounded-full" />
            ) : stats && pieData.length > 0 ? (
              <div className="h-[280px] w-full flex flex-col justify-between">
                <div className="h-[200px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height={200} minWidth={0} minHeight={0}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold px-4 pb-2">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-slate-600 truncate">{entry.name}</span>
                      <span className="text-slate-400 font-bold ml-auto">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-slate-400 italic">
                No status data.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Activity timeline */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-200/60 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-slate-800">Recent Operations Log</CardTitle>
            <CardDescription>Live feed of operations activities performed across all accounts.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm" className="shadow-none gap-1 bg-white hover:bg-slate-100">
            <Link to="/customers" search={{ page: 1, limit: 10, search: '', status: 'all', region: 'all', sortBy: 'name', sortOrder: 'asc' }}>
              Inspect Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3.5 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : !stats || stats.recentActivities.length === 0 ? (
            <div className="text-center py-6 text-slate-400 italic">
              No recent activities registered.
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 ml-3">
              {stats.recentActivities.map((act) => (
                <div key={act.id} className="relative">
                  {/* Dot icon */}
                  <div className={`absolute -left-10 top-0.5 rounded-full border-2 p-1.5 flex items-center justify-center shadow-sm shrink-0 h-8 w-8 ${getTimelineIconBg(act.type)}`}>
                    {getTimelineIcon(act.type)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="text-sm font-semibold text-slate-800 leading-tight">
                        {act.description}
                        <Link
                          to="/customers/$customerId"
                          params={{ customerId: act.customerId }}
                          className="text-xs text-indigo-600 hover:underline font-bold ml-2"
                        >
                          (View customer)
                        </Link>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 shrink-0">
                        {formatDate(act.timestamp)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Performed by <span className="font-semibold text-slate-600">{act.performedBy}</span>
                    </span>
                    {act.metadata?.reason && (
                      <span className="inline-block mt-1 text-[11px] text-slate-500 italic bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                        Justification: "{act.metadata.reason}"
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;
