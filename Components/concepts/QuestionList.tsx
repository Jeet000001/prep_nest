"use client";

import { motion } from "framer-motion";

type HighlightedQuestion = {
  id: number;
  question: string;
  answer: string;
  code: string | null;
  highlightedCode: string | null;
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {questions.map((item) => (
        <motion.article
          key={item.id}
          variants={itemVariants}
          whileHover={{ borderColor: "rgba(251,191,36,0.3)" }}
          transition={{ duration: 0.25 }}
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
        </motion.article>
      ))}
    </motion.div>
  );
};

export default QuestionList;
