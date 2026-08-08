"use client";

import {
  Code,
  CodeBlock,
} from "@/Components/animate-ui/components/animate/code";

interface CodeDemoProps {
  duration?: number;
  delay?: number;
  writing?: boolean;
  cursor?: boolean;
}

export const CodeDemo = ({
  duration = 40,
  delay = 0,
  writing = true,
  cursor = true,
}: CodeDemoProps) => {
  const code = `import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            \`HTTP error! status: \${response.status}\`
          );
        }

        const result = await response.json();

        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;`;

  return (
    <Code
      className="h-120 w-full border-none sm:w-110"
      code={code}
    >
      <div className="px-4 py-3 font-mono text-sm text-neutral-400">
        use-fetch.jsx
      </div>

      <CodeBlock
        cursor={cursor}
        lang="jsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};