'use client';

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { insertCreatorApplication, supabase } from '@/lib/supabase';
import { CREATOR_SKILLS, EXPERIENCE_OPTIONS } from '@/config';

const GEAR_OPTIONS = [
  'Own professional gear',
  'Basic gear',
  'Rent gear',
  'Phone only (for reels/editing)',
];

const PAY_OPTIONS = [
  'Under ₹2,000',
  '₹2,000–5,000',
  '₹5,000–15,000',
  '₹15,000+',
  'Flexible',
];

const AVAILABILITY_OPTIONS = ['Full-time', 'Part-time', 'Weekends only', 'Project-based'];

const HOW_HEARD_OPTIONS = ['Instagram', 'Friend', 'WhatsApp', 'Google', 'Other'];

const YES_NO = ['Yes', 'No'] as const;

const MAX_SAMPLES = 3;
const MAX_SAMPLE_BYTES = 5 * 1024 * 1024;

const schema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid WhatsApp number is required'),
    email: z.string().email('Valid email is required'),
    city: z.string().min(2, 'City is required'),
    age_confirmed: z.enum(['Yes', 'No'], {
      errorMap: () => ({ message: 'Please confirm your age' }),
    }),
    primary_skill: z.string().min(1, 'Please select your primary skill'),
    experience: z.string().min(1, 'Please select your experience level'),
    gear: z.string().min(1, 'Please tell us about your gear'),
    portfolio_url: z.string().url('Please enter a valid portfolio URL'),
    instagram: z.string().optional(),
    expected_pay: z.string().min(1, 'Please select expected payment'),
    availability: z.string().min(1, 'Please select your availability'),
    travel_ok: z.enum(['Yes', 'No'], {
      errorMap: () => ({ message: 'Please tell us if you can travel' }),
    }),
    how_heard: z.string().optional(),
    intro: z.string().min(20, 'Tell us a bit more about yourself (at least 20 characters)'),
    consent: z.boolean().refine((v) => v === true, {
      message: 'Please confirm you understand before applying',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.age_confirmed === 'No') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['age_confirmed'],
        message: 'You must be 18+ to apply',
      });
    }
  });

type FormData = z.infer<typeof schema>;

export function CreatorForm({
  onSuccess,
}: {
  onSuccess?: (firstName: string, warning: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [submittedName, setSubmittedName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadWarning, setUploadWarning] = useState('');
  const [sampleFiles, setSampleFiles] = useState<File[]>([]);
  const [samplePreviews, setSamplePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      age_confirmed: undefined,
      primary_skill: '',
      experience: '',
      gear: '',
      portfolio_url: '',
      instagram: '',
      expected_pay: '',
      availability: '',
      travel_ok: undefined,
      how_heard: '',
      intro: '',
      consent: false,
    },
  });

  const watched = watch();
  const underage = watched.age_confirmed === 'No';

  const onSampleChange = (files: FileList | null) => {
    if (!files) return;
    const next = [...sampleFiles];
    const previews = [...samplePreviews];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_SAMPLES) break;
      if (!file.type.startsWith('image/')) continue;
      if (file.size > MAX_SAMPLE_BYTES) {
        setUploadWarning('Each image must be 5MB or smaller.');
        continue;
      }
      next.push(file);
      previews.push(URL.createObjectURL(file));
    }
    setSampleFiles(next.slice(0, MAX_SAMPLES));
    setSamplePreviews(previews.slice(0, MAX_SAMPLES));
  };

  const removeSample = (index: number) => {
    setSampleFiles((files) => files.filter((_, i) => i !== index));
    setSamplePreviews((urls) => {
      URL.revokeObjectURL(urls[index]);
      return urls.filter((_, i) => i !== index);
    });
  };

  const uploadSamples = async (): Promise<{ urls: string[]; warning: string }> => {
    if (!sampleFiles.length) return { urls: [], warning: '' };
    if (!supabase) {
      return {
        urls: [],
        warning: 'Sample images could not be uploaded. Your application was still submitted.',
      };
    }

    const urls: string[] = [];
    let warning = '';
    for (const file of sampleFiles) {
      const safeName = file.name.replace(/[^\w.-]+/g, '-');
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const { error } = await supabase.storage.from('creator-samples').upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        warning = 'Some sample images could not be uploaded. Your application was still submitted.';
        continue;
      }
      const { data } = supabase.storage.from('creator-samples').getPublicUrl(path);
      if (data.publicUrl) urls.push(data.publicUrl);
    }
    return { urls, warning };
  };

  const onSubmit = async (data: FormData) => {
    if (data.age_confirmed !== 'Yes') return;
    setSubmitting(true);
    setSubmitError('');
    setUploadWarning('');
    try {
      const samples = await uploadSamples();
      if (samples.warning) setUploadWarning(samples.warning);

      const { error } = await insertCreatorApplication({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        age_confirmed: true,
        primary_skill: data.primary_skill,
        experience: data.experience,
        gear: data.gear,
        portfolio_url: data.portfolio_url,
        instagram: data.instagram || null,
        expected_pay: data.expected_pay,
        availability: data.availability,
        travel_ok: data.travel_ok === 'Yes',
        how_heard: data.how_heard || null,
        intro: data.intro,
        sample_urls: samples.urls,
        consent: true,
        status: 'New',
      });

      if (error) {
        console.error(error);
        setSubmitError('Could not submit your application. Please try again.');
        return;
      }

      setSubmittedName(data.name.trim().split(/\s+/)[0] || 'there');
      onSuccess?.(data.name.trim().split(/\s+/)[0] || 'there', samples.warning);
    } catch (e) {
      console.error(e);
      setSubmitError('Could not submit your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedName) {
    return (
      <CreatorSuccess
        firstName={submittedName}
        warning={uploadWarning}
        reduceMotion={!!reduceMotion}
      />
    );
  }

  return (
    <div className="rounded-xl border border-subtle bg-card p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-semibold">Apply to join</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FormSection title="About you">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Name *" error={errors.name?.message}>
              <Input id="name" {...register('name')} placeholder="Your full name" />
            </Field>
            <Field label="WhatsApp number *" error={errors.phone?.message}>
              <Input id="phone" {...register('phone')} placeholder="Your WhatsApp number" />
            </Field>
            <Field label="Email *" error={errors.email?.message}>
              <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
            </Field>
            <Field label="City *" error={errors.city?.message}>
              <Input id="city" {...register('city')} placeholder="Your city" />
            </Field>
          </div>
          <fieldset>
            <Legend>Are you 18 or older? *</Legend>
            <ChipRow>
              {YES_NO.map((option) => (
                <OptionChip
                  key={option}
                  selected={watched.age_confirmed === option}
                  onClick={() => setValue('age_confirmed', option, { shouldValidate: true })}
                >
                  {option}
                </OptionChip>
              ))}
            </ChipRow>
            {(underage || errors.age_confirmed) && (
              <p className="mt-2 text-sm text-destructive">You must be 18+ to apply</p>
            )}
          </fieldset>
        </FormSection>

        <FormSection title="Your skill">
          <fieldset>
            <Legend>Primary skill *</Legend>
            <ChipRow>
              {CREATOR_SKILLS.map((skill) => (
                <OptionChip
                  key={skill}
                  selected={watched.primary_skill === skill}
                  onClick={() => setValue('primary_skill', skill, { shouldValidate: true })}
                >
                  {skill}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.primary_skill && (
              <p className="mt-2 text-sm text-destructive">{errors.primary_skill.message}</p>
            )}
          </fieldset>

          <fieldset>
            <Legend>Experience *</Legend>
            <ChipRow>
              {EXPERIENCE_OPTIONS.map((exp) => (
                <OptionChip
                  key={exp}
                  selected={watched.experience === exp}
                  onClick={() => setValue('experience', exp, { shouldValidate: true })}
                >
                  {exp}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.experience && (
              <p className="mt-2 text-sm text-destructive">{errors.experience.message}</p>
            )}
          </fieldset>

          <fieldset>
            <Legend>Do you own your own gear? *</Legend>
            <ChipRow>
              {GEAR_OPTIONS.map((option) => (
                <OptionChip
                  key={option}
                  selected={watched.gear === option}
                  onClick={() => setValue('gear', option, { shouldValidate: true })}
                >
                  {option}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.gear && <p className="mt-2 text-sm text-destructive">{errors.gear.message}</p>}
          </fieldset>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Portfolio link *" error={errors.portfolio_url?.message}>
              <Input
                id="portfolio_url"
                {...register('portfolio_url')}
                placeholder="https://your-portfolio.com"
              />
            </Field>
            <Field label="Instagram (optional)">
              <Input id="instagram" {...register('instagram')} placeholder="@yourhandle" />
            </Field>
          </div>

          <fieldset>
            <Legend>Expected payment per project *</Legend>
            <ChipRow>
              {PAY_OPTIONS.map((option) => (
                <OptionChip
                  key={option}
                  selected={watched.expected_pay === option}
                  onClick={() => setValue('expected_pay', option, { shouldValidate: true })}
                >
                  {option}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.expected_pay && (
              <p className="mt-2 text-sm text-destructive">{errors.expected_pay.message}</p>
            )}
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="samples">Sample work (optional, up to 3 images, 5MB each)</Label>
            <Input
              id="samples"
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => onSampleChange(event.target.files)}
              className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:text-primary"
            />
            {samplePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {samplePreviews.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => removeSample(i)}
                    className="relative h-20 w-20 overflow-hidden rounded-lg border border-subtle"
                    aria-label="Remove sample"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FormSection>

        <FormSection title="Logistics & consent">
          <fieldset>
            <Legend>Availability *</Legend>
            <ChipRow>
              {AVAILABILITY_OPTIONS.map((option) => (
                <OptionChip
                  key={option}
                  selected={watched.availability === option}
                  onClick={() => setValue('availability', option, { shouldValidate: true })}
                >
                  {option}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.availability && (
              <p className="mt-2 text-sm text-destructive">{errors.availability.message}</p>
            )}
          </fieldset>

          <fieldset>
            <Legend>Can you travel for shoots within the city? *</Legend>
            <ChipRow>
              {YES_NO.map((option) => (
                <OptionChip
                  key={option}
                  selected={watched.travel_ok === option}
                  onClick={() => setValue('travel_ok', option, { shouldValidate: true })}
                >
                  {option}
                </OptionChip>
              ))}
            </ChipRow>
            {errors.travel_ok && (
              <p className="mt-2 text-sm text-destructive">{errors.travel_ok.message}</p>
            )}
          </fieldset>

          <Field label="How did you find Zoplit? (optional)">
            <Select
              value={watched.how_heard || undefined}
              onValueChange={(v) => setValue('how_heard', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {HOW_HEARD_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="About you *" error={errors.intro?.message}>
            <Textarea
              id="intro"
              {...register('intro')}
              placeholder="Tell us about your work, your style and why you'd like to join Zoplit."
              rows={5}
            />
          </Field>

          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={watched.consent}
              onCheckedChange={(checked) =>
                setValue('consent', checked === true, { shouldValidate: true })
              }
            />
            <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              I understand Zoplit does not guarantee a minimum number of projects, and applications
              may be accepted or rejected at Zoplit&apos;s discretion.
            </Label>
          </div>
          {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}
        </FormSection>

        {submitError && <p className="text-sm text-destructive">{submitError}</p>}

        <Button
          type="submit"
          disabled={submitting || underage}
          className="h-12 w-full rounded-md bg-primary text-base text-primary-foreground hover:bg-primary/90"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </Button>
      </form>
    </div>
  );
}

export function CreatorSuccess({
  firstName,
  warning,
  reduceMotion,
}: {
  firstName: string;
  warning: string;
  reduceMotion: boolean;
}) {
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/become-a-creator`
      : 'https://zoplit.com/become-a-creator';
  const shareText = `Know a photographer, videographer or editor looking for consistent work? Zoplit matches creators with paid projects. Apply here: ${shareUrl}`;
  const shareHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const nextSteps = [
    { n: '1', title: 'We review your work' },
    { n: '2', title: 'Short call on WhatsApp' },
    { n: '3', title: 'Paid test project' },
  ];

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[560px] flex-col items-center justify-center px-4 py-16 text-center">
      <motion.div
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 200 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10"
      >
        <Check size={32} className="text-green-500" />
      </motion.div>
      <h2 className="mb-3 text-balance text-2xl font-semibold sm:text-3xl">
        You&apos;re in the queue, {firstName}. 🎉
      </h2>
      <p className="mb-8 leading-relaxed text-muted-foreground">
        We review every application manually. If your work fits Zoplit, we&apos;ll call you on
        WhatsApp within 3–5 working days.
      </p>
      {warning && <p className="mb-6 text-sm text-muted-foreground">{warning}</p>}
      <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {nextSteps.map((step) => (
          <div key={step.n} className="rounded-xl border border-subtle bg-card px-4 py-4 text-left">
            <div className="mb-2 text-xs font-semibold text-primary">{step.n}</div>
            <p className="text-sm font-medium leading-snug">{step.title}</p>
          </div>
        ))}
      </div>
      <a
        href={shareHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-subtle px-5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
      >
        Know other creators? Share Zoplit →
      </a>
    </section>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6 border-t border-subtle pt-8 first:border-t-0 first:pt-0">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{title}</h3>
      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Legend({ children }: { children: ReactNode }) {
  return <legend className="mb-3 text-sm font-medium">{children}</legend>;
}

function ChipRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
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
        'min-h-[44px] rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-colors',
        selected
          ? 'border-primary bg-primary/10 text-foreground'
          : 'border-subtle bg-card hover:border-primary/30'
      )}
    >
      {children}
    </button>
  );
}
