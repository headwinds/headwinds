import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Headings
    h1: ({ children }) => (
      <h1 className="text-2xl md:text-3xl font-normal text-[#1A1A1A] leading-snug mt-8 mb-4 m-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-normal text-[#1A1A1A] mt-8 mb-2 m-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-medium text-[#1A1A1A] mt-6 mb-2 m-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-medium text-[#1A1A1A] mt-4 mb-1 m-0">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-sm font-medium text-[#1A1A1A] mt-4 mb-1 m-0">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-xs font-medium text-[#1A1A1A] mt-4 mb-1 m-0">
        {children}
      </h6>
    ),
    // Paragraphs
    p: ({ children }) => (
      <p className="text-sm text-[#3D3D3D] leading-relaxed my-2 mb-2">
        {children}
      </p>
    ),
    // Links
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-sm text-[#1A1A1A] underline hover:text-[#6B6B6B] transition-colors"
      >
        {children}
      </a>
    ),
    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-sm text-[#3D3D3D] leading-relaxed mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-sm text-[#3D3D3D] leading-relaxed mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="m-0">{children}</li>,
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#D5CEC6] pl-4 py-2 my-4 text-sm text-[#6B6B6B] italic">
        {children}
      </blockquote>
    ),
    // Code
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-[#EAE3DA] text-[#1A1A1A] px-2 py-1 rounded-md font-mono text-xs">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="bg-[#1A1A1A] text-[#F5F4F2] p-4 rounded-lg overflow-x-auto mb-4 font-mono text-xs leading-relaxed">
        {children}
      </pre>
    ),
    // Horizontal rule
    hr: () => <hr className="border-0 border-t border-[#D5CEC6] my-6" />,
    // Tables
    table: ({ children }) => (
      <table className="w-full border-collapse text-sm mb-4">{children}</table>
    ),
    thead: ({ children }) => (
      <thead className="bg-[#EAE3DA] border-b border-[#D5CEC6]">
        {children}
      </thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-[#D5CEC6]">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="text-left px-4 py-2 text-xs font-medium text-[#1A1A1A] tracking-wide">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-[#3D3D3D]">{children}</td>
    ),
    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#3D3D3D]">{children}</em>,
  };
}
