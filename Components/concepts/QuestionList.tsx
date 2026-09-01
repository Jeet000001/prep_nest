"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

// Same motion language as Hero / Navbar / ContactForm
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const QuestionList = ({ questions }: { questions: HighlightedQuestion[] }) => {
  const [activeFileIndex, setActiveFileIndex] = useState<Record<number, number>>({});

  const getActiveFileIndex = (questionId: number) => {
    return activeFileIndex[questionId] ?? 0;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {questions.map((item) => {
        const isMultiFile =
          Array.isArray(item.highlightedCode) && item.highlightedCode.length > 0;
        const currentFileIndex = getActiveFileIndex(item.id);
        const currentFile =
          isMultiFile &&
          Array.isArray(item.highlightedCode) &&
          currentFileIndex < item.highlightedCode.length
            ? item.highlightedCode[currentFileIndex]
            : null;

        return (
          <motion.article
            key={item.id}
            variants={itemVariants}
            whileHover={{ borderColor: "rgba(251,191,36,0.3)" }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-white/10 bg-white/3 p-4"
          >
            <h2 className="text-lg font-medium text-white">{item.question}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-neutral-400">
              {item.answer || item.explanation}
            </p>

            {isMultiFile && Array.isArray(item.highlightedCode) && (
              <>
                {/* File Tabs */}
                <div className="mt-4 flex flex-wrap gap-2 border-b border-white/10 pb-2">
                  {item.highlightedCode.map((file, index) => (
                    <button
                      key={file.fileName}
                      onClick={() =>
                        setActiveFileIndex((prev) => ({
                          ...prev,
                          [item.id]: index,
                        }))
                      }
                      className={`px-3 py-1 font-mono text-sm rounded transition-colors ${
                        currentFileIndex === index
                          ? "bg-amber-400/20 text-amber-400"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                      }`}
                    >
                      {file.fileName}
                    </button>
                  ))}
                </div>

                {/* Code Display */}
                {currentFile && (
                  <div
                    className="shiki-code mt-4 min-w-0 max-w-full overflow-hidden rounded-lg text-sm leading-6"
                    dangerouslySetInnerHTML={{
                      __html: currentFile.highlightedCode,
                    }}
                  />
                )}
              </>
            )}

            {!isMultiFile && item.highlightedCode && typeof item.highlightedCode === "string" && (
              <div
                className="shiki-code mt-4 min-w-0 max-w-full overflow-hidden rounded-lg text-sm leading-6"
                dangerouslySetInnerHTML={{ __html: item.highlightedCode }}
              />
            )}
          </motion.article>
        );
      })}
    </motion.div>
  );
};

export default QuestionList;
