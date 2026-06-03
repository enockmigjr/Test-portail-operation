import { useState, useEffect } from 'react';
import { useSearch, useNavigate, Link } from '@tanstack/react-router';
import {
  Search as SearchIcon,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useCustomers } from '../hooks/useCustomers';
import { formatDate } from '@/lib/format';
import { StatusBadge } from '@/components/feedback/StatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorFallback } from '@/components/feedback/ErrorFallback';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import type { CustomerStatus } from '@/types/customer';

const REGIONS = ['all', 'North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa'];

export function CustomersPage() {
  const searchParams = useSearch({ from: '/customers' });
  const navigate = useNavigate({ from: '/customers' });

  // État local de la recherche pour le debouncing
  const [localSearch, setLocalSearch] = useState(searchParams.search || '');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
  if (debouncedSearch !== searchParams.search) {
    navigate({
      search: (prev) => ({
        ...prev,
        search: debouncedSearch,
        page: 1,
      }),
    });
  }
}, [debouncedSearch, navigate, searchParams.search]);

  // Requête API via React Query
  const { data, isLoading, isError, refetch } = useCustomers(searchParams);

  // Gestion des changements de filtres
  const handleStatusChange = (value: string) => {
    navigate({
      search: {
        ...searchParams,
        status: value as CustomerStatus | 'all',
        page: 1,
      },
    });
  };

  const handleRegionChange = (value: string) => {
    navigate({
      search: {
        ...searchParams,
        region: value,
        page: 1,
      },
    });
  };

  const handlePageChange = (newPage: number) => {
    if (!data) return;
    if (newPage < 1 || newPage > data.totalPages) return;
    navigate({
      search: {
        ...searchParams,
        page: newPage,
      },
    });
  };

  const handleSort = (field: string) => {
    const isCurrentField = searchParams.sortBy === field;
    const newOrder = isCurrentField && searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
    
    navigate({
      search: {
        ...searchParams,
        sortBy: field,
        sortOrder: newOrder,
        page: 1,
      },
    });
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    navigate({
      search: {
        page: 1,
        limit: 10,
        search: '',
        status: 'all',
        region: 'all',
        sortBy: 'name',
        sortOrder: 'asc',
      },
    });
  };

  // Rendu de l'en-tête de colonne avec icône de tri accessible au clavier
  const renderSortableHead = (field: string, label: string) => {
    const isSorted = searchParams.sortBy === field;
    const sortDirection = searchParams.sortOrder;
    const ariaSort = isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none';

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSort(field);
      }
    };

    return (
      <TableHead
        role="columnheader"
        tabIndex={0}
        aria-sort={ariaSort}
        className="cursor-pointer select-none hover:text-slate-900 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm"
        onClick={() => handleSort(field)}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-1.5 font-semibold">
          {label}
          <ArrowUpDown className={cn(
            "h-3.5 w-3.5 transition-colors",
            isSorted ? "text-indigo-600" : "text-slate-300 group-hover:text-slate-400"
          )} />
        </div>
      </TableHead>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customer Directory</h1>
        <p className="text-sm text-slate-500 mt-1">
          Search, filter, and operations-manage your organization's customer accounts.
        </p>
      </div>

      {/* Filters Panel */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
              <Input
                key={searchParams.search || 'empty'}
                placeholder="Search by name, email or company..."
                className="pl-10 border-slate-200 focus-visible:ring-indigo-500"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>

            {/* Filter selectors */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
              <div className="w-full sm:w-40">
                <Select value={searchParams.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-48">
                <Select value={searchParams.region} onValueChange={handleRegionChange}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region === 'all' ? 'All Regions' : region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reset button */}
              {(searchParams.search || searchParams.status !== 'all' || searchParams.region !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-slate-900 gap-1.5"
                  onClick={handleResetFilters}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-slate-200 hover:bg-transparent">
                {renderSortableHead('name', 'Customer')}
                <TableHead className="font-semibold">Company</TableHead>
                {renderSortableHead('status', 'Status')}
                {renderSortableHead('createdAt', 'Created At')}
                {renderSortableHead('activeItems', 'Active Items')}
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // Skeletons de chargement
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx} className="border-slate-100">
                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-52" />
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                // Fallback en cas d'erreur
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <ErrorFallback onRetry={refetch} />
                  </TableCell>
                </TableRow>
              ) : !data || data.data.length === 0 ? (
                // État vide
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <EmptyState
                      title="No customers found"
                      description="We couldn't find any customer matching your selected criteria. Try changing your filters."
                      actionLabel="Clear filters"
                      onAction={handleResetFilters}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                // Rendu des clients
                data.data.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-slate-100 hover:bg-slate-50/50 transition-colors group/row"
                  >
                    <TableCell className="py-4 font-medium text-slate-900">
                      <div className="flex flex-col">
                        <Link
                          to="/customers/$customerId"
                          params={{ customerId: customer.id }}
                          className="hover:text-indigo-600 transition-colors font-semibold"
                        >
                          {customer.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-normal mt-0.5">{customer.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">{customer.company}</TableCell>
                    <TableCell>
                      <StatusBadge status={customer.status} />
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">{formatDate(customer.createdAt)}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {customer.activeItems}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm" className="shadow-none hover:bg-slate-100">
                        <Link to="/customers/$customerId" params={{ customerId: customer.id }}>
                          Inspect
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {data && data.totalPages > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
            <div className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">
                {(data.page - 1) * data.limit + 1}
              </span>{' '}
              to{' '}
              <span className="font-semibold text-slate-700">
                {Math.min(data.page * data.limit, data.total)}
              </span>{' '}
              of <span className="font-semibold text-slate-700">{data.total}</span> customers
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-slate-600 border-slate-200"
                onClick={() => handlePageChange(data.page - 1)}
                disabled={data.page === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium text-slate-700">
                Page {data.page} of {data.totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 text-slate-600 border-slate-200"
                onClick={() => handlePageChange(data.page + 1)}
                disabled={data.page === data.totalPages || isLoading}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default CustomersPage;
