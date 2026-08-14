"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  GraduationCap,
  Code2,
} from "lucide-react";

// ---- Same motion language as Hero / Navbar ----
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

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const messageLimit = 500;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (status !== "idle") return;

    setStatus("sending");

    // Simulate a network request
    setTimeout(() => {
      setStatus("sent");

      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setMessage("");
      }, 2200);
    }, 1200);
  };

  return (
    <section className="w-full lg:flex justify-center items-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-5 sm:gap-12 sm:px-6 md:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8"
      >
        {/* Left — context */}
        <div className="min-w-0 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 px-3 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-3.5 sm:py-2"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />

            <span className="font-mono text-[10px] tracking-wide text-[#eec675] sm:text-[11px]">
              let&apos;s talk
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem] lg:text-5xl xl:text-6xl"
          >
            Get in touch.
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-400 sm:mt-5 sm:text-base sm:leading-7 lg:mx-0 lg:max-w-md"
          >
            Stuck on a concept, found a bug, or want to add a resource of your
            own? Tell me what you&apos;re after and I&apos;ll get back to you.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 text-left sm:mt-8 sm:gap-4 lg:mx-0"
          >
            <div className="flex min-w-0 items-center gap-3 text-neutral-400">
              <GraduationCap size={16} className="shrink-0 text-amber-400" />

              <p className="font-mono text-[11px] leading-5 sm:text-xs">
                Ask about a topic or request a resource
              </p>
            </div>

            <div className="flex min-w-0 items-center gap-3 text-neutral-400">
              <Code2 size={16} className="shrink-0 text-amber-400" />

              <p className="font-mono text-[11px] leading-5 sm:text-xs">
                Want to contribute? Mention it in your message
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div variants={itemVariants} className="w-full min-w-0">
          <div className="w-full rounded-3xl border border-white/10 bg-[#0D0B09]/90 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6 md:p-7 lg:p-8">
            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-5 sm:gap-6"
            >
              {/* Name + Email */}
              <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="min-w-0">
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>

                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="min-w-0">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="min-w-0">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="message" className={`${labelClass} mb-0`}>
                    What do you need help with?
                  </label>

                  <span
                    className={`shrink-0 font-mono text-[10px] transition-colors duration-300 ${
                      message.length > messageLimit * 0.9
                        ? "text-amber-400"
                        : "text-neutral-600"
                    }`}
                  >
                    {message.length}/{messageLimit}
                  </span>
                </div>

                <textarea
                  id="message"
                  required
                  rows={5}
                  maxLength={messageLimit}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="I'm stuck on closures in React hooks, or I'd like to add a machine-coding set on debouncing..."
                  className={`${inputClass} min-h-[130px] resize-none sm:min-h-[140px]`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status !== "idle"}
                className="group mt-0 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 font-mono text-xs font-semibold text-[#0B0907] transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(246,218,160,0.15)] disabled:cursor-not-allowed disabled:opacity-90 sm:mt-1 sm:h-12 sm:text-sm"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      Send message
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.span>
                  )}

                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </motion.span>
                  )}

                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        filter: "blur(4px)",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      Sent — talk soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Footer note */}
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
