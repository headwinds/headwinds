"use client";

import { useEffect, useState } from "react";
import ContractorSurveyPage from "@/components/surveys/ContractorSurveyPage";
import NoSurveyFoundPage from "@/components/surveys/NoSurveyFoundPage";

interface SurveyClientPageProps {
  contractorId: string;
}

const CheckSurveyClientPage = ({ contractorId }: SurveyClientPageProps) => {
  const [status, setStatus] = useState<string>("unknown");

  if (!contractorId) {
    return <NoSurveyFoundPage />;
  }

  useEffect(() => {
    const fetchSurvey = async () => {
      const url = `http://localhost:8000/api/survey/contractor/${contractorId}`;

      try {
        const response = await fetch(url);
        const json = await response.json();

        const { message } = json;

        if (message === "success") {
          setStatus("found");
        } else {
          setStatus("fail");
        }
      } catch (err) {
        setStatus("fail");
      }
    };

    fetchSurvey();
  }, []);

  if (status === "unknown") {
    const message = `Checking survey with id ${contractorId}`;
    return <NoSurveyFoundPage message={message} />;
  }

  if (status === "found") {
    return <ContractorSurveyPage contractorId={contractorId} />;
  }

  return <NoSurveyFoundPage />;
};

export default CheckSurveyClientPage;
