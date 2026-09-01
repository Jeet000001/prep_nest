"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X, Braces, Atom } from "lucide-react";

type Topic = {
  name: string;
  href: string;
};

type TopicGroup = {
  name: string;
  icon: React.ElementType;
  href?: string; // Optional direct link for groups like React
  topics: Topic[];
};

const topicGroups: TopicGroup[] = [
  {
    name: "JavaScript",
    icon: Braces,
    topics: [
      { name: "Strings", href: "/coding/javascript/strings" },
      { name: "Arrays", href: "/coding/javascript/arrays" },
      { name: "Array Polyfills", href: "/coding/javascript/array-polyfills" },
      { name: "Objects", href: "/coding/javascript/objects" },
      { name: "Closure", href: "/coding/javascript/closure" },
      { name: "Debounce", href: "/coding/javascript/debounce" },
      { name: "Throttle", href: "/coding/javascript/throttle" },
      { name: "Others", href: "/coding/javascript/others" },
    ],
  },
  {
    name: "React",
    icon: Atom,
    href: "/coding/react",
    topics: [
      { name: "Components", href: "/coding/react/components" },
      { name: "JSX", href: "/coding/react/jsx" },
      { name: "Props", href: "/coding/react/props" },
      { name: "State", href: "/coding/react/state" },
      { name: "Hooks", href: "/coding/react/hooks" },
      { name: "Event Handling", href: "/coding/react/event-handling" },
      { name: "Forms", href: "/coding/react/forms" },
      { name: "Lists & Keys", href: "/coding/react/lists-keys" },
      {
        name: "Conditional Rendering",
        href: "/coding/react/conditional-rendering",
      },
      { name: "Performance", href: "/coding/react/performance" },
    ],
  },
];

const groupContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const groupItemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const topicListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const topicItemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const CodingSidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isBottomBarHidden, setIsBottomBarHidden] = useState(false);

  // Default opened groups
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    HTML: true,
    CSS: false,
    JavaScript: true,
    React: false,
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-concepts-scroll]",
    );

    if (!scrollContainer) {
      return;
    }

    let previousScrollTop = scrollContainer.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;

      if (currentScrollTop <= 0) {
        setIsBottomBarHidden(false);
      } else if (currentScrollTop > previousScrollTop) {
        setIsBottomBarHidden(true);
      } else if (currentScrollTop < previousScrollTop) {
        setIsBottomBarHidden(false);
      }

      previousScrollTop = currentScrollTop;
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const toggleGroup = (name: string) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isTopicActive = (href: string) => {
    return pathname === href;
  };

  const isGroupActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const totalTopics = topicGroups.reduce(
    (total, group) => total + group.topics.length,
    0,
  );

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden h-full lg:block lg:w-60 xl:w-64 2xl:w-68">
        <div className="h-full">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10  backdrop-blur-xl">
            {/* Header */}

            <div className="border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Concepts
                </span>

                <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 font-mono text-[9px] text-neutral-500">
                  {totalTopics}
                </span>
              </div>
            </div>

            {/* Topics */}

            <div className="hide-scrollbar flex-1 overflow-y-auto p-3">
              <motion.nav
                variants={groupContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1"
              >
                {topicGroups.map((group) => {
                  const Icon = group.icon;
                  const isExpanded = expanded[group.name];
                  const active = isGroupActive(group.href);

                  return (
                    <motion.div variants={groupItemVariants} key={group.name}>
                      {/* Parent */}

                      {group.href ? (
                        <Link
                          href={group.href}
                          className={`
                            flex w-full items-center justify-between
                            rounded-lg px-3 py-2.5
                            font-mono text-sm
                            transition-all duration-200
                            
                            ${
                              active
                                ? "bg-amber-400/10 text-amber-400"
                                : "text-neutral-300 hover:bg-white/4 hover:text-white"
                            }
                          `}
                        >
                          <span className="flex items-center gap-3">
                            <Icon
                              size={17}
                              strokeWidth={1.7}
                              className={`${
                                active ? "text-amber-400" : "text-amber-400/80"
                              }`}
                            />

                            <span>{group.name}</span>
                          </span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.name)}
                          className="
                            flex w-full items-center justify-between
                            rounded-lg px-3 py-2.5
                            font-mono text-sm
                            text-neutral-300
                            transition-all duration-200
                            hover:bg-white/4
                            hover:text-white
                          "
                        >
                          <span className="flex items-center gap-3">
                            <Icon
                              size={17}
                              strokeWidth={1.7}
                              className="text-amber-400/80"
                            />

                            <span>{group.name}</span>
                          </span>

                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          >
                            <ChevronDown size={15} className="text-neutral-600" />
                          </motion.span>
                        </button>
                      )}

                      {/* Subtopics */}

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              variants={topicListVariants}
                              initial="hidden"
                              animate="visible"
                              className="ml-4 border-l border-white/8 pl-2 py-1"
                            >
                              {group.topics.map((topic) => {
                                const active = isTopicActive(topic.href);

                                return (
                                  <motion.div
                                    key={topic.href}
                                    variants={topicItemVariants}
                                  >
                                    <Link
                                      href={topic.href}
                                      className={`
                                        relative flex items-center
                                        rounded-md px-3 py-2
                                        font-mono text-[12px]
                                        transition-colors duration-200

                                        ${
                                          active
                                            ? "bg-amber-400/10 text-amber-400"
                                            : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200"
                                        }
                                      `}
                                    >
                                      {active && (
                                        <motion.span
                                          layoutId="desktop-active-indicator"
                                          transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 32,
                                          }}
                                          className="absolute -left-2.25 top-1.5 bottom-1.5 w-0.5 rounded-full bg-amber-400"
                                        />
                                      )}

                                      {topic.name}
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE / TABLET BUTTON
      ===================================================== */}

      <div
        className={`fixed bottom-4 left-0 z-40 flex w-full justify-center px-4 transition-transform duration-300 ease-out lg:hidden ${
          isBottomBarHidden ? "translate-y-[calc(100%+1rem)]" : "translate-y-0"
        }`}
      >
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.98 }}
          className="
            flex w-full max-w-sm items-center
            justify-between rounded-2xl
            border border-white/10
            bg-[#11100D]
            px-5 py-3
            text-sm font-medium
            text-neutral-300
            shadow-[0_8px_30px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            transition-colors duration-200
            hover:border-amber-400/30
          "
        >
          <div className="flex items-center gap-2">
            <span>Browse Concepts</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs text-neutral-500">
              {totalTopics}
            </span>

            <ChevronDown size={15} className="text-neutral-500" />
          </div>
        </motion.button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY + DRAWER
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120) setOpen(false);
              }}
              className="
                fixed bottom-0 left-0 z-50
                flex w-full flex-col
                rounded-t-3xl
                border-t border-white/10
                bg-[#0D0B09]
                shadow-[0_-10px_40px_rgba(0,0,0,0.6)]
                lg:hidden
              "
              style={{
                maxHeight: "80dvh",
              }}
            >
              {/* Drag Handle */}

              <div className="flex justify-center pb-1 pt-3">
                <div className="h-1 w-10 rounded-full bg-white/10" />
              </div>

              {/* Header */}

              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Concepts
                  </span>

                  <span className="rounded-full bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
                    {totalTopics}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    flex h-8 w-8 items-center
                    justify-center rounded-lg
                    border border-white/10
                    bg-white/3
                    text-neutral-500
                    transition-colors
                    hover:bg-white/6
                    hover:text-white
                  "
                >
                  <X size={15} />
                </button>
              </div>

              {/* Mobile Topics */}

              <div className="hide-scrollbar flex-1 overflow-y-auto p-4">
                <motion.nav
                  variants={groupContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {topicGroups.map((group) => {
                    const Icon = group.icon;
                    const isExpanded = expanded[group.name];

                    return (
                      <motion.div variants={groupItemVariants} key={group.name}>
                        {/* Parent */}

                        <button
                          type="button"
                          onClick={() => toggleGroup(group.name)}
                          className="
                            flex w-full items-center
                            justify-between rounded-xl
                            px-4 py-3
                            font-mono text-sm
                            text-neutral-300
                            transition-all duration-200
                            hover:bg-white/4
                          "
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} className="text-amber-400" />

                            {group.name}
                          </span>

                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          >
                            <ChevronDown
                              size={16}
                              className="text-neutral-500"
                            />
                          </motion.span>
                        </button>

                        {/* Subtopics */}

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <motion.div
                                variants={topicListVariants}
                                initial="hidden"
                                animate="visible"
                                className="ml-5 border-l border-white/8 py-1 pl-2"
                              >
                                {group.topics.map((topic) => {
                                  const active = isTopicActive(topic.href);

                                  return (
                                    <motion.div
                                      key={topic.href}
                                      variants={topicItemVariants}
                                    >
                                      <Link
                                        href={topic.href}
                                        onClick={() => setOpen(false)}
                                        className={`
                                          relative flex items-center
                                          rounded-lg px-3 py-2.5
                                          font-mono text-xs
                                          transition-colors duration-200

                                          ${
                                            active
                                              ? "bg-amber-400/10 text-amber-400"
                                              : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200"
                                          }
                                        `}
                                      >
                                        {active && (
                                          <motion.span
                                            layoutId="mobile-active-indicator"
                                            transition={{
                                              type: "spring",
                                              stiffness: 380,
                                              damping: 32,
                                            }}
                                            className="absolute -left-2.25 top-2 bottom-2 w-0.5 rounded-full bg-amber-400"
                                          />
                                        )}

                                        {topic.name}
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CodingSidebar;
