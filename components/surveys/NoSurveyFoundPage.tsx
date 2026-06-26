"use client";

import React, { useMemo, useState } from "react";
import PageShell from "@/components/layout/PageShell";

interface NoSurveyFoundPageProps {
  message?: string;
}

const NoSurveyFoundPage = ({ message }: NoSurveyFoundPageProps) => {
  return (
    <PageShell>
      <main className="flex flex-col gap-1.5 lg:flex-row align-center justify-center">
        <div className="flex flex-col gap-1.5 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
          {message || "No Survey Found"}
        </div>
      </main>
    </PageShell>
  );
};

export default NoSurveyFoundPage;
