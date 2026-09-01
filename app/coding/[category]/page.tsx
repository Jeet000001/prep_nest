import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import QuestionList from "@/Components/concepts/QuestionList";
import CodingTopicHeader from "@/Components/coding/CodingTopicHeader";

type CodeFile = {
  fileName: string;
  code: string;
};

type Question = {
  id: number;
  question: string;
  explanation?: string;
  files?: CodeFile[];
};

type HighlightedCodeFile = {
  fileName: string;
  code: string;
  highlightedCode: string;
};

type HighlightedQuestion = {
  id: number;
  question: string;
  answer?: string;
  explanation?: string;
  code?: string | null;
  solution?: string | null;
  highlightedCode?: string | null | HighlightedCodeFile[];
};

// Categories that support showing all questions without topics
const allQuestionsCategories = ["react"];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;

  // Only allow specific categories to show all questions
  if (!allQuestionsCategories.includes(category.toLowerCase())) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "data",
    "coding",
    category,
    "data.json"
  );

  let questions: Question[] = [];
  
  try {
    const file = await fs.readFile(filePath, "utf-8");
    questions = JSON.parse(file) as Question[];
  } catch {
    notFound();
  }

  const language = category === "react" ? "tsx" : "javascript";

  const highlightedQuestions: HighlightedQuestion[] = await Promise.all(
    questions.map(async (item) => {
      let highlightedCode: HighlightedCodeFile[] | null = null;

      // Handle multiple files format
      if (item.files && item.files.length > 0) {
        highlightedCode = await Promise.all(
          item.files.map(async (file) => ({
            fileName: file.fileName,
            code: file.code,
            highlightedCode: await codeToHtml(file.code, {
              lang: language,
              theme: "slack-dark",
            }),
          }))
        );
      }

      return {
        id: item.id,
        question: item.question,
        explanation: item.explanation,
        highlightedCode: highlightedCode || null,
      };
    })
  );

  const categoryTitle =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-white/10 p-4 sm:p-6">
      <CodingTopicHeader
        title={categoryTitle}
        description={`All ${categoryTitle} interview questions and solutions`}
      />

      <div
        data-concepts-scroll
        className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pt-4"
      >
        <QuestionList questions={highlightedQuestions} />
      </div>
    </div>
  );
}
