"use client";

import { useState, useCallback, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  GraduationCap,
  Code2,
} from "lucide-react";

const MESSAGE_LIMIT = 500;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const inputClass =
  "font-sans w-full min-w-0 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none transition-all duration-300 focus:border-amber-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(251,191,36,0.08)]";

const labelClass =
  "mb-2 block font-mono text-[10px] uppercase tracking-wide text-neutral-500 sm:text-[11px]";

/**
 * Isolated so typing in the textarea only re-renders this small span,
 * not the entire form + animated left column.
 */
function CharCounter({ length, limit }: { length: number; limit: number }) {
  return (
    <span
      className={`shrink-0 font-mono text-[10px] transition-colors duration-300 ${
        length > limit * 0.9 ? "text-amber-400" : "text-neutral-600"
      }`}
    >
      {length}/{limit}
    </span>
  );
}

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [messageLength, setMessageLength] = useState(0);

  const form = useRef<HTMLFormElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending "back to idle" timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status !== "idle") return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || !form.current) {
      console.error("EmailJS is not configured correctly (missing env vars).");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);

      setStatus("sent");
      form.current.reset();
      setMessageLength(0);

      resetTimeoutRef.current = setTimeout(() => {
        setStatus("idle");
      }, 2200);
    } catch (error) {
      console.error("Email sending failed:", error);
      if (typeof error === "object" && error !== null) {
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
      setStatus("idle");
    }
  }, [status]);

  return (
    <section className="w-full lg:flex justify-center items-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8"
      >
        {/* Left */}
        <div className="min-w-0 text-center lg:text-left">
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            <span className="font-mono text-[10px] tracking-wide text-[#eec675]">
              let&apos;s talk
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-white"
          >
            Get in touch.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-sans mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-400 lg:mx-0"
          >
            Stuck on a concept, found a bug, or want to add a resource of your
            own? Tell me what you&apos;re after and I&apos;ll get back to you.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 text-left lg:mx-0"
          >
            <div className="flex items-center gap-3 text-neutral-400">
              <GraduationCap size={16} className="shrink-0 text-amber-400" />
              <p className="font-mono text-[11px]">
                Ask about a topic or request a resource
              </p>
            </div>

            <div className="flex items-center gap-3 text-neutral-400">
              <Code2 size={16} className="shrink-0 text-amber-400" />
              <p className="font-mono text-[11px]">
                Want to contribute? Mention it in your message
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Form */}
        <motion.div variants={itemVariants} className="w-full min-w-0">
          <div className="w-full rounded-3xl border border-white/10 bg-[#0D0B09]/90 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6 md:p-7 lg:p-8">
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-5 sm:gap-6"
            >
              {/* Name + Email */}
              <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Ada Lovelace"
                    className={inputClass}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="min-w-0">
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g., Question about Closures, Feature Request..."
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="message" className={`${labelClass} mb-0`}>
                    What do you need help with?
                  </label>
                  <CharCounter length={messageLength} limit={MESSAGE_LIMIT} />
                </div>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={MESSAGE_LIMIT}
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  placeholder="I'm stuck on closures in React hooks..."
                  className={`${inputClass} min-h-32.5 resize-none sm:min-h-35`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status !== "idle"}
                className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 font-mono text-xs font-semibold text-[#0B0907]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Send message
                      <ArrowRight size={17} />
                    </motion.span>
                  )}

                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                      aria-live="polite"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </motion.span>
                  )}

                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                      aria-live="polite"
                    >
                      <CheckCircle2 size={16} />
                      Sent — talk soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="text-center font-mono text-[9px] leading-4 text-neutral-500 sm:text-left sm:text-[10px]">
                No spam, no newsletter. Just a reply from a real person.
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactForm;