'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Check, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RevealOnScroll } from '@/components/site/RevealOnScroll';
import { insertContactMessage } from '@/lib/supabase';
import { CONTACT_SUBJECTS } from '@/config';
import { buildWhatsAppUrl, setWhatsAppContext } from '@/lib/whatsapp';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  role: z.string().min(1, 'Please select an option'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      email: '',
      role: '',
      subject: '',
      message: '',
    },
  });

  const watched = watch();

  useEffect(() => {
    setWhatsAppContext({
      name: watched.name,
      requirement: watched.message,
    });
  }, [watched.name, watched.message]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await insertContactMessage({
        name: data.name,
        email: data.email,
        role: data.role,
        subject: data.subject,
        message: data.message,
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-500/10 mb-6"
          >
            <Check size={32} className="text-green-500" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Message sent.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Let&apos;s talk.
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Questions, ideas or just want to say hello — drop us a message.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="rounded-xl border border-subtle bg-card p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register('name')} placeholder="Your name" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>I&apos;m a *</Label>
                <RadioGroup
                  value={watched.role}
                  onValueChange={(v) => setValue('role', v, { shouldValidate: true })}
                  className="flex gap-6 pt-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="role-client" value="Client" />
                    <Label htmlFor="role-client" className="text-sm cursor-pointer">Client</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="role-creator" value="Creator" />
                    <Label htmlFor="role-creator" className="text-sm cursor-pointer">Creator</Label>
                  </div>
                </RadioGroup>
                {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select
                  value={watched.subject}
                  onValueChange={(v) => setValue('subject', v, { shouldValidate: true })}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="What's on your mind?"
                  rows={5}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md h-12 text-base"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Prefer to chat? WhatsApp is the fastest way to reach us.
            </p>
            <a
              href={buildWhatsAppUrl({
                name: watched.name,
                requirement: watched.message,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <MessageCircle size={16} />
              Message us on WhatsApp
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
