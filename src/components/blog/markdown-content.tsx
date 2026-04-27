import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

/**
 * Renders blog markdown content with consistent editorial styling.
 */
export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-stone max-w-none prose-headings:tracking-tight prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:text-emerald-800 prose-strong:text-stone-900 prose-li:marker:text-emerald-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-stone-900 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-5 text-3xl font-semibold tracking-tight text-stone-900">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-stone-900">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base leading-8 text-stone-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 list-disc space-y-2 pl-6 text-stone-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 list-decimal space-y-2 pl-6 text-stone-700">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-emerald-300 bg-emerald-50/50 px-4 py-3 italic text-stone-700">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;

            if (isInline) {
              return (
                <code className="rounded bg-stone-100 px-1.5 py-0.5 text-sm text-stone-800">
                  {children}
                </code>
              );
            }

            return (
              <code className={className}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-2xl bg-stone-900 p-4 text-sm text-stone-100">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-stone-200 text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-stone-200 bg-stone-50 px-4 py-2 text-left font-semibold text-stone-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-stone-200 px-4 py-2 text-stone-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}