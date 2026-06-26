"use client";

import { useEffect, useState } from "react";
import ContractorSurveyPage from "@/components/surveys/ContractorSurveyPage";
import NoSurveyFoundPage from "@/components/surveys/NoSurveyFoundPage";
import { getScoutDomain } from "@/utils/network-util";

interface SurveyClientPageProps {
  contractorId: string;
}

const CheckSurveyClientPage = ({ contractorId }: SurveyClientPageProps) => {
  const [status, setStatus] = useState<string>("unknown");

  useEffect(() => {
    const fetchSurvey = async () => {
      const url = `${getScoutDomain()}/api/survey/contractor/${contractorId}`;

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

  if (!contractorId) {
    return <NoSurveyFoundPage />;
  }

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
