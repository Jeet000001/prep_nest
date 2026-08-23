import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

type Question = {
  id: number;
  question: string;
  answer: string;
  code: string | null;
};

const topicFiles: Record<string, Record<string, string>> = {
  html: {
    introduction: "Introduction.json",
    "semantic-html": "Semantic HTML.json",
    "links-images": "Links_&_Images.json",
    lists: "Lists.json",
    multimedia: "Multimedia.json",
    tables: "Tables.json",
    forms: "Forms.json",
	html5: "HTML5.json",
	accessibility: "Accessibility.json"
  },
  css: {
    introduction: "Introduction.json",
    "box-model": "Box_Model.json",
    specificity: "Specificity.json",
    position: "Position.json",
    "display-visibility": "Display_&_Visibility.json",
    flexbox: "Flexbox.json",
    grid: "Grid.json",
    "responsive-design": "Responsive_Design.json",
    units: "Units.json",
    "position-element": "Positioning_Elements.json",
    "transitions-animations": "Transitions_&_Animations.json"

  }
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
    "questions",
    category,
    fileName,
  );
  const file = await fs.readFile(filePath, "utf-8");
  const questions = JSON.parse(file) as Question[];

  return (
    <div className="flex h-full min-h-0 w-full flex-col rounded-2xl border border-white/10 p-4 sm:p-6">
      <header className="border-b border-white/10 pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
          {category}
        </p>
        <h1 className="mt-2 text-2xl font-semibold capitalize text-white">
          {topic.replaceAll("-", " ")}
        </h1>
      </header>

      <div className="hide-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto pt-4">
        {questions.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <h2 className="text-lg font-medium text-white">{item.question}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-400">
              {item.answer}
            </p>
            {item.code && (
              <pre className="mt-4 overflow-x-auto rounded-lg bg-black/30 p-4 text-sm leading-6 text-amber-100">
                <code>{item.code}</code>
              </pre>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
