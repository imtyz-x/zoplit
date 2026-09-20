'use client';

import { Fragment, useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { ChevronDown, Download, Inbox, Loader2, LogOut, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type Status = 'New' | 'Contacted' | 'Verified' | 'Rejected';
type StatusFilter = 'All' | Status;
type TabKind = 'applications' | 'leads';

const STATUSES: Status[] = ['New', 'Contacted', 'Verified', 'Rejected'];

const STATUS_CLASS: Record<Status, string> = {
  New: 'border-primary/40 bg-primary/10 text-primary',
  Contacted: 'border-blue-400/40 bg-blue-500/10 text-blue-300',
  Verified: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
  Rejected: 'border-white/15 bg-white/5 text-muted-foreground',
};

type Row = Record<string, unknown> & {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  status?: string;
  created_at?: string;
  sample_urls?: string[] | string | null;
};

const APP_CSV_FIELDS = [
  'name',
  'phone',
  'email',
  'city',
  'primary_skill',
  'experience',
  'gear',
  'expected_pay',
  'availability',
  'travel_ok',
  'portfolio_url',
  'instagram',
  'how_heard',
  'intro',
  'consent',
  'age_confirmed',
  'status',
  'created_at',
] as const;

const LEAD_CSV_FIELDS = [
  'name',
  'phone',
  'email',
  'service',
  'budget',
  'who_for',
  'project_details',
  'usage',
  'deadline',
  'location',
  'hired_before',
  'business_handle',
  'how_heard',
  'status',
  'created_at',
] as const;

export function AdminDashboard({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<TabKind>('applications');
  const [applications, setApplications] = useState<Row[]>([]);
  const [leads, setLeads] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [loadError, setLoadError] = useState('');

  const loadRows = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const [appsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/applications'),
        fetch('/api/admin/leads'),
      ]);
      if (appsRes.status === 401 || leadsRes.status === 401) {
        setAuthed(false);
        return;
      }
      const appsJson = await appsRes.json();
      const leadsJson = await leadsRes.json();
      if (!appsRes.ok) throw new Error(appsJson.error || 'Failed to load applications');
      if (!leadsRes.ok) throw new Error(leadsJson.error || 'Failed to load leads');
      setApplications(appsJson.rows || []);
      setLeads(leadsJson.rows || []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not load admin data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadRows();
  }, [authed, loadRows]);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setLoginError(json.error || 'Incorrect password');
        return;
      }
      setPassword('');
      setAuthed(true);
    } catch {
      setLoginError('Could not sign in');
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setApplications([]);
    setLeads([]);
  };

  const updateStatus = async (table: 'creator_applications' | 'leads', id: string, status: Status) => {
    const previousApps = applications;
    const previousLeads = leads;
    const apply = (rows: Row[]) =>
      rows.map((row) => (String(row.id) === id ? { ...row, status } : row));
    if (table === 'creator_applications') setApplications(apply);
    else setLeads(apply);

    const res = await fetch('/api/admin/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, status }),
    });
    if (!res.ok) {
      setApplications(previousApps);
      setLeads(previousLeads);
    }
  };

  const stats = useMemo(
    () => ({
      newLeads: leads.filter((row) => normalizeStatus(row.status) === 'New').length,
      newApps: applications.filter((row) => normalizeStatus(row.status) === 'New').length,
      totalLeads: leads.length,
      totalCreators: applications.length,
    }),
    [applications, leads]
  );

  const rows = tab === 'applications' ? applications : leads;

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const name = String(row.name || '').toLowerCase();
      const phone = String(row.phone || '').toLowerCase();
      const email = String(row.email || '').toLowerCase();
      return name.includes(q) || phone.includes(q) || email.includes(q);
    });
  }, [query, rows]);

  const statusCounts = useMemo(() => {
    const counts: Record<Status, number> = {
      New: 0,
      Contacted: 0,
      Verified: 0,
      Rejected: 0,
    };
    searched.forEach((row) => {
      counts[normalizeStatus(row.status)] += 1;
    });
    return counts;
  }, [searched]);

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return searched;
    return searched.filter((row) => normalizeStatus(row.status) === statusFilter);
  }, [searched, statusFilter]);

  const exportCsv = () => {
    const fields = tab === 'applications' ? APP_CSV_FIELDS : LEAD_CSV_FIELDS;
    const header = fields.join(',');
    const lines = filtered.map((row) =>
      fields.map((field) => csvEscape(csvValue(row[field]))).join(',')
    );
    const csv = [header, ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zoplit-${tab}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (!authed) {
    return (
      <section className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-xl border border-subtle bg-card p-6 sm:p-8"
        >
          <h1 className="mb-1 text-xl font-semibold">Zoplit admin</h1>
          <p className="mb-6 text-sm text-muted-foreground">Enter the admin password to continue.</p>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>
          {loginError && <p className="mt-3 text-sm text-destructive">{loginError}</p>}
          <Button
            type="submit"
            disabled={loggingIn}
            className="mt-6 h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loggingIn ? <Loader2 className="animate-spin" size={18} /> : 'Sign in'}
          </Button>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-muted-foreground">Creator applications and project leads.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button variant="outline" onClick={exportCsv} className="min-h-[44px] w-full sm:w-auto">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={logout} className="min-h-[44px] w-full sm:w-auto">
            <LogOut size={16} className="mr-2" />
            Log out
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="New Leads" value={stats.newLeads} accent />
        <StatCard label="New Applications" value={stats.newApps} accent />
        <StatCard label="Total Leads" value={stats.totalLeads} />
        <StatCard label="Total Creators" value={stats.totalCreators} />
      </div>

      <Tabs
        value={tab}
        onValueChange={(value) => {
          setTab(value as TabKind);
          setStatusFilter('All');
        }}
      >
        <TabsList className="h-auto w-full flex-wrap justify-start bg-card">
          <TabsTrigger value="applications">Creator Applications</TabsTrigger>
          <TabsTrigger value="leads">Project Leads</TabsTrigger>
        </TabsList>
        <div className="relative my-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or phone"
            className="min-h-[44px] pl-9"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterChip
            label={`All (${searched.length})`}
            selected={statusFilter === 'All'}
            onClick={() => setStatusFilter('All')}
          />
          {STATUSES.map((status) => (
            <FilterChip
              key={status}
              label={`${status} (${statusCounts[status]})`}
              selected={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            />
          ))}
        </div>
        {loadError && <p className="mb-4 text-sm text-destructive">{loadError}</p>}
        <TabsContent value="applications">
          <DataTable
            kind="applications"
            rows={filtered}
            loading={loading}
            onRefresh={loadRows}
            onStatus={(id, status) => updateStatus('creator_applications', id, status)}
          />
        </TabsContent>
        <TabsContent value="leads">
          <DataTable
            kind="leads"
            rows={filtered}
            loading={loading}
            onRefresh={loadRows}
            onStatus={(id, status) => updateStatus('leads', id, status)}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-subtle bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('mt-1 text-2xl font-semibold', accent && 'text-primary')}>{value}</p>
    </div>
  );
}

function FilterChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors',
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-subtle bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
      )}
    >
      {label}
    </button>
  );
}

function DataTable({
  kind,
  rows,
  loading,
  onStatus,
  onRefresh,
}: {
  kind: TabKind;
  rows: Row[];
  loading: boolean;
  onStatus: (id: string, status: Status) => void;
  onRefresh: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setExpanded(null);
  }, [kind]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="mr-2 animate-spin" size={18} />
        Loading…
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-full max-w-sm rounded-xl border border-subtle bg-card px-6 py-10 text-center">
          <Inbox size={28} className="mx-auto mb-3 text-primary" />
          <p className="font-medium">No {kind === 'leads' ? 'leads' : 'applications'} here yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            New submissions will appear here automatically.
          </p>
          <Button
            type="button"
            onClick={onRefresh}
            className="mt-5 min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-subtle">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-card text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="w-10 px-2 py-3 font-medium"> </th>
            <th className="px-3 py-3 font-medium">Name</th>
            <th className="px-3 py-3 font-medium">Phone</th>
            <th className="px-3 py-3 font-medium">Key detail</th>
            <th className="px-3 py-3 font-medium">Budget/Pay</th>
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const id = String(row.id || i);
            const status = normalizeStatus(row.status);
            const phoneLink = whatsappHref(String(row.phone || ''));
            const isOpen = expanded === id;
            const keyDetail = kind === 'applications' ? str(row.primary_skill) : str(row.service);
            const pay = kind === 'applications' ? str(row.expected_pay) : str(row.budget);
            return (
              <Fragment key={id}>
                <tr
                  className="cursor-pointer border-t border-subtle align-middle hover:bg-white/5"
                  onClick={() => setExpanded(isOpen ? null : id)}
                >
                  <td className="px-2 py-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center">
                      <ChevronDown
                        size={18}
                        className={cn('transition-transform duration-300', isOpen && 'rotate-180')}
                      />
                    </span>
                  </td>
                  <td className="px-3 py-3 font-medium">{String(row.name || '—')}</td>
                  <td className="px-3 py-3">
                    {phoneLink ? (
                      <a
                        href={phoneLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center text-primary hover:underline"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {String(row.phone)}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{keyDetail}</td>
                  <td className="px-3 py-3 text-muted-foreground">{pay}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">
                    {formatDate(row.created_at)}
                    {relativeTime(row.created_at) && (
                      <span className="ml-1 text-xs">· {relativeTime(row.created_at)}</span>
                    )}
                  </td>
                  <td className="px-3 py-3" onClick={(event) => event.stopPropagation()}>
                    <select
                      value={status}
                      onChange={(event) => onStatus(id, event.target.value as Status)}
                      className={cn(
                        'min-h-[44px] rounded-full border px-3 text-xs font-medium',
                        STATUS_CLASS[status]
                      )}
                    >
                      {STATUSES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className="border-0">
                  <td colSpan={7} className="p-0">
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300 ease-out',
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      )}
                    >
                      <div className="overflow-hidden">
                        <ExpandedDetails kind={kind} row={row} />
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ExpandedDetails({ kind, row }: { kind: TabKind; row: Row }) {
  const samples = sampleUrls(row.sample_urls);
  const fields: [string, unknown][] =
    kind === 'applications'
      ? [
          ['Email', row.email],
          ['City', row.city],
          ['Experience', row.experience],
          ['Gear', row.gear],
          ['Expected pay', row.expected_pay],
          ['Availability', row.availability],
          ['Travel', yesNo(row.travel_ok)],
          ['Portfolio', row.portfolio_url],
          ['Instagram', row.instagram],
          ['How heard', row.how_heard],
          ['Consent', yesNo(row.consent)],
          ['18+', yesNo(row.age_confirmed)],
          ['About', row.intro],
        ]
      : [
          ['Email', row.email],
          ['City', row.location],
          ['Project details', row.project_details],
          ['Usage', row.usage],
          ['Deadline', row.deadline],
          ['Who for', row.who_for],
          ['Hired before', row.hired_before],
          ['Handle', row.business_handle],
          ['How heard', row.how_heard],
        ];

  return (
    <div className="border-t border-subtle bg-background/60 px-4 py-4 sm:px-6">
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={String(label)}>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 break-words text-sm">
              {isUrl(value) ? (
                <a
                  href={String(value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {str(value)}
                </a>
              ) : (
                str(value)
              )}
            </dd>
          </div>
        ))}
      </dl>
      {kind === 'applications' && (
        <div className="mt-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Samples</p>
          <Thumbnails urls={samples} />
        </div>
      )}
    </div>
  );
}

function str(value: unknown) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  const text = String(value ?? '').trim();
  return text || '—';
}

function yesNo(value: unknown) {
  if (value === true || value === 'Yes' || value === 'true') return 'Yes';
  if (value === false || value === 'No' || value === 'false') return 'No';
  return str(value);
}

function isUrl(value: unknown) {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
}

function normalizeStatus(value: unknown): Status {
  return STATUSES.includes(value as Status) ? (value as Status) : 'New';
}

function parseDate(value: unknown) {
  if (!value || typeof value !== 'string') return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function formatDate(value: unknown) {
  const date = parseDate(value);
  if (!date) return '—';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function relativeTime(value: unknown) {
  const date = parseDate(value);
  if (!date) return '';
  const diffMs = Date.now() - date.getTime();
  const mins = Math.max(0, Math.round(diffMs / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) return '';
  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

function sampleUrls(value: Row['sample_urls']): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
    } catch {
      return value ? [value] : [];
    }
  }
  return [];
}

function csvValue(value: unknown) {
  if (Array.isArray(value)) return value.join(' | ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value == null) return '';
  return String(value);
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function Thumbnails({ urls }: { urls: string[] }) {
  if (!urls.length) return <span className="text-muted-foreground">—</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {urls.slice(0, 3).map((url) => (
        <a key={url} href={url} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="h-14 w-14 rounded object-cover" />
        </a>
      ))}
    </div>
  );
}
