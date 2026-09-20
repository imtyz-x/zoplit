import { WHATSAPP_NUMBER, WHATSAPP_PRESET_MESSAGE } from '@/config';

export type WhatsAppContext = {
  name?: string;
  service?: string;
  date?: string;
  location?: string;
  requirement?: string;
};

const CONTEXT_KEY = 'zoplit-whatsapp-context';

function readStored(): WhatsAppContext {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(CONTEXT_KEY);
    return raw ? (JSON.parse(raw) as WhatsAppContext) : {};
  } catch {
    return {};
  }
}

function clean(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === '[YOUR CITY]') return undefined;
  return trimmed;
}

export function setWhatsAppContext(partial: WhatsAppContext) {
  if (typeof window === 'undefined') return;
  const next: WhatsAppContext = { ...readStored() };
  (Object.keys(partial) as (keyof WhatsAppContext)[]).forEach((key) => {
    const value = clean(partial[key]);
    if (value) next[key] = value;
    else delete next[key];
  });
  sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(next));
}

function mergeContext(extra?: WhatsAppContext): WhatsAppContext {
  const stored = readStored();
  return {
    name: clean(extra?.name) ?? stored.name,
    service: clean(extra?.service) ?? stored.service,
    date: clean(extra?.date) ?? stored.date,
    location: clean(extra?.location) ?? stored.location,
    requirement: clean(extra?.requirement) ?? stored.requirement,
  };
}

export function buildWhatsAppMessage(extra?: WhatsAppContext): string {
  const ctx = mergeContext(extra);
  const details = [
    ctx.name ? `Name: ${ctx.name}` : '',
    ctx.service ? `Service: ${ctx.service}` : '',
    ctx.date ? `Date: ${ctx.date}` : '',
    ctx.location ? `Location: ${ctx.location}` : '',
  ].filter(Boolean);

  const requirement = ctx.requirement ?? '';
  if (!requirement && details.length === 0) {
    return WHATSAPP_PRESET_MESSAGE;
  }

  const body = [requirement, details.join('\n')].filter(Boolean).join('\n\n');
  return `${WHATSAPP_PRESET_MESSAGE}${body}`;
}

export function buildWhatsAppUrl(extra?: WhatsAppContext): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(extra)
  )}`;
}
