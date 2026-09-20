import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getAdminSupabase } from '@/lib/supabase-admin';

export const runtime = 'nodejs';

const STATUSES = ['New', 'Contacted', 'Verified', 'Rejected'] as const;
const TABLES = ['creator_applications', 'leads'] as const;

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = getAdminSupabase();
  if (!client) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 500 });
  }

  let body: { table?: string; id?: string; status?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!TABLES.includes(body.table as (typeof TABLES)[number])) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }
  if (!STATUSES.includes(body.status as (typeof STATUSES)[number])) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const { error } = await client
    .from(body.table as string)
    .update({ status: body.status })
    .eq('id', body.id);

  if (error) {
    console.error('[admin] status update', error);
    return NextResponse.json({ error: 'Could not update status' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
