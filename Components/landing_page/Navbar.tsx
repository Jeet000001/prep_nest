"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      <header className="fixed top-0 inset-x-0 z-50 lg:py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between border-b border-[#E7B14C]/20 bg-[#0D0B09]/60 px-4 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.35)] sm:px-6 lg:h-18 lg:rounded-full lg:border lg:px-8">
            {/* Logo */}
            <Link href="/" className="group shrink-0">
              <h1 className="font-mono text-[22px] font-semibold tracking-tight text-[#E7B14C] transition-colors duration-300 group-hover:text-[#f3c96b] sm:text-2xl">
                Prep<span className="text-white">Nest</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-9 lg:flex xl:gap-12">
              <Link
                href="/"
                className="font-mono text-sm text-neutral-400 transition-colors duration-300 hover:text-[#E7B14C]"
              >
                Concepts
              </Link>

              <Link
                href="/"
                className="font-mono text-sm text-neutral-400 transition-colors duration-300 hover:text-[#E7B14C]"
              >
                Coding
              </Link>

              <Link
                href="/"
                className="font-mono text-sm text-neutral-400 transition-colors duration-300 hover:text-[#E7B14C]"
              >
                Mock Tests
              </Link>
            </nav>

            {/* Desktop CTA */}
            <button className="hidden h-11 items-center gap-2 rounded-full bg-[#E7B14C] px-6 font-mono text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#f3c96b] lg:flex">
              Start Exploring
              <ArrowRight size={18} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-all duration-300 hover:border-[#E7B14C] hover:text-[#E7B14C] lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
              open
                ? "mt-4 mx-4 max-h-[500px] opacity-100"
                : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-3xl border border-white/10 bg-[#0D0B09]/90 p-5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              <nav className="flex flex-col gap-5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block py-1 font-mono text-[15px] text-neutral-300 transition-colors duration-300 hover:text-[#E7B14C]"
                >
                  Concepts
                </Link>

                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block py-1 font-mono text-[15px] text-neutral-300 transition-colors duration-300 hover:text-[#E7B14C]"
                >
                  Coding
                </Link>

                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block py-1 font-mono text-[15px] text-neutral-300 transition-colors duration-300 hover:text-[#E7B14C]"
                >
                  Mock Tests
                </Link>

                <button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#E7B14C] font-mono text-sm font-semibold text-black transition-all duration-300 hover:bg-[#f3c96b]">
                  Start Exploring
                  <ArrowRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;