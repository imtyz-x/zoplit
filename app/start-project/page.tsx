'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { Check, ArrowRight, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SERVICES, CITY } from '@/config';
import { setWhatsAppContext } from '@/lib/whatsapp';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const STORAGE_KEY = 'zoplit-start-project';
const LOCATION_OTHER = 'Other (type below)';

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Something else'];

const WHO_FOR_OPTIONS = [
  'My business (restaurant, salon, store...)',
  'An event (wedding, birthday...)',
  'Startup / brand',
  'Creator / agency reselling',
  'Other',
];

const USAGE_OPTIONS = [
  'Instagram / Social',
  'Website',
  'Print (menus, banners)',
  'YouTube',
  'Not sure yet',
];

const DEADLINE_PRESETS = ['This week', 'Next week', 'Flexible'] as const;

const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000–10,000',
  '₹10,000–25,000',
  '₹25,000+',
  'Not sure yet — suggest me',
];

const HIRED_BEFORE_OPTIONS = [
  'Yes, multiple times',
  'Once or twice',
  'No, first time',
];

const HOW_HEARD_OPTIONS = [
  'Instagram',
  'WhatsApp',
  'Friend/Referral',
  'Google',
  'Other',
];

const CITY_OPTIONS = Array.from(
  new Set([CITY, 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Pune', LOCATION_OTHER])
);

const schema = z
  .object({
    service: z.string().min(1, 'Please select a service'),
    who_for: z.string().min(1, 'Please tell us who this is for'),
    project_details: z
      .string()
      .min(10, 'Please describe your project (at least 10 characters)'),
    usage: z.string().min(1, 'Please select where this content will be used'),
    deadline: z.string().min(1, 'Please choose a deadline'),
    location: z.string().min(1, 'Please enter a location'),
    location_other: z.string().optional(),
    budget: z.string().min(1, 'Please select a budget range'),
    name: z.string().min(2, 'Name is required'),
    business_handle: z.string().optional(),
    hired_before: z.string().min(1, 'Please tell us if you have hired a creative before'),
    phone: z.string().min(10, 'Valid WhatsApp number is required'),
    email: z.string().email('Valid email is required'),
    how_heard: z.string().min(1, 'Please tell us how you found Zoplit'),
    whatsapp_verified: z.boolean(),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.location === LOCATION_OTHER && !data.location_other?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['location_other'],
        message: 'Please type your city',
      });
    }
  });

type FormData = z.infer<typeof schema>;

const STEPS = ['Service', 'Project Details', 'Contact', 'Review'] as const;

const defaultValues: FormData = {
  service: '',
  who_for: '',
  project_details: '',
  usage: '',
  deadline: '',
  location: CITY,
  location_other: '',
  budget: '',
  name: '',
  business_handle: '',
  hired_before: '',
  phone: '',
  email: '',
  how_heard: '',
  whatsapp_verified: false,
  website: '',
};

function addDaysIso(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function StartProjectPage() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues,
  });

  const watchedValues = watch();
  const slide = reduceMotion ? 0 : 20;
  const duration = reduceMotion ? 0 : 0.3;

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const stepFields: (keyof FormData)[][] = [
    ['service'],
    ['who_for', 'project_details', 'usage', 'deadline', 'location', 'location_other', 'budget'],
    ['name', 'phone', 'email', 'hired_before'],
    ['how_heard'],
  ];

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const applyDeadlinePreset = (preset: (typeof DEADLINE_PRESETS)[number]) => {
    if (preset === 'This week') setValue('deadline', addDaysIso(7));
    else if (preset === 'Next week') setValue('deadline', addDaysIso(14));
    else setValue('deadline', 'Flexible');
  };

  const selectedPreset = useMemo(() => {
    if (watchedValues.deadline === 'Flexible') return 'Flexible';
    if (watchedValues.deadline === addDaysIso(7)) return 'This week';
    if (watchedValues.deadline === addDaysIso(14)) return 'Next week';
    return null;
  }, [watchedValues.deadline]);

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const resolvedLocation =
    watchedValues.location === LOCATION_OTHER
      ? watchedValues.location_other?.trim() || ''
      : watchedValues.location;

  useEffect(() => {
    setWhatsAppContext({
      name: watchedValues.name,
      service: watchedValues.service,
      date: watchedValues.deadline,
      location: resolvedLocation,
      requirement: watchedValues.project_details,
    });
  }, [
    watchedValues.name,
    watchedValues.service,
    watchedValues.deadline,
    resolvedLocation,
    watchedValues.project_details,
  ]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          location: data.location === LOCATION_OTHER ? data.location_other : data.location,
          whatsapp_verified: false,
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        setSubmitError(result.error || 'Could not submit your project');
        return;
      }
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } catch {
      setSubmitError('Could not submit your project');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <section className="relative min-h-screen overflow-hidden pt-32 pb-20 flex items-center">
        {!reduceMotion && (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-[18%] top-[40%] h-40 w-40 rounded-full bg-fuchsia-500/25 blur-3xl"
              animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute right-[16%] bottom-[22%] h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
          </>
        )}

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            {!reduceMotion && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                  animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border border-primary/50"
                  animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
                />
              </>
            )}
            <motion.div
              initial={reduceMotion ? false : { scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={
                reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 16 }
              }
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 via-primary to-fuchsia-500 shadow-[0_0_40px_rgba(91,33,230,0.55)]"
            >
              <Check size={36} className="text-white" strokeWidth={3} />
            </motion.div>
          </div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0 : 0.5 }}
            className={cn(
              playfair.className,
              'mb-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl'
            )}
          >
            ✅ Got it.{' '}
            <span className="italic bg-gradient-to-r from-violet-200 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              We&apos;ve received your project.
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.28, duration: reduceMotion ? 0 : 0.5 }}
            className="mb-10 text-lg leading-relaxed text-muted-foreground"
          >
            We&apos;ll reach out on WhatsApp within a few working hours with a plan and quote.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0 : 0.45 }}
          >
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="rounded-md border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary"
            >
              Submit another project
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-balance">
          Start a Project
        </h1>
        <p className="text-muted-foreground mb-6">
          Tell us what you need. We take it from here.
        </p>

        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span>{STEPS[step]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            {...register('website')}
          />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slide }}
                transition={{ duration }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold mb-4">What do you need?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((option) => (
                    <OptionChip
                      key={option}
                      selected={watchedValues.service === option}
                      onClick={() => setValue('service', option)}
                    >
                      {option}
                    </OptionChip>
                  ))}
                </div>
                {errors.service && (
                  <p className="text-sm text-destructive">{errors.service.message}</p>
                )}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slide }}
                transition={{ duration }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold mb-4">Project details</h2>

                <fieldset className="space-y-3">
                  <Legend>Who is this for? *</Legend>
                  <div className="grid grid-cols-1 gap-3">
                    {WHO_FOR_OPTIONS.map((option) => (
                      <OptionChip
                        key={option}
                        selected={watchedValues.who_for === option}
                        onClick={() => setValue('who_for', option)}
                      >
                        {option}
                      </OptionChip>
                    ))}
                  </div>
                  {errors.who_for && (
                    <p className="text-sm text-destructive">{errors.who_for.message}</p>
                  )}
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="project_details">Describe your project *</Label>
                  <Textarea
                    id="project_details"
                    {...register('project_details')}
                    placeholder="What do you need shot, filmed or edited? Include scope, style and deliverables."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    The more detail you give, the more accurate your quote. Roughly 2–3 lines is
                    perfect.
                  </p>
                  {errors.project_details && (
                    <p className="text-sm text-destructive">{errors.project_details.message}</p>
                  )}
                </div>

                <fieldset className="space-y-3">
                  <Legend>Where will this content be used? *</Legend>
                  <div className="flex flex-wrap gap-2">
                    {USAGE_OPTIONS.map((option) => (
                      <OptionChip
                        key={option}
                        selected={watchedValues.usage === option}
                        onClick={() => setValue('usage', option)}
                      >
                        {option}
                      </OptionChip>
                    ))}
                  </div>
                  {errors.usage && (
                    <p className="text-sm text-destructive">{errors.usage.message}</p>
                  )}
                </fieldset>

                <fieldset className="space-y-3">
                  <Legend>When do you need it? *</Legend>
                  <div className="grid grid-cols-3 gap-2">
                    {DEADLINE_PRESETS.map((preset) => (
                      <OptionChip
                        key={preset}
                        selected={selectedPreset === preset}
                        onClick={() => applyDeadlinePreset(preset)}
                      >
                        {preset}
                      </OptionChip>
                    ))}
                  </div>
                  {watchedValues.deadline !== 'Flexible' && (
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Pick a date (optional if Flexible)</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={
                          watchedValues.deadline && watchedValues.deadline !== 'Flexible'
                            ? watchedValues.deadline
                            : ''
                        }
                        onChange={(e) => setValue('deadline', e.target.value)}
                        className="[color-scheme:dark]"
                      />
                    </div>
                  )}
                  {errors.deadline && (
                    <p className="text-sm text-destructive">{errors.deadline.message}</p>
                  )}
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <select
                    id="location"
                    value={watchedValues.location}
                    onChange={(e) => setValue('location', e.target.value)}
                    className="flex min-h-[44px] w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground"
                  >
                    {CITY_OPTIONS.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {watchedValues.location === LOCATION_OTHER && (
                    <Input
                      {...register('location_other')}
                      placeholder="Type your city"
                    />
                  )}
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                  )}
                  {errors.location_other && (
                    <p className="text-sm text-destructive">{errors.location_other.message}</p>
                  )}
                </div>

                <fieldset className="space-y-3">
                  <Legend>Budget *</Legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUDGET_OPTIONS.map((option) => (
                      <OptionChip
                        key={option}
                        selected={watchedValues.budget === option}
                        onClick={() => setValue('budget', option)}
                      >
                        {option}
                      </OptionChip>
                    ))}
                  </div>
                  {errors.budget && (
                    <p className="text-sm text-destructive">{errors.budget.message}</p>
                  )}
                </fieldset>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slide }}
                transition={{ duration }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold mb-4">How do we reach you?</h2>
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register('name')} placeholder="Your full name" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_handle">Business name or Instagram handle</Label>
                  <Input
                    id="business_handle"
                    {...register('business_handle')}
                    placeholder="e.g @cafearora (helps us prepare a better quote)"
                  />
                </div>

                <fieldset className="space-y-3">
                  <Legend>Have you hired a creative before? *</Legend>
                  <div className="grid grid-cols-1 gap-2">
                    {HIRED_BEFORE_OPTIONS.map((option) => (
                      <OptionChip
                        key={option}
                        selected={watchedValues.hired_before === option}
                        onClick={() => setValue('hired_before', option)}
                      >
                        {option}
                      </OptionChip>
                    ))}
                  </div>
                  {errors.hired_before && (
                    <p className="text-sm text-destructive">{errors.hired_before.message}</p>
                  )}
                </fieldset>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp number *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="Your WhatsApp number"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Lock size={14} className="mt-0.5 shrink-0" />
                  Your details stay with Zoplit. We only use them to plan your project.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -slide }}
                transition={{ duration }}
                className="space-y-6"
              >
                <h2 className="text-lg font-semibold mb-4">Review your project</h2>
                <div className="rounded-xl border border-subtle bg-card divide-y divide-border">
                  <ReviewRow label="Service" value={watchedValues.service} />
                  <ReviewRow label="Who it's for" value={watchedValues.who_for} />
                  <ReviewRow label="Project details" value={watchedValues.project_details} />
                  <ReviewRow label="Content usage" value={watchedValues.usage} />
                  <ReviewRow label="Deadline" value={watchedValues.deadline} />
                  <ReviewRow label="Location" value={resolvedLocation} />
                  <ReviewRow label="Budget" value={watchedValues.budget} />
                  <ReviewRow label="Name" value={watchedValues.name} />
                  <ReviewRow
                    label="Business / Instagram"
                    value={watchedValues.business_handle || '—'}
                  />
                  <ReviewRow label="Hired before" value={watchedValues.hired_before} />
                  <ReviewRow label="WhatsApp" value={watchedValues.phone} />
                  <ReviewRow label="Email" value={watchedValues.email} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="how_heard">How did you find Zoplit? *</Label>
                  <select
                    id="how_heard"
                    value={watchedValues.how_heard}
                    onChange={(e) => setValue('how_heard', e.target.value)}
                    className="flex min-h-[44px] w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground"
                  >
                    <option value="">Select one</option>
                    {HOW_HEARD_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.how_heard && (
                    <p className="text-sm text-destructive">{errors.how_heard.message}</p>
                  )}
                </div>
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={prevStep} className="min-h-[44px] rounded-md">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={step === 0 && !watchedValues.service}
                className="min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              >
                Continue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Legend({ children }: { children: ReactNode }) {
  return <legend className="text-sm font-medium">{children}</legend>;
}

function OptionChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-h-[44px] rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors',
        selected
          ? 'border-primary bg-primary/10 text-foreground'
          : 'border-subtle bg-card text-foreground hover:border-primary/30'
      )}
    >
      {children}
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value || '—'}</span>
    </div>
  );
}
