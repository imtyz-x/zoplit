'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, ShieldCheck, Camera, Video, Loader2 } from 'lucide-react';

const STAGES = [
  {
    label: 'Brief received',
    detail: 'Food shoot',
    icon: 'camera',
    status: 'active',
  },
  {
    label: 'Creator matched',
    detail: 'Verified photographer',
    icon: 'check',
    status: 'matched',
  },
  {
    label: 'Shoot in progress',
    detail: 'On location',
    icon: 'progress',
    status: 'progress',
  },
  {
    label: 'Delivered',
    detail: '24 edited photos',
    icon: 'check',
    status: 'delivered',
  },
];

export function LiveProjectCard() {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % (STAGES.length + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: Math.max(-10, Math.min(10, dx * 10)), y: Math.max(-10, Math.min(10, dy * 10)) });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow blur-2xl scale-110 pointer-events-none" />

      {/* Satellite chips */}
      <motion.div
        animate={{ x: parallax.x * 0.5, y: parallax.y * 0.5 }}
        className="absolute -top-4 -right-2 z-20"
      >
        <div className="flex items-center gap-1.5 rounded-lg border border-subtle bg-card px-3 py-1.5 shadow-lg">
          <Play size={12} className="text-primary" />
          <span className="text-xs font-medium text-foreground">Reels +3</span>
        </div>
      </motion.div>
      <motion.div
        animate={{ x: parallax.x * 0.7, y: parallax.y * 0.7 }}
        className="absolute -bottom-3 -left-2 z-20"
      >
        <div className="flex items-center gap-1.5 rounded-lg border border-subtle bg-card px-3 py-1.5 shadow-lg">
          <ShieldCheck size={12} className="text-green-500" />
          <span className="text-xs font-medium text-foreground">Payment secured</span>
        </div>
      </motion.div>

      {/* Main card */}
      <motion.div
        animate={{ x: parallax.x, y: parallax.y }}
        className="relative rounded-xl border border-subtle bg-card p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Live Project
            </span>
          </div>
          <span className="text-xs text-muted-foreground">#ZP-2024</span>
        </div>

        <div className="space-y-4 min-h-[280px]">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="stage-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Camera size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{STAGES[0].label}</p>
                    <p className="text-xs text-muted-foreground">{STAGES[0].detail}</p>
                  </div>
                </div>
                <div className="space-y-2 pl-1">
                  {['Brief submitted', 'Requirements confirmed', 'Matching creator...'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle2 size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{STAGES[1].label}</p>
                    <p className="text-xs text-muted-foreground">{STAGES[1].detail}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-subtle bg-secondary p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">AK</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Arjun K.</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-green-500">●</span>
                        <span className="text-xs text-muted-foreground">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Loader2 size={20} className="text-primary animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{STAGES[2].label}</p>
                    <p className="text-xs text-muted-foreground">{STAGES[2].detail}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">68%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '68%' }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle2 size={20} className="text-green-500" />
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{STAGES[3].label}</p>
                    <p className="text-xs text-muted-foreground">{STAGES[3].detail}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="aspect-square rounded-md bg-gradient-to-br from-primary/20 to-secondary border border-subtle"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stage === i ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
