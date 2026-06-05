"use client";

import React, { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { getScoutDomain } from "@/utils/network-util";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    if (message.trim().length < 2) {
      setStatus("error");
      setErrorMsg("Message must be at least 2 characters.");
      return;
    }

    try {
      const res = await fetch(`${getScoutDomain()}/api/email/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, from_email: email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? "Failed to send");
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <PageShell>
      <div className="flex flex-col md:flex-row gap-1.5">
        {/* Contact Form Card */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6"
        >
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] m-0">
            GET IN TOUCH
          </p>
          <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight m-0">
            Let&apos;s work together.
          </h1>
          <p className="text-lg text-[#3D3D3D] leading-relaxed m-0">
            Got a project idea, a job offer, or just want to say hello? Drop me
            a line and I&apos;ll get back to you.
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1A1A1A]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full h-12 px-4 bg-white rounded-lg border border-[#C5BEB6] text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1A1A1A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full h-12 px-4 bg-white rounded-lg border border-[#C5BEB6] text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1A1A1A]">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project..."
              required
              rows={5}
              className="w-full px-4 py-3 bg-white rounded-lg border border-[#C5BEB6] text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-fit px-10 py-3.5 bg-[#1A1A1A] text-[#F3EBE2] rounded-lg text-sm font-bold hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-[#3D3D3D] m-0">
              Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600 m-0">
              {errorMsg || "Something went wrong. Please try again."}
            </p>
          )}
        </form>

        {/* Info Column */}
        <div className="w-full md:w-[420px] flex flex-col gap-1.5 md:shrink-0">
          <div className="bg-[#C3DED8] rounded-2xl p-8 flex flex-col gap-3">
            <svg
              className="w-6 h-6 text-[#1A1A1A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <h3 className="text-lg text-[#1A1A1A] m-0">Email</h3>
            <p className="text-sm text-[#3D3D3D] m-0">
              brandon@headwinds.net
            </p>
          </div>

          <div className="bg-[#C4CFDE] rounded-2xl p-8 flex flex-col gap-3">
            <svg
              className="w-6 h-6 text-[#1A1A1A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <h3 className="text-lg text-[#1A1A1A] m-0">Location</h3>
            <p className="text-sm text-[#3D3D3D] m-0">Toronto, Canada</p>
          </div>

          <div className="bg-[#D5DCBA] rounded-2xl p-8 flex flex-col gap-3">
            <svg
              className="w-6 h-6 text-[#1A1A1A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <h3 className="text-lg text-[#1A1A1A] m-0">Availability</h3>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ContactPage;
