"use client";

import { useEffect, useMemo, useState } from "react";
import { getScoutDomain } from "@/utils/network-util";

type QuizSummary = {
  id: string;
  title?: string;
  description?: string;
  collection_type?: string;
  created_at?: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  questionType?: string;
};

type QuizDetail = {
  quiz_question_collection_id?: string;
  title?: string;
  description?: string;
  questions?: QuizQuestion[];
};

type PaginatedQuizzes = {
  items?: QuizSummary[];
  quizzes?: QuizSummary[];
  page: number;
  limit: number;
  totalCount?: number;
  totalPages?: number;
};

function assembleQuizDetail(summary: QuizSummary, questions: QuizQuestion[]) {
  return {
    ...summary,
    quiz_question_collection_id: summary.id,
    questions,
  };
}

export default function CastleKeepSurveysPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizzes, setQuizzes] = useState<PaginatedQuizzes | null>(null);
  const [selected, setSelected] = useState<QuizDetail | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const domain = useMemo(() => getScoutDomain(), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchList = async () => {
      setLoading(true);
      setError(null);
      setSelected(null);

      const url = new URL(`${domain}/api/quiz/list`);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));
      url.searchParams.set("type", "survey");

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || `Failed to load survey list: ${response.status}`);
        }

        const json = (await response.json()) as QuizListResponse;
        const list = json.items ?? json.quizzes ?? [];

        setQuizzes({
          items: list,
          quizzes: list,
          page,
          limit,
          totalCount: list.length,
          totalPages: 1,
        });
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") return;
        setError((fetchError as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchList();

    return () => controller.abort();
  }, [domain, page, limit]);

  const loadDetail = async (quiz: QuizSummary) => {
    setQuestionsLoading(true);
    setSelected(null);
    setError(null);

    try {
      const url = new URL(`${domain}/api/quiz`);
      url.searchParams.set("id", quiz.id);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Failed to load survey detail: ${response.status}`);
      }

      const json = (await response.json()) as { quiz?: QuizDetail };
      const detail = json.quiz;

      if (!detail) {
        throw new Error("Missing quiz detail");
      }

      setSelected({
        ...assembleQuizDetail(quiz, detail.questions ?? []),
      });
    } catch (fetchError) {
      setError((fetchError as Error).message);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const canPrev = (quizzes?.page ?? 1) > 1;
  const canNext = (quizzes?.page ?? 1) < (quizzes?.totalPages ?? 1);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          CastleKeep surveys
        </h1>
        <p className="text-sm text-zinc-600">
          Paginated question collections from Scout.
        </p>
      </header>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="flex flex-col gap-3">
          {loading && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              Loading surveys...
            </div>
          )}

          {!loading && quizzes && (quizzes.items?.length === 0 || quizzes.quizzes?.length === 0) && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              No surveys found.
            </div>
          )}

          <ul className="flex flex-col gap-2">
            {(quizzes?.items ?? quizzes?.quizzes ?? []).map((quiz) => (
              <li key={quiz.id}>
                <button
                  type="button"
                  onClick={() => loadDetail(quiz)}
                  className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300"
                >
                  <span className="block font-medium">
                    {quiz.title ?? `Survey ${quiz.id}`}
                  </span>
                  {quiz.description && (
                    <span className="mt-1 line-clamp-2 text-sm text-zinc-600">
                      {quiz.description}
                    </span>
                  )}
                  <span className="mt-2 inline-flex text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {quiz.collection_type ?? "survey"}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={!canPrev}
              onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-zinc-600">
              Page {quizzes?.page ?? page}
            </span>
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setPage((previous) => previous + 1)}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          {questionsLoading && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              Loading questions...
            </div>
          )}

          {!questionsLoading && !selected && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              Select a survey to inspect its questions.
            </div>
          )}

          {selected && (
            <div className="flex flex-col gap-3">
              <header className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                  {selected.title ?? selected.quiz_question_collection_id}
                </h2>
                {selected.description && (
                  <p className="text-sm text-zinc-600">{selected.description}</p>
                )}
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {selected.collection_type ?? "survey"} • {selected.questions?.length ?? 0} questions
                </span>
              </header>

              <div className="flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                {(selected.questions ?? []).map((question, index) => (
                  <div key={question.id ?? `${selected.id}-${index}`} className="flex flex-col gap-1 p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {index + 1}. {question.questionType ?? "question"}
                    </span>
                    <span className="text-sm">{question.question}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
