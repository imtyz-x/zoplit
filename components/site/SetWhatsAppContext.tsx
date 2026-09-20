'use client';

import { useEffect } from 'react';
import { setWhatsAppContext, type WhatsAppContext } from '@/lib/whatsapp';

export function SetWhatsAppContext(props: WhatsAppContext) {
  useEffect(() => {
    setWhatsAppContext(props);
  }, [props.name, props.service, props.date, props.location, props.requirement]);

  return null;
}
