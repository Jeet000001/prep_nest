"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  X,
  LayoutGrid,
  Code2,
  FileCode2,
  Braces,
  Atom,
} from "lucide-react";

type Topic = {
  name: string;
  href: string;
};

type TopicGroup = {
  name: string;
  icon: React.ElementType;
  topics: Topic[];
};

const topicGroups: TopicGroup[] = [
  {
    name: "HTML",
    icon: FileCode2,
    topics: [
      { name: "HTML Introduction", href: "/concepts/html/introduction" },
      { name: "Semantic HTML", href: "/concepts/html/semantic-html" },
      {
        name: "Forms",
        href: "/concepts/html/forms",
      },
      { name: "Tables", href: "/concepts/html/tables" },
      { name: "Lists", href: "/concepts/html/lists" },
      { name: "Links & Images", href: "/concepts/html/links-images" },
      { name: "Multimedia", href: "/concepts/html/multimedia" },
      { name: "HTML5", href: "/concepts/html/html5" },
      { name: "Accessibility", href: "/concepts/html/accessibility" },
    ],
  },

  {
    name: "CSS",
    icon: Code2,
    topics: [
      { name: "CSS Introduction", href: "/concepts/css/introduction" },
      { name: "Box Model", href: "/concepts/css/box-model" },
      { name: "Specificity", href: "/concepts/css/specificity" },
      { name: "Position", href: "/concepts/css/position" },
      {
        name: "Display & Visibility",
        href: "/concepts/css/display-visibility",
      },
      { name: "Flexbox", href: "/concepts/css/flexbox" },
      { name: "Grid", href: "/concepts/css/grid" },
      { name: "Responsive Design", href: "/concepts/css/responsive-design" },
      { name: "Units", href: "/concepts/css/units" },
      { name: "Positioning Element", href: "/concepts/css/position_element" },
      {
        name: "Transitions Animations",
        href: "/concepts/css/transitions-animations",
      },
      { name: "Pseudo Classes", href: "/concepts/css/pseudo-classes" },
      { name: "CSS Variables", href: "/concepts/css/css-variables" },
      { name: "Preprocessors", href: "/concepts/css/preprocessors" },
      { name: "Performance", href: "/concepts/css/performance" },
      {
        name: "Browser Compatibility",
        href: "/concepts/css/browser-compatibility",
      },
    ],
  },

  {
    name: "JavaScript",
    icon: Braces,
    topics: [
      {
        name: "JavaScript Introduction",
        href: "/concepts/javascript/introduction",
      },
      { name: "Variables", href: "/concepts/javascript/variables" },
      { name: "Data Types", href: "/concepts/javascript/data-types" },
      { name: "Type Coercion", href: "/concepts/javascript/type-coercion" },
      { name: "Operators", href: "/concepts/javascript/operators" },
      { name: "Scope", href: "/concepts/javascript/scope" },
      { name: "Hoisting", href: "/concepts/javascript/hoisting" },
      { name: "Functions", href: "/concepts/javascript/functions" },
      { name: "Arrow Functions", href: "/concepts/javascript/arrow-functions" },
      { name: "This Keyword", href: "/concepts/javascript/this-keyword" },
      {
        name: "Call, Apply, Bind",
        href: "/concepts/javascript/call-apply-bind",
      },
      { name: "Closures", href: "/concepts/javascript/closures" },
      {
        name: "Execution Context",
        href: "/concepts/javascript/execution-context",
      },
      { name: "Call Stack", href: "/concepts/javascript/call-stack" },
      { name: "Objects", href: "/concepts/javascript/objects" },
      { name: "Arrays", href: "/concepts/javascript/arrays" },
      { name: "Destructuring", href: "/concepts/javascript/destructuring" },
      { name: "Prototype", href: "/concepts/javascript/prototype" },
      { name: "Classes and OOP", href: "/concepts/javascript/classes-OOP" },
      { name: "Immutability", href: "/concepts/javascript/immutability" },
      {
        name: "Deep Copy & Shallow Copy",
        href: "/concepts/javascript/deep-copy-shallow-copy",
      },
      { name: "Strings", href: "/concepts/javascript/strings" },
      { name: "Numbers & Math()", href: "/concepts/javascript/number-math" },
      { name: "Promises", href: "/concepts/javascript/promises" },
      {
        name: "Promises Methods",
        href: "/concepts/javascript/promise-methods",
      },
      {
        name: "Asynchronous JavaScript",
        href: "/concepts/javascript/asynchronous-javaScript",
      },
      { name: "Async Await", href: "/concepts/javascript/async-await" },
      { name: "Callbacks", href: "/concepts/javascript/callbacks" },
      { name: "Event Handling", href: "/concepts/javascript/event_handling" },
      { name: "DOM", href: "/concepts/javascript/dom" },
      { name: "Web Storage", href: "/concepts/javascript/web-storage" },
      { name: "Fetch API", href: "/concepts/javascript/fetch-api" },
      { name: "Modules", href: "/concepts/javascript/modules" },
      { name: "Error Handling", href: "/concepts/javascript/error-handling" },
      {
        name: "Regular Expressions",
        href: "/concepts/javascript/regular-expressions",
      },
      {
        name: "Memory Management",
        href: "/concepts/javascript/memory-management",
      },
      {
        name: "Debouncing & Throttling",
        href: "/concepts/javascript/debouncing-throttling",
      },
      {
        name: "JSON",
        href: "/concepts/javascript/JSON",
      },
      {
        name: "Browser Concepts",
        href: "/concepts/javascript/browser-concepts",
      },
      {
        name: "Advanced JavaScript",
        href: "/concepts/javascript/advanced-javaScript",
      },
      {
        name: "Output Based Questions",
        href: "/concepts/javascript/output-based-questions",
      },
    ],
  },

  {
    name: "React",
    icon: Atom,
    topics: [
      { name: "React Introduction", href: "/concepts/react/introduction" },
      { name: "Components", href: "/concepts/react/components" },
      { name: "JSX", href: "/concepts/react/jsx" },
      { name: "Props", href: "/concepts/react/props" },
      { name: "Events", href: "/concepts/react/events" },
      {
        name: "Conditional Rendering",
        href: "/concepts/react/conditional-rendering",
      },
      { name: "Lists & Keys", href: "/concepts/react/lists-keys" },
      { name: "Forms", href: "/concepts/react/forms" },
      { name: "useState", href: "/concepts/react/useState" },
      { name: "useEffect", href: "/concepts/react/useEffect" },
      { name: "useRef", href: "/concepts/react/useRef" },
      { name: "useMemo", href: "/concepts/react/useMemo" },
      { name: "useCallback", href: "/concepts/react/useCallback" },
      { name: "useReducer", href: "/concepts/react/useReducer" },
      { name: "React.memo", href: "/concepts/react/react-memo" },
      { name: "Context API", href: "/concepts/react/context-api" },
      { name: "Custom Hooks", href: "/concepts/react/custom-hooks" },
      { name: "Hooks Rules", href: "/concepts/react/hooks-rules" },
      { name: "Rerendering", href: "/concepts/react/rerendering" },
      { name: "Virtual DOM & Reconciliation", href: "/concepts/react/virtual-dom-reconciliation" },
      { name: "Lifecycle", href: "/concepts/react/lifecycle" },
      { name: "Error Handling", href: "/concepts/react/error-handling" },
      { name: "Code Splitting", href: "/concepts/react/code-splitting" },
      { name: "Suspense", href: "/concepts/react/suspense" },
      { name: "Portals", href: "/concepts/react/portals" },
      { name: "State Management", href: "/concepts/react/state-management" },
      { name: "Redux", href: "/concepts/react/redux" },
      { name: "Data Fetching", href: "/concepts/react/data-fetching" },
      { name: "Performance", href: "/concepts/react/performance" },
      { name: "StrictMode", href: "/concepts/react/strictmode" },
      { name: "Server & Client Components", href: "/concepts/react/server-client-components" },
      { name: "React 18,19", href: "/concepts/react/react-18-19" },
      { name: "Tricky Questions", href: "/concepts/react/tricky-questions" },
    ],
  },
];

// Same motion language as Hero / Navbar / ContactForm
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

const Sidebar = () => {
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
                <LayoutGrid size={15} className="text-amber-400" />

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

                  return (
                    <motion.div variants={groupItemVariants} key={group.name}>
                      {/* Parent */}

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
            <LayoutGrid size={17} className="text-amber-400" />

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
                  <LayoutGrid size={16} className="text-amber-400" />

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

export default Sidebar;
