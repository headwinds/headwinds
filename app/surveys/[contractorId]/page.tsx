import type { Metadata } from "next";
import CheckSurveyClientPage from "./check-survey-client";

export const metadata: Metadata = {
  title: "Contractor survey | headwinds",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SurveyRoute({
  params,
}: {
  params: { contractorId: string };
}) {
  return <CheckSurveyClientPage contractorId={params.contractorId} />;
}
