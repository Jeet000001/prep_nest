"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      { name: "Introduction", href: "/concepts/html/introduction" },
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
      { name: "Introduction", href: "/concepts/css/introduction" },
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
      { name: "Browser Compatibility", href: "/concepts/css/browser-compatibility" },
    ],
  },

  {
    name: "JavaScript",
    icon: Braces,
    topics: [
      { name: "JavaScript Basics", href: "/concepts/javascript/basics" },
      { name: "Variables", href: "/concepts/javascript/variables" },
      { name: "Data Types", href: "/concepts/javascript/data-types" },
      { name: "Operators", href: "/concepts/javascript/operators" },
      { name: "Functions", href: "/concepts/javascript/functions" },
      { name: "Arrays", href: "/concepts/javascript/arrays" },
      { name: "Objects", href: "/concepts/javascript/objects" },
      { name: "Scope", href: "/concepts/javascript/scope" },
      { name: "Closures", href: "/concepts/javascript/closures" },
      { name: "DOM", href: "/concepts/javascript/dom" },
      { name: "Events", href: "/concepts/javascript/events" },
      { name: "Promises", href: "/concepts/javascript/promises" },
      { name: "Async / Await", href: "/concepts/javascript/async-await" },
      { name: "Fetch API", href: "/concepts/javascript/fetch-api" },
      { name: "ES6+", href: "/concepts/javascript/es6" },
    ],
  },

  {
    name: "React",
    icon: Atom,
    topics: [
      { name: "React Basics", href: "/concepts/react/basics" },
      { name: "Components", href: "/concepts/react/components" },
      { name: "JSX", href: "/concepts/react/jsx" },
      { name: "Props", href: "/concepts/react/props" },
      { name: "State", href: "/concepts/react/state" },
      { name: "Events", href: "/concepts/react/events" },
      {
        name: "Conditional Rendering",
        href: "/concepts/react/conditional-rendering",
      },
      { name: "Lists & Keys", href: "/concepts/react/lists-keys" },
      { name: "useState", href: "/concepts/react/use-state" },
      { name: "useEffect", href: "/concepts/react/use-effect" },
      { name: "useRef", href: "/concepts/react/use-ref" },
      { name: "useMemo", href: "/concepts/react/use-memo" },
      { name: "useCallback", href: "/concepts/react/use-callback" },
      { name: "Context API", href: "/concepts/react/context-api" },
      { name: "Custom Hooks", href: "/concepts/react/custom-hooks" },
      { name: "Performance", href: "/concepts/react/performance" },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  // Default opened groups
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    HTML: true,
    CSS: false,
    JavaScript: false,
    React: false,
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
              <nav className="space-y-1">
                {topicGroups.map((group) => {
                  const Icon = group.icon;
                  const isExpanded = expanded[group.name];

                  return (
                    <div key={group.name}>
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

                        <ChevronDown
                          size={15}
                          className={`
                            text-neutral-600
                            transition-transform duration-300
                            ${isExpanded ? "rotate-180" : ""}
                          `}
                        />
                      </button>

                      {/* Subtopics */}

                      <div
                        className={`
                          grid transition-all duration-300
                          ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="ml-4 border-l border-white/8 pl-2 py-1">
                            {group.topics.map((topic) => {
                              const active = isTopicActive(topic.href);

                              return (
                                <Link
                                  key={topic.href}
                                  href={topic.href}
                                  className={`
                                    relative flex items-center
                                    rounded-md px-3 py-2
                                    font-mono text-[12px]
                                    transition-all duration-200

                                    ${
                                      active
                                        ? "bg-amber-400/10 text-amber-400"
                                        : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200"
                                    }
                                  `}
                                >
                                  {active && (
                                    <span className="absolute -left-2.25 top-1.5 bottom-1.5 w-0.5 rounded-full bg-amber-400" />
                                  )}

                                  {topic.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE / TABLET BUTTON
      ===================================================== */}

      <div className="fixed bottom-4 left-0 z-40 flex w-full justify-center px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
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
            transition-all duration-200
            hover:border-amber-400/30
            active:scale-[0.98]
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
        </button>
      </div>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

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

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

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

          ${open ? "translate-y-0" : "translate-y-full"}
        `}
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
          <nav className="space-y-1">
            {topicGroups.map((group) => {
              const Icon = group.icon;
              const isExpanded = expanded[group.name];

              return (
                <div key={group.name}>
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

                    <ChevronDown
                      size={16}
                      className={`
                        text-neutral-500
                        transition-transform duration-300
                        ${isExpanded ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {/* Subtopics */}

                  <div
                    className={`
                      grid transition-all duration-300
                      ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="ml-5 border-l border-white/8 py-1 pl-2">
                        {group.topics.map((topic) => {
                          const active = isTopicActive(topic.href);

                          return (
                            <Link
                              key={topic.href}
                              href={topic.href}
                              onClick={() => setOpen(false)}
                              className={`
                                relative flex items-center
                                rounded-lg px-3 py-2.5
                                font-mono text-xs
                                transition-all duration-200

                                ${
                                  active
                                    ? "bg-amber-400/10 text-amber-400"
                                    : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200"
                                }
                              `}
                            >
                              {active && (
                                <span className="absolute -left-2.25 top-2 bottom-2 w-0.5 rounded-full bg-amber-400" />
                              )}

                              {topic.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
