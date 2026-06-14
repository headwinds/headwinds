"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations: { url: string; title?: string }[];
  blocks?: ChatBlock[];
}

type ChatBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "metrics";
      title: string;
      metrics: { label: string; value: string; description?: string }[];
    }
  | {
      type: "cta";
      title: string;
      description: string;
      href: string;
      label: string;
    };

interface ChatResponse {
  answer: string;
  citations: { url: string; title?: string }[];
  thread_id: string | null;
  blocks?: ChatBlock[];
}

function getCitationLabel(url: string, title?: string): string {
  if (title?.trim()) return title;
  try {
    return new URL(url).hostname;
  } catch {
    return "source";
  }
}

function stripCitationMarkers(text: string): string {
  return text.replace(/\[\d+\]/g, "").trim();
}

const markdownComponents: Record<string, any> = {
  p: ({ children }: any) => (
    <p className="text-sm text-[#F5F4F2] leading-[1.125rem] my-2 mb-4">
      {children}
    </p>
  ),
  strong: ({ children }: any) => (
    <strong className="text-[#F5F4F2] font-semibold">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic">{children}</em>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-[#C9A962] underline hover:opacity-80" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  h1: ({ children }: any) => (
    <h1 className="text-xl text-[#F5F4F2] font-semibold mt-6 mb-3">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-lg text-[#F5F4F2] font-semibold mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-base text-[#F5F4F2] font-semibold mt-6 mb-3">
      {children}
    </h3>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-sm text-[#F5F4F2] leading-relaxed my-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-sm text-[#F5F4F2] leading-relaxed my-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-2">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-[#444] pl-4 py-2 my-4 text-sm text-[#AAAAAA] italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: any) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`${className} bg-[#0A0A0A] text-[#F5F4F2] rounded p-1 font-mono text-xs`}>
          {children}
        </code>
      );
    }
    return (
      <code className="bg-[#333] text-[#F5F4F2] px-2 py-1 rounded-md font-mono text-xs">
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-[#0A0A0A] text-[#F5F4F2] p-4 rounded-lg overflow-x-auto my-4 font-mono text-xs leading-relaxed">
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="border-0 border-t border-[#333] my-6" />
  ),
};

function MetricsBlock({
  title,
  metrics,
}: Extract<ChatBlock, { type: "metrics" }>) {
  return (
    <div className="mt-3 rounded-xl border border-[#D5CEC6] bg-[#F3EBE2] p-3">
      <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] uppercase m-0 mb-3">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-[#EAE3DA] border border-[#D5CEC6] p-3">
            <p className="text-[11px] text-[#6B6B6B] tracking-[2px] uppercase m-0">
              {metric.label}
            </p>
            <p className="text-base text-[#1A1A1A] font-medium m-0 mt-1">
              {metric.value}
            </p>
            {metric.description && (
              <p className="text-xs text-[#8A8A8A] leading-relaxed m-0 mt-2">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaBlock({
  title,
  description,
  href,
  label,
}: Extract<ChatBlock, { type: "cta" }>) {
  return (
    <div className="mt-3 rounded-xl border border-[#D5CEC6] bg-[#F3EBE2] p-3">
      <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] uppercase m-0">
        {title}
      </p>
      <p className="text-sm text-[#3D3D3D] leading-relaxed m-0 mt-2">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-3 px-3 py-2 rounded-lg bg-[#C9A962] text-[#1A1A1A] text-sm font-medium no-underline hover:opacity-90 transition-opacity"
      >
        {label}
      </a>
    </div>
  );
}

const SUGGESTIONS = [
  "What projects has he lead?",
  "How has he proven his full-stack chops?",
  "Tell me about his AI work",
  "What has he done about Climate Change?",
];

const LandingChatWidget = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const sendMessage = useCallback(
    async (prompt: string) => {
      if (!prompt.trim() || isSending) return;

      const tempId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: tempId, role: "user", content: prompt, citations: [] },
      ]);
      setInputValue("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      try {
        setIsSending(true);
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, thread_id: threadId }),
        });

        if (res.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              role: "assistant",
              content:
                "You\u2019re sending messages too quickly. Please wait a moment and try again.",
              citations: [],
            },
          ]);
          return;
        }

        if (!res.ok) throw new Error("Request failed");

        const data: ChatResponse = await res.json();

        if (data.thread_id) setThreadId(data.thread_id);

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.answer,
            citations: data.citations,
            blocks: data.blocks,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
            citations: [],
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending, threadId]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 bg-[#1A1A1A] rounded-2xl flex flex-col overflow-hidden" style={{
      maxHeight: hasMessages ? "800px" : "400px",
      transition: "max-height 0.3s ease-out",
    }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex-shrink-0">
        <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
          AI ASSISTANT
        </p>
      </div>

      {/* Scrollable content area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 min-h-0">
        {!hasMessages ? (
          <div className="flex flex-col gap-4 py-2">
            <p className="text-base text-[#F5F4F2] leading-relaxed">
              Ask me anything about Brandon&apos;s work, skills, or interests.
            </p>
            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    onClick={() => sendMessage(suggestion)}
                    disabled={isSending}
                    className="px-3 py-2 rounded-full border border-[#333] bg-[#2A2A2A] text-sm text-[#AAAAAA] hover:border-[#C9A962] hover:text-[#F5F4F2] transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={clsx("flex", {
                  "justify-end": msg.role === "user",
                  "justify-start": msg.role === "assistant",
                })}
              >
                <div
                  className={clsx("max-w-[85%] rounded-lg px-3 py-2", {
                    "bg-[#C9A962] text-[#1A1A1A]": msg.role === "user",
                    "bg-[#2A2A2A] text-[#F5F4F2] border border-[#333]":
                      msg.role === "assistant",
                  })}
                >
                  {msg.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  ) : (
                    <>
                      <div className="text-sm leading-[1.125rem] max-w-none break-words">
                        <ReactMarkdown components={markdownComponents}>{stripCitationMarkers(msg.content)}</ReactMarkdown>
                      </div>

                      {msg.blocks?.length ? (
                        <div className="not-prose mt-5 space-y-4">
                          {msg.blocks.map((block, index) => {
                            if (block.type === "text") {
                              return (
                                <p
                                  key={`block-text-${index}`}
                                  className="text-sm text-[#F5F4F2] leading-[1.125rem] m-0"
                                >
                                  {block.content}
                                </p>
                              );
                            }

                            if (block.type === "metrics") {
                              return (
                                <MetricsBlock
                                  key={`block-metrics-${index}`}
                                  {...block}
                                />
                              );
                            }

                            if (block.type === "cta") {
                              return (
                                <CtaBlock
                                  key={`block-cta-${index}`}
                                  {...block}
                                />
                              );
                            }

                            return null;
                          })}
                        </div>
                      ) : null}
                    </>
                  )}
                  {msg.role === "assistant" && msg.citations.length > 0 && (() => {
                    const meaningfulCitations = msg.citations.filter(
                      (c) => getCitationLabel(c.url, c.title) !== "source"
                    );
                    const isExpanded = expandedCitations.has(msg.id);
                    const toggleExpanded = () => {
                      setExpandedCitations((prev) => {
                        const next = new Set(prev);
                        if (next.has(msg.id)) {
                          next.delete(msg.id);
                        } else {
                          next.add(msg.id);
                        }
                        return next;
                      });
                    };
                    return meaningfulCitations.length > 0 ? (
                      <div className="mt-4 pt-3 border-t border-[#333]">
                        <button
                          onClick={toggleExpanded}
                          className="flex items-center gap-2 text-[11px] text-[#AAAAAA] hover:text-[#F5F4F2] transition-colors font-medium tracking-[2px] uppercase"
                        >
                          <span>{isExpanded ? "▼" : "▶"}</span>
                          <span>Sources ({meaningfulCitations.length})</span>
                        </button>
                        {isExpanded && (
                          <div className="mt-2.5 flex flex-col gap-1.5">
                            {meaningfulCitations.map((c, i) => (
                              <a
                                key={i}
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[11px] px-2.5 py-1.5 rounded-lg border border-[#444] bg-[#1A1A1A] text-[#AAAAAA] hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-[#1A1A1A] transition-all truncate font-medium"
                              >
                                {getCitationLabel(c.url, c.title)}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-[#2A2A2A] border border-[#333] rounded-lg px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 pb-5 pt-3 flex-shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            placeholder="Ask me something about design or development..."
            rows={1}
            disabled={isSending}
            className="flex-1 resize-none rounded-lg bg-[#2A2A2A] border border-[#333] text-[#F5F4F2] placeholder:text-[#5A5A5A] px-3 py-2.5 text-sm focus:outline-none focus:border-[#C9A962] disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isSending}
            className="px-3 py-2.5 rounded-lg bg-[#C9A962] text-[#1A1A1A] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingChatWidget;
