import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function insertLead(data: Record<string, unknown>) {
  if (!supabase) {
    console.log('[leads] Supabase not configured. Would insert:', data);
    return { error: null };
  }
  return supabase.from('leads').insert(data);
}

export async function insertCreatorApplication(data: Record<string, unknown>) {
  if (!supabase) {
    console.log('[creator_applications] Supabase not configured. Would insert:', data);
    return { error: null };
  }
  return supabase.from('creator_applications').insert(data);
}

export async function insertContactMessage(data: Record<string, unknown>) {
  if (!supabase) {
    console.log('[contact_messages] Supabase not configured. Would insert:', data);
    return { error: null };
  }
  return supabase.from('contact_messages').insert(data);
}
