"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Star } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) =>
    `font-mono text-sm transition-colors duration-300 hover:text-amber-400 ${
      isActive(href) ? "text-amber-400" : "text-neutral-400"
    }`;

  const mobileLinkClass = (href: string) =>
    `block py-1 font-mono text-[15px] transition-colors duration-300 hover:text-amber-400 ${
      isActive(href) ? "text-amber-400" : "text-neutral-300"
    }`;

  const exploreButtonClass =
    "flex items-center justify-center gap-2 bg-amber-400 font-mono text-sm font-semibold text-black transition-colors duration-300 hover:bg-amber-300";

  const githubButtonClass =
    "flex items-center justify-center gap-2 border border-white/10 bg-white/[0.03] font-mono text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/5 hover:text-amber-400";

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
        <div className="flex items-center justify-between border-b border-amber-400/40 px-6 py-3 backdrop-blur-xl lg:mx-8 lg:rounded-2xl lg:border">
          {/* Logo */}
          <Link href="/" className="font-mono text-lg text-amber-400">
            Prep<span className="text-white">Nest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-12">
            <Link
              href="/concepts"
              aria-current={isActive("/concepts") ? "page" : undefined}
              className={navLinkClass("/concepts")}
            >
              Concepts
            </Link>

            <Link
              href="/coding"
              aria-current={isActive("/coding") ? "page" : undefined}
              className={navLinkClass("/coding")}
            >
              Machine Coding
            </Link>

            <Link
              href="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={navLinkClass("/")}
            >
              Mock Tests
            </Link>

            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className={navLinkClass("/contact")}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            {/* GitHub Star */}
            <a
              href="https://github.com/Jeet000001/prep_nest"
              target="_blank"
              rel="noopener noreferrer"
              className={`${githubButtonClass} h-11 rounded-lg px-4`}
            >
              <Star size={16} />
              Star
            </a>

            {/* Start Exploring */}
            <button className={`${exploreButtonClass} h-11 rounded-lg px-6`}>
              Start Exploring
              <ArrowRight size={18} />
            </button>
          </div>

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
                href="/concepts"
                onClick={() => setOpen(false)}
                aria-current={isActive("/concepts") ? "page" : undefined}
                className={mobileLinkClass("/concepts")}
              >
                Concepts
              </Link>

              <Link
                href="/coding"
                onClick={() => setOpen(false)}
                aria-current={isActive("/coding") ? "page" : undefined}
                className={mobileLinkClass("/coding")}
              >
                Machine Coding
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-current={isActive("/") ? "page" : undefined}
                className={mobileLinkClass("/")}
              >
                Mock Tests
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                aria-current={isActive("/contact") ? "page" : undefined}
                className={mobileLinkClass("/contact")}
              >
                Contact
              </Link>

              {/* Mobile GitHub Star */}
              <Link
                href="https://github.com/Jeet000001/prep_nest"
                target="_blank"
                rel="noopener noreferrer"
                className={`${githubButtonClass} mt-2 h-11 w-full rounded-full`}
              >
                <Star size={16} />
                Star on GitHub
              </Link>

              {/* Mobile Explore */}
              <button
                className={`${exploreButtonClass} h-11 w-full rounded-full`}
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
