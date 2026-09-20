'use client';

import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function WhatsAppButton() {
  const [isDragging, setIsDragging] = useState(false);

  const openChat = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      drag
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={openChat}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform cursor-grab active:cursor-grabbing"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={28} className="text-white" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
      </span>
    </motion.a>
  );
}
