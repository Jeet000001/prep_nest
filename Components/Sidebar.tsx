"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Code2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Concepts",
    href: "/concepts",
    icon: BookOpen,
  },
  {
    label: "Coding",
    href: "/coding",
    icon: Code2,
  },
  {
    label: "Mock Tests",
    href: "/mock-tests",
    icon: ClipboardList,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* =========================================
          DESKTOP SIDEBAR
          ========================================= */}
      <aside className="hidden lg:block lg:w-60 xl:w-64 2xl:w-68">
        <div className="sticky top-24 h-[calc(100vh-7rem)]">
          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
            <nav className="flex flex-1 flex-col gap-1">
              {sidebarLinks.map(({ label, href, icon: Icon }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/dashboard" &&
                    pathname.startsWith(`${href}/`));

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-amber-400/10 text-amber-400"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-amber-400"
                    }`}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />

                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* =========================================
          MOBILE / TABLET BOTTOM BUTTON
          ========================================= */}
      <div className="fixed bottom-4 left-0 z-40 flex w-full justify-center px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="
            flex w-full max-w-sm items-center justify-between
            rounded-2xl border border-white/10
            bg-[#11100D]
            px-5 py-3
            text-sm font-medium text-neutral-300
            shadow-[0_8px_30px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            transition-all duration-200
            hover:border-amber-400/30
            hover:bg-[#15130F]
            active:scale-[0.98]
          "
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <LayoutDashboard
              size={17}
              className="text-amber-400"
            />

            <span>Browse Menu</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-500">
              {sidebarLinks.length}
            </span>

            <ChevronDown
              size={15}
              className="text-neutral-500"
            />
          </div>
        </button>
      </div>

      {/* =========================================
          MOBILE OVERLAY
          ========================================= */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-300
          lg:hidden
          ${
            open
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* =========================================
          MOBILE BOTTOM DRAWER
          ========================================= */}
      <div
        className={`
          fixed bottom-0 left-0 z-50
          flex w-full flex-col
          rounded-t-3xl
          border-t border-white/10
          bg-[#0D0B09]
          shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
          transition-transform duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:hidden
          ${
            open
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
        style={{
          maxHeight: "80dvh",
        }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-white/10" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard
              size={16}
              className="text-amber-400"
            />

            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Navigation
            </span>

            <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
              {sidebarLinks.length}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              border border-white/10
              bg-white/[0.03]
              text-neutral-500
              transition-colors duration-200
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <X size={15} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map(({ label, href, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/dashboard" &&
                  pathname.startsWith(`${href}/`));

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`
                    relative flex items-center gap-3
                    rounded-xl px-4 py-3
                    font-mono text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-amber-400/10 text-amber-400"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-amber-400" />
                  )}

                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className={`
                      shrink-0
                      ${
                        isActive
                          ? "text-amber-400"
                          : "text-neutral-600"
                      }
                    `}
                  />

                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;