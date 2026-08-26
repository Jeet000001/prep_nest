import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";

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
    accessibility: "Accessibility.json",
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
    "transitions-animations": "Transitions_&_Animations.json",
    "pseudo-classes": "Pseudo_Classes.json",
    "css-variables": "CSS_Variables.json",
    preprocessors: "Preprocessors.json",
    performance: "Performance.json",
    "browser-compatibility": "Browser_Compatibility.json",
  },
  javascript: {
    introduction: "Introduction.json",
    variables: "Variables.json",
    "data-types": "Data_Types.json",
    "type-coercion": "Type_Coercion.json",
    operators: "Operators.json",
    scope: "Scope.json",
    hoisting: "Hoisting.json",
    functions: "Functions.json",
    "arrow-functions": "Arrow_Functions.json",
    "this-keyword": "this_Keyword.json",
    "call-apply-bind": "Call_Apply_Bind.json",
    closures: "Closures.json",
    "execution-context": "Execution_Context.json",
    "call-stack": "Call_Stack.json",
    objects: "Objects.json",
    arrays: "Arrays.json",
    destructuring: "Destructuring.json",
    prototype: "Prototype.json",
    "classes-OOP": "Classes_&_OOP.json",
    immutability: "Immutability.json",
    "deep-copy-shallow-copy": "Deep_Copy_&_Shallow_Copy.json",
    strings: "Strings.json",
    "number-math": "Numbers_&_Math.json",
    promises: "Promises.json",
    "promise-methods": "Promise_Methods.json",
    "asynchronous-javaScript": "Asynchronous_javaScript.json",
    "async-await": "Async_Await.json",
    callbacks: "Callbacks.json",
    "event_handling": "Event_Handling.json",
    "dom": "DOM.json",
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
    "questions",
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
      highlightedCode: item.code
        ? await codeToHtml(item.code, {
            lang: language,
            theme: "slack-dark",
          })
        : null,
    })),
  );

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

      <div
        data-concepts-scroll
        className="hide-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto pt-4"
      >
        {highlightedQuestions.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/3 p-4"
          >
            <h2 className="text-lg font-medium text-white">{item.question}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-400">
              {item.answer}
            </p>
            {item.highlightedCode && (
              <div
                className="shiki-code mt-4 min-w-0 max-w-full overflow-hidden rounded-lg text-sm leading-6"
                dangerouslySetInnerHTML={{ __html: item.highlightedCode }}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
