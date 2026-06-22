import type { Metadata } from "next";
import ContractorSurveyPage from "@/components/surveys/ContractorSurveyPage";

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
  return <ContractorSurveyPage contractorId={params.contractorId} />;
}
