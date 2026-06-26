import { NextRequest, NextResponse } from "next/server";

type ContractorSurveyResponses = Record<string, unknown>;

type ScoutAnswer = {
  quiz_question_id: string;
  selectedId: string;
  question: string;
};

type SurveyQuestion = {
  field: string;
  question: string;
  questionType: "text" | "singleChoice" | "multipleChoice";
};

const SCOUT_API_URL =
  process.env.SCOUT_API_URL ||
  process.env.SCOUT_API_URL_PROD ||
  (process.env.NODE_ENV === "production"
    ? "https://scout-222670816692.northamerica-northeast1.run.app"
    : "http://localhost:8000");

const surveyQuestions: SurveyQuestion[] = [
  { field: "contractorName", question: "Your name", questionType: "text" },
  { field: "companyName", question: "Company name", questionType: "text" },
  { field: "email", question: "Email", questionType: "text" },
  {
    field: "hasWebsite",
    question: "Do you have a website?",
    questionType: "singleChoice",
  },
  {
    field: "yearsInBusiness",
    question: "How many years have you been in business?",
    questionType: "singleChoice",
  },
  {
    field: "websiteUrl",
    question: "What is your website URL?",
    questionType: "text",
  },
  {
    field: "wantsWebsite",
    question: "Would you like a website?",
    questionType: "singleChoice",
  },
  {
    field: "projectRecordingProcess",
    question:
      "After each project, what do you use to record the project details and photos?",
    questionType: "text",
  },
  {
    field: "testimonialFrequency",
    question: "Do you ask each customer for a testimonial after each project?",
    questionType: "singleChoice",
  },
  {
    field: "clientContactCadence",
    question:
      "How often do you contact clients after the work has been completed?",
    questionType: "singleChoice",
  },
  {
    field: "existingCustomerAgentComfort",
    question:
      "How would you feel about an agent contacting existing customers for a short survey?",
    questionType: "singleChoice",
  },
  {
    field: "newCustomerAgentComfort",
    question:
      "How would you feel about an agent contacting new customers after a project is completed?",
    questionType: "singleChoice",
  },
  {
    field: "acquisitionChannels",
    question: "How do you typically get new customers?",
    questionType: "multipleChoice",
  },
  {
    field: "acquisitionOther",
    question: "Other customer source",
    questionType: "text",
  },
  {
    field: "workWanted",
    question: "What type of work do you want more of?",
    questionType: "text",
  },
  {
    field: "outcomes",
    question: "What customer outcomes matter most to your business?",
    questionType: "multipleChoice",
  },
  {
    field: "customerListStatus",
    question:
      "Do you currently have a customer list with names and email addresses?",
    questionType: "singleChoice",
  },
  {
    field: "emailPermission",
    question:
      "Do you have permission to email those customers about their completed projects?",
    questionType: "singleChoice",
  },
  {
    field: "emailApprovalPreference",
    question:
      "Would you want to review and approve each email before the agent sends it?",
    questionType: "singleChoice",
  },
  {
    field: "surveyTopics",
    question: "What should the customer survey ask about?",
    questionType: "multipleChoice",
  },
  {
    field: "doNotContact",
    question:
      "Are there any customers or project types the agent should not contact?",
    questionType: "text",
  },
  {
    field: "senderName",
    question: "What sender name should customer messages use?",
    questionType: "text",
  },
  {
    field: "replyToEmail",
    question: "What reply-to email should customer messages use?",
    questionType: "text",
  },
  {
    field: "companyEmailStatus",
    question: "What is your company email/domain status?",
    questionType: "text",
  },
  {
    field: "incentive",
    question:
      "Should customers be offered an incentive for completing the survey?",
    questionType: "singleChoice",
  },
  {
    field: "incentiveOther",
    question: "Other incentive",
    questionType: "text",
  },
  {
    field: "positiveFollowUp",
    question: "What should happen when a customer leaves a positive response?",
    questionType: "multipleChoice",
  },
  {
    field: "negativeFollowUp",
    question: "What should happen when a customer leaves a negative response?",
    questionType: "multipleChoice",
  },
];

function stringifyAnswer(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).trim();
}

function validateBody(
  body: unknown
):
  | { valid: true; contractorId: string; responses: ContractorSurveyResponses }
  | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Invalid request body" };
  }

  const requestBody = body as Record<string, unknown>;
  const contractorId = String(requestBody.contractorId || "").trim();
  const responses = requestBody.responses;

  /* checked server side now
  if (!contractorId || !/^contractor-[a-zA-Z0-9_-]{4,80}$/.test(contractorId)) {
    return { valid: false, message: "Invalid contractor invitation" };
  }*/

  if (!responses || typeof responses !== "object" || Array.isArray(responses)) {
    return { valid: false, message: "Missing survey responses" };
  }

  const responseRecord = responses as ContractorSurveyResponses;
  const requiredFields = [
    "contractorName",
    "companyName",
    "email",
    "hasWebsite",
    "projectRecordingProcess",
    "testimonialFrequency",
    "clientContactCadence",
    "existingCustomerAgentComfort",
    "newCustomerAgentComfort",
    "customerListStatus",
    "emailPermission",
    "emailApprovalPreference",
  ];

  for (const field of requiredFields) {
    if (!stringifyAnswer(responseRecord[field])) {
      return { valid: false, message: "Please complete all required fields" };
    }
  }

  return { valid: true, contractorId, responses: responseRecord };
}

function getAnsweredQuestions(responses: ContractorSurveyResponses) {
  return surveyQuestions.filter((surveyQuestion) =>
    Boolean(stringifyAnswer(responses[surveyQuestion.field]))
  );
}

function mapResponsesToScoutAnswers(
  responses: ContractorSurveyResponses,
  answeredQuestions: SurveyQuestion[],
  questionIds: string[]
): ScoutAnswer[] {
  return answeredQuestions
    .map((surveyQuestion, index) => {
      const questionId = questionIds[index];
      const selectedId = stringifyAnswer(responses[surveyQuestion.field]);

      if (!questionId || !selectedId) {
        return null;
      }

      return {
        quiz_question_id: questionId,
        selectedId,
        question: surveyQuestion.question,
      };
    })
    .filter((answer): answer is ScoutAnswer => answer !== null);
}

async function createScoutSurvey({
  contractorId,
  responses,
  answeredQuestions,
  scoutAuthToken,
}: {
  contractorId: string;
  responses: ContractorSurveyResponses;
  answeredQuestions: SurveyQuestion[];
  scoutAuthToken?: string;
}) {
  const companyName = stringifyAnswer(responses.companyName) || contractorId;
  const contractorEmail = stringifyAnswer(responses.email);

  const url = scoutAuthToken
    ? `${SCOUT_API_URL}/api/quiz/build`
    : `${SCOUT_API_URL}/api/quiz/headwinds/build`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(scoutAuthToken ? { Authorization: `Bearer ${scoutAuthToken}` } : {}),
    },
    body: JSON.stringify({
      title: `Contractor Scout Survey - ${companyName}`,
      description: `Headwinds contractor intake from ${contractorId}${
        contractorEmail ? ` (${contractorEmail})` : ""
      }`,
      collection_type: "survey",
      is_numbered: false,
      questions: answeredQuestions.map((surveyQuestion, index) => ({
        question: surveyQuestion.question,
        questionType: surveyQuestion.questionType,
        answer: "any",
        options: [],
        section: "Contractor intake",
        order: index + 1,
      })),
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.message !== "success" || !data?.collection_id) {
    throw new Error("Scout survey creation failed");
  }

  return {
    collectionId: String(data.collection_id),
    questionIds: Array.isArray(data.question_ids)
      ? data.question_ids.map((questionId: unknown) => String(questionId))
      : [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = validateBody(body);

    if (!validation.valid) {
      return NextResponse.json(
        { status: 400, message: validation.message },
        { status: 400 }
      );
    }

    const scoutAuthToken = process.env.SCOUT_AUTH_TOKEN || "";
    const answeredQuestions = getAnsweredQuestions(validation.responses);

    if (!scoutAuthToken) {
      /*
      console.log("Contractor survey submitted without Scout forwarding", {
        contractorId: validation.contractorId,
        hasScoutAuthToken: Boolean(scoutAuthToken),
        answeredQuestionCount: answeredQuestions.length,
        submittedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        status: 202,
        message: "Survey captured; Scout forwarding is not configured",
        scoutSubmitted: false,
      });*/

      const scoutSurvey = await createScoutSurvey({
        contractorId: validation.contractorId,
        responses: validation.responses,
        answeredQuestions,
        scoutAuthToken: undefined,
      });

      return NextResponse.json(
        {
          status: 200,
          message: "success",
          scoutSubmitted: true,
          scout: {
            collection_id: scoutSurvey.collectionId,
            question_ids: scoutSurvey.questionIds,
            questions_added: scoutSurvey.questionIds.length,
          },
        },
        { status: 200 }
      );
    }

    const scoutSurvey = await createScoutSurvey({
      contractorId: validation.contractorId,
      responses: validation.responses,
      answeredQuestions,
      scoutAuthToken,
    });

    const scoutAnswers = mapResponsesToScoutAnswers(
      validation.responses,
      answeredQuestions,
      scoutSurvey.questionIds
    );

    if (scoutAnswers.length !== answeredQuestions.length) {
      return NextResponse.json(
        { status: 502, message: "Scout survey question mapping failed" },
        { status: 502 }
      );
    }

    const scoutResponse = await fetch(`${SCOUT_API_URL}/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${scoutAuthToken}`,
      },
      body: JSON.stringify({
        quiz_question_collection_id: scoutSurvey.collectionId,
        data: scoutAnswers,
      }),
    });

    const scoutData = await scoutResponse.json().catch(() => null);

    if (!scoutResponse.ok || scoutData?.message !== "success") {
      console.error("Scout contractor survey submission failed", {
        status: scoutResponse.status,
        data: scoutData,
      });

      return NextResponse.json(
        { status: 502, message: "Scout submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "success",
      scoutSubmitted: true,
      scout: scoutData,
    });
  } catch (error) {
    console.error("Contractor survey route error", error);
    const errorMessage = process.env.SCOUT_AUTH_TOKEN
      ? "authorized survey error"
      : "unauthorized survey error";
    return NextResponse.json(
      {
        status: 500,
        message: `Sorry, Something went wrong: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
