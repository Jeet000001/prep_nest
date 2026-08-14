"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const navLinkClass =
    "font-mono text-sm text-neutral-400 transition-colors duration-300 hover:text-amber-400";

  const mobileLinkClass =
    "block py-1 font-mono text-[15px] text-neutral-300 transition-colors duration-300 hover:text-amber-400";

  const exploreButtonClass =
    "flex items-center justify-center gap-2 bg-amber-400 font-mono text-sm font-semibold text-black transition-colors duration-300 hover:bg-amber-300";

  return (
    <>
      {/* Background Blur */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-7xl lg:py-4">
        <div className="flex items-center justify-between border-b border-amber-400/40 px-6 py-3 lg:mx-8 lg:rounded-2xl lg:border backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="font-mono text-lg text-amber-400">
            Prep<span className="text-white">Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-12">
            <Link href="/" className={navLinkClass}>
              Concepts
            </Link>

            <Link href="/" className={navLinkClass}>
              Coding
            </Link>

            <Link href="/" className={navLinkClass}>
              Mock Tests
            </Link>

            <Link href="/contact" className={navLinkClass}>
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <button
            className={`${exploreButtonClass} hidden h-11 rounded-lg px-6 lg:flex`}
          >
            Start Exploring
            <ArrowRight size={18} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-colors duration-300 hover:border-amber-400 hover:text-amber-400 lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Hamburger Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            open ? "mx-4 mt-4 max-h-125 opacity-100" : "mt-0 max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-[#0D0B09]/90 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
            <nav className="flex flex-col gap-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                Concepts
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                Coding
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                Mock Tests
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                Contact
              </Link>

              <button
                className={`${exploreButtonClass} mt-3 h-11 w-full rounded-full`}
              >
                Start Exploring
                <ArrowRight size={18} />
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
