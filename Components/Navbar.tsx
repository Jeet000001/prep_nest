"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Background Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-all duration-300 md:hidden ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl relative">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-2xl font-medium font-mono tracking-tight text-[#E7B14C] transition duration-300 group-hover:text-[#f3c96b]">
              Prep<span className="text-white">Nest</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-10 md:flex">
            <Link
              href="/"
              className="text-sm font-mono text-neutral-400 transition hover:text-[#E7B14C]"
            >
              Concepts
            </Link>

            <Link
              href="/"
              className="text-sm font-mono text-neutral-400 transition hover:text-[#E7B14C]"
            >
              Coding
            </Link>

            <Link
              href="/"
              className="text-sm font-mono text-neutral-400 transition hover:text-[#E7B14C]"
            >
              Mock Tests
            </Link>
          </nav>

          {/* Desktop Button */}
          <button className="hidden items-center gap-2 rounded-full border border-[#E7B14C]/30 bg-[#E7B14C] px-6 py-2 font-mono text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#f3c96b] md:flex">
            Start Exploring
            <ArrowRight size={18} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-white/10 p-2 text-white transition hover:border-[#E7B14C] md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0 top-full z-50 mt-3 px-4 transition-all duration-300 ease-out md:hidden ${
            open
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-3 opacity-0 invisible"
          }`}
        >
          <div className="rounded-2xl border border-[#E7B14C]/10 bg-[#0D0B09]/80 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="space-y-5 p-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block font-mono text-neutral-300 transition hover:text-[#E7B14C]"
              >
                Concepts
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block font-mono text-neutral-300 transition hover:text-[#E7B14C]"
              >
                Coding
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block font-mono text-neutral-300 transition hover:text-[#E7B14C]"
              >
                Mock Tests
              </Link>

              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E7B14C] px-5 py-2 font-mono font-semibold text-black transition hover:bg-[#f3c96b]">
                Start Exploring
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
