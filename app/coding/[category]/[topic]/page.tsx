import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import QuestionList from "@/Components/concepts/QuestionList";
import AnimatedHeader from "@/Components/concepts/Header";

type CodeFile = {
  fileName: string;
  code: string;
};

type Question = {
  id: number;
  question: string;
  answer?: string;
  code?: string | null;
  solution?: string | null;
  explanation?: string;
  files?: CodeFile[];
};

type TopicSource = {
  fileName: string;
  questionIds?: number[];
};

const topicFiles: Record<string, Record<string, TopicSource>> = {
  javascript: {
    strings: { fileName: "string.json" },
    arrays: { fileName: "array.json" },
    "array-polyfills": { fileName: "Array_Polyfills.json" },
    objects: { fileName: "object.json" },
    closure: { fileName: "Closure.json" },
    debounce: { fileName: "Debounce.json" },
    throttle: { fileName: "Throttle.json" },
    others: { fileName: "Others.json" },
  },
  react: {
    counter: { fileName: "data.json", questionIds: [1] },
    stopwatch: { fileName: "data.json", questionIds: [2] },
    tabs: { fileName: "data.json", questionIds: [3] },
    "product-search": { fileName: "data.json", questionIds: [4] },
    "category-filter": { fileName: "data.json", questionIds: [5] },
    "star-rating": { fileName: "data.json", questionIds: [6] },
    "sign-up-form": { fileName: "data.json", questionIds: [7] },
    "multi-step-form": { fileName: "data.json", questionIds: [8] },
    "api-fetching": { fileName: "data.json", questionIds: [9] },
    "debounce-search": { fileName: "data.json", questionIds: [10] },
    "shopping-cart": { fileName: "data.json", questionIds: [11] },
    "task-manager": { fileName: "data.json", questionIds: [12] },
    "modal": { fileName: "data.json", questionIds: [13] },
    "otp-input": { fileName: "data.json", questionIds: [14] },
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
  const topicSource = topicFiles[category]?.[topic];

  if (!topicSource) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "data",
    "coding",
    category,
    topicSource.fileName,
  );
  const file = await fs.readFile(filePath, "utf-8");
  const allQuestions = JSON.parse(file) as Question[];
  const questions = topicSource.questionIds
    ? allQuestions.filter((item) => topicSource.questionIds?.includes(item.id))
    : allQuestions;
  const language =
    category === "html"
      ? "html"
      : category === "javascript"
        ? "javascript"
        : category === "react"
          ? "tsx"
          : "css";

  const highlightedQuestions = await Promise.all(
    questions.map(async (item) => {
      if (item.files && item.files.length > 0) {
        return {
          ...item,
          highlightedCode: await Promise.all(
            item.files.map(async (codeFile) => ({
              fileName: codeFile.fileName,
              code: codeFile.code,
              highlightedCode: await codeToHtml(codeFile.code, {
                lang: language,
                theme: "slack-dark",
              }),
            })),
          ),
        };
      }

      return {
        ...item,
        highlightedCode:
          item.code || item.solution
            ? await codeToHtml(item.code || item.solution || "", {
                lang: language,
                theme: "slack-dark",
              })
            : null,
      };
    }),
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
