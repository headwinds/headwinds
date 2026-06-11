"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations: { url: string; title?: string }[];
}

interface ChatResponse {
  answer: string;
  citations: { url: string; title?: string }[];
  thread_id: string | null;
}

function getCitationLabel(url: string, title?: string): string {
  if (title?.trim()) return title;
  try {
    return new URL(url).hostname;
  } catch {
    return "source";
  }
}

const SUGGESTIONS = [
  "What projects has Brandon built?",
  "What are his core skills?",
  "Tell me about his AI work",
];

const LandingChatWidget = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
                    <div className="text-sm prose prose-sm prose-invert max-w-none break-words prose-p:my-1 prose-headings:my-2 prose-headings:text-[#F5F4F2] prose-strong:text-[#F5F4F2] prose-a:text-[#C9A962]">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                  {msg.role === "assistant" && msg.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#333] flex flex-wrap gap-1">
                      {msg.citations.slice(0, 3).map((c, i) => (
                        <a
                          key={i}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] px-2 py-0.5 rounded bg-[#333] text-[#888] hover:text-[#F5F4F2] transition-colors truncate max-w-[160px]"
                        >
                          {getCitationLabel(c.url, c.title)}
                        </a>
                      ))}
                    </div>
                  )}
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
