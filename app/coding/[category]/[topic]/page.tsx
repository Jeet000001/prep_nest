import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import QuestionList from "@/Components/concepts/QuestionList";
import AnimatedHeader from "@/Components/concepts/Header";

type Question = {
  id: number;
  question: string;
  answer?: string;
  code?: string | null;
  solution?: string | null;
  explanation?: string;
};

const topicFiles: Record<string, Record<string, string>> = {
  javascript: {
    strings: "string.json",
    arrays: "array.json",
    objects: "object.json",
    functions: "function.json",
    loops: "loop.json",
    conditionals: "conditional.json",
    "es6-features": "es6.json",
    "dom-manipulation": "dom.json",
    events: "event.json",
    "async-programming": "async.json",
  },
  react: {
    components: "component.json",
    jsx: "jsx.json",
    props: "prop.json",
    state: "state.json",
    hooks: "hook.json",
    "event-handling": "eventHandling.json",
    forms: "form.json",
    "lists-keys": "listKeys.json",
    "conditional-rendering": "conditionalRendering.json",
    performance: "performance.json",
  },
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    category: string;
    topic: string;
  }>;
}) {
  const { category, topic } = await params;
  const fileName = topicFiles[category]?.[topic];

  if (!fileName) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "data",
    "coding",
    category,
    fileName,
  );
  const file = await fs.readFile(filePath, "utf-8");
  const questions = JSON.parse(file) as Question[];
  const language =
    category === "html"
      ? "html"
      : category === "javascript"
        ? "javascript"
        : category === "react"
          ? "tsx"
          : "css";
  const highlightedQuestions = await Promise.all(
    questions.map(async (item) => ({
      ...item,
      highlightedCode: (item.code || item.solution)
        ? await codeToHtml(item.code || item.solution || "", {
            lang: language,
            theme: "slack-dark",
          })
        : null,
    })),
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-white/10 p-4 sm:p-6">
      <AnimatedHeader category={category} topic={topic} />

      <div
        data-concepts-scroll
        className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pt-4"
      >
        <QuestionList questions={highlightedQuestions} />
      </div>
    </div>
  );
}
