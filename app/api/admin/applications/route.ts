import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { getAdminSupabase } from '@/lib/supabase-admin';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = getAdminSupabase();
  if (!client) {
    return NextResponse.json({ rows: [] });
  }

  const { data, error } = await client
    .from('creator_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[admin] creator_applications', error);
    return NextResponse.json({ error: 'Could not load applications' }, { status: 500 });
  }

  return NextResponse.json({ rows: data || [] });
}
