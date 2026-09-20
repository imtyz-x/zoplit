import type { Metadata } from 'next';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminDashboard } from './AdminDashboard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const authed = isAdminAuthenticated();
  return <AdminDashboard initialAuthed={authed} />;
}
