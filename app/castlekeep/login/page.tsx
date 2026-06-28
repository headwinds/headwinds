"use client";

import { useEffect, useState } from "react";

type QuizSummary = {
  id: string;
  title?: string;
  description?: string;
  collection_type?: string;
  created_at?: string;
};

type QuizListResponse = {
  message?: string;
  status?: number;
  items?: QuizSummary[];
  quizzes?: QuizSummary[];
};

export default function CastleKeepLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      setStatus(error);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Logging in...");

    const form = new FormData();
    form.set("email", email);
    form.set("password", password);
    form.set("redirect", "/castlekeep/surveys");

    try {
      const response = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        window.location.href = "/castlekeep/surveys";
        return;
      }

      const text = await response.text();
      setStatus(text || `Login failed: ${response.status}`);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unexpected login error"
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">
        CastleKeep login
      </h1>
      <p className="mt-2 text-sm text-zinc-600">
        Sign in with the credentials from <strong>next-auth</strong> to load surveys.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="rounded-xl border border-zinc-300 p-2"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="rounded-xl border border-zinc-300 p-2"
            placeholder="••••••••"
            required
          />
        </label>

        <button
          type="submit"
          className="rounded-xl bg-zinc-900 p-3 text-center text-sm font-semibold text-white"
        >
          Login
        </button>

        {status && (
          <span className="text-sm text-red-600">{status}</span>
        )}
      </form>
    </div>
  );
}
