import { NextResponse } from 'next/server';
import { insertLead } from '@/lib/supabase';
import { canSubmitLead, recordLeadSubmit } from '@/lib/lead-rate-limit';
import { normalizePhone } from '@/lib/phone';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: bots fill "website". Humans never see it.
    if (typeof body?.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const phone = typeof body?.phone === 'string' ? body.phone : '';
    const limit = canSubmitLead(phone);
    if (!limit.ok) {
      return NextResponse.json({ ok: false, error: limit.error }, { status: 429 });
    }

    const payload = {
      name: body.name,
      phone: normalizePhone(phone),
      email: body.email,
      service: body.service,
      project_details: body.project_details,
      deadline: body.deadline,
      location: body.location,
      budget: body.budget,
      who_for: body.who_for,
      usage: body.usage,
      business_handle: body.business_handle || null,
      hired_before: body.hired_before,
      how_heard: body.how_heard,
      whatsapp_verified: Boolean(body.whatsapp_verified),
    };

    const { error } = await insertLead(payload);
    if (error) {
      console.error('[leads] insert failed', error);
      return NextResponse.json({ ok: false, error: 'Could not submit your project' }, { status: 500 });
    }

    recordLeadSubmit(phone);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not submit your project' }, { status: 500 });
  }
}
