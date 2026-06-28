"use client";

import React, { useMemo, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import Section from "@/components/surveys/section";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type ContractorSurveyValues = {
  contractorName: string;
  companyName: string;
  email: string;
  hasWebsite: string;
  websiteUrl: string;
  wantsWebsite: string;
  projectRecordingProcess: string;
  testimonialFrequency: string;
  clientContactCadence: string;
  existingCustomerAgentComfort: string;
  newCustomerAgentComfort: string;
  acquisitionChannels: string[];
  acquisitionOther: string;
  workWanted: string;
  outcomes: string[];
  customerListStatus: string;
  emailPermission: string;
  emailApprovalPreference: string;
  surveyTopics: string[];
  doNotContact: string;
  senderName: string;
  replyToEmail: string;
  companyEmailStatus: string;
  incentive: string;
  incentiveOther: string;
  positiveFollowUp: string[];
  negativeFollowUp: string[];
  yearsInBusiness: string; // Changed this line to match the type
};

const initialValues: ContractorSurveyValues = {
  contractorName: "",
  companyName: "",
  email: "",
  hasWebsite: "",
  websiteUrl: "",
  wantsWebsite: "",
  projectRecordingProcess: "",
  testimonialFrequency: "",
  clientContactCadence: "",
  existingCustomerAgentComfort: "",
  newCustomerAgentComfort: "",
  acquisitionChannels: [],
  acquisitionOther: "",
  workWanted: "",
  outcomes: [],
  customerListStatus: "",
  emailPermission: "",
  emailApprovalPreference: "",
  surveyTopics: [],
  doNotContact: "",
  senderName: "",
  replyToEmail: "",
  companyEmailStatus: "",
  incentive: "",
  incentiveOther: "",
  positiveFollowUp: [],
  negativeFollowUp: [],
  yearsInBusiness: "",
};

const yearsInBusinessOptions = [
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const acquisitionOptions = [
  "Word of mouth",
  "Print ads",
  "Digital ads",
  "Website/search",
  "Social media",
  "Referral partners",
  "Repeat customers",
  "Other",
];

const outcomeOptions = [
  "More testimonials",
  "More referrals",
  "More repeat work",
  "Better online reviews",
  "Better project photos",
  "Better lead quality",
  "Better customer feedback",
];

const surveyTopicOptions = [
  "Overall satisfaction",
  "Quality of work",
  "Communication",
  "Timeliness",
  "Cleanliness",
  "Before/after photos",
  "Permission to use testimonial",
  "Permission to use project photos",
  "Referral interest",
  "Future project needs",
];

const positiveFollowUpOptions = [
  "Ask for a public review",
  "Ask for a referral",
  "Ask for permission to publish the testimonial",
  "Notify me",
  "Add to a case study queue",
];

const negativeFollowUpOptions = [
  "Notify me only",
  "Create a follow-up task",
  "Send an apology/follow-up draft for approval",
  "Do not automate follow-up",
];

import ToggleGroup from "./toggle-group";
import CheckboxGroup from "./checkbox-group";
import TextField from "./text-field";
import TextArea from "./text-area";

interface ContractorSurveyPageProps {
  contractorId: string;
}

const ContractorSurveyPage = ({ contractorId }: ContractorSurveyPageProps) => {
  const [values, setValues] = useState<ContractorSurveyValues>(initialValues);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const completionCount = useMemo(() => {
    const requiredValues = [
      values.contractorName,
      values.companyName,
      values.email,
      values.hasWebsite,
      values.projectRecordingProcess,
      values.testimonialFrequency,
      values.clientContactCadence,
      values.existingCustomerAgentComfort,
      values.newCustomerAgentComfort,
      values.customerListStatus,
      values.emailPermission,
      values.emailApprovalPreference,
    ];
    return requiredValues.filter(Boolean).length;
  }, [values]);

  const updateValue = <K extends keyof ContractorSurveyValues>(
    key: K,
    value: ContractorSurveyValues[K]
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(`/api/surveys/contractor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractorId, responses: values }),
      });

      const data = await response.json();

      if (data?.status === 500) {
        setStatus("error");
        setMessage(
          "Something went wrong. Please try again or contact support."
        );
        return;
      }

      console.log("Contractor survey submission response:", response);
      console.log("Contractor survey submission data:", data);

      setStatus("sent");
      setMessage("Thanks. Your answers were submitted.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? `Something went wrong: ${error.message}`
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <PageShell>
      <main className="flex flex-col gap-1.5 lg:flex-row">
        <aside className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 lg:w-[360px] lg:shrink-0 flex flex-col gap-8 text-[#F5F4F2]">
          <img
            src="/surveys/contractor/deck_survey.png"
            alt="Deck with firepit"
            className="rounded-2xl"
          />
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[11px] font-medium uppercase tracking-[3px] text-[#AAAAAA]">
              Contractor Intake
            </p>
            <h1 className="m-0 text-4xl font-normal leading-tight md:text-5xl">
              Discovery survey
            </h1>
            <p className="m-0 text-sm leading-relaxed text-[#AAAAAA]">
              A few details about your business, customer list, and comfort
              level with agent-assisted outreach.
            </p>
          </div>

          <div className="rounded-2xl bg-[#2A2A2A] p-5 flex flex-col gap-3">
            <p className="m-0 text-[10px] font-medium uppercase tracking-[2px] text-[#AAAAAA]">
              Invitation
            </p>
            <p className="m-0 break-words text-sm text-[#F5F4F2]">
              {contractorId}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sticky top-8">
            <div className="rounded-2xl bg-[#C3DED8] p-4 text-[#1A1A1A]">
              <p className="m-0 text-[10px] font-medium uppercase tracking-[2px]">
                Progress
              </p>
              <p className="m-0 mt-2 text-2xl font-normal">
                {completionCount}/12
              </p>
            </div>
            <div className="rounded-2xl bg-[#C9A962] p-4 text-[#1A1A1A]">
              <p className="m-0 text-[10px] font-medium uppercase tracking-[2px]">
                Route
              </p>
              <p className="m-0 mt-2 text-2xl font-normal">Private</p>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-8"
        >
          <Section eyebrow="Profile" title="Your business">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Your name"
                value={values.contractorName}
                onChange={(value) => updateValue("contractorName", value)}
                required
              />
              <TextField
                label="Company name"
                value={values.companyName}
                onChange={(value) => updateValue("companyName", value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={values.email}
                onChange={(value) => updateValue("email", value)}
                required
              />

              <ToggleGroup
                name="yearsInBusiness"
                label="How many years have you been in business?"
                value={values.yearsInBusiness || ""}
                options={yearsInBusinessOptions}
                onChange={(value) => updateValue("yearsInBusiness", value)}
              />
              {/*}
              <TextField
                label="Reply-to email for customer messages"
                type="email"
                value={values.replyToEmail}`
                onChange={(value) => updateValue("replyToEmail", value)}
                placeholder="hello@company.com"
              />*/}
            </div>

            <ToggleGroup
              label="Do you have a website?"
              name="hasWebsite"
              value={values.hasWebsite}
              options={["Yes", "No"]}
              onChange={(value) => updateValue("hasWebsite", value)}
              required
            />

            {values.hasWebsite === "Yes" && (
              <TextField
                label="Website URL"
                type="url"
                value={values.websiteUrl}
                onChange={(value) => updateValue("websiteUrl", value)}
                placeholder="https://example.com"
                required
              />
            )}

            {values.hasWebsite === "No" && (
              <ToggleGroup
                label="Would you like a website?"
                name="wantsWebsite"
                value={values.wantsWebsite}
                options={["Yes", "Maybe", "No"]}
                onChange={(value) => updateValue("wantsWebsite", value)}
                required
              />
            )}
          </Section>

          <Section eyebrow="Projects" title="How work gets recorded">
            <TextArea
              label="After each project, what do you use to record the project details and photos?"
              value={values.projectRecordingProcess}
              onChange={(value) =>
                updateValue("projectRecordingProcess", value)
              }
              placeholder="Spreadsheet, CRM, phone photos, Google Drive, Jobber, Housecall Pro..."
              required
            />
            <ToggleGroup
              label="Do you ask each customer for a testimonial after each project?"
              name="testimonialFrequency"
              value={values.testimonialFrequency}
              options={["Always", "Sometimes", "Rarely", "Never"]}
              onChange={(value) => updateValue("testimonialFrequency", value)}
              required
            />
            <ToggleGroup
              label="How often do you contact clients after the work has been completed?"
              name="clientContactCadence"
              value={values.clientContactCadence}
              options={[
                "Monthly",
                "Quarterly",
                "Yearly",
                "Every 5 years",
                "Not at all",
              ]}
              onChange={(value) => updateValue("clientContactCadence", value)}
              required
            />
          </Section>

          <Section eyebrow="Outreach" title="Agent comfort level">
            <ToggleGroup
              label="How would you feel about an agent contacting existing customers for a short survey?"
              name="existingCustomerAgentComfort"
              value={values.existingCustomerAgentComfort}
              options={[
                "Comfortable",
                "Maybe with approval first",
                "Not comfortable",
                "Need more information",
              ]}
              onChange={(value) =>
                updateValue("existingCustomerAgentComfort", value)
              }
              required
            />
            <ToggleGroup
              label="How would you feel about an agent contacting new customers after a project is completed?"
              name="newCustomerAgentComfort"
              value={values.newCustomerAgentComfort}
              options={[
                "Comfortable",
                "Maybe with approval first",
                "Not comfortable",
                "Need more information",
              ]}
              onChange={(value) =>
                updateValue("newCustomerAgentComfort", value)
              }
              required
            />
            <ToggleGroup
              label="Would you want to review and approve each email before the agent sends it?"
              name="emailApprovalPreference"
              value={values.emailApprovalPreference}
              options={[
                "Yes, for every email",
                "Only for the first batch",
                "No, use an approved template",
              ]}
              onChange={(value) =>
                updateValue("emailApprovalPreference", value)
              }
              required
            />
          </Section>

          <Section eyebrow="Customers" title="Customer list readiness">
            <ToggleGroup
              label="Do you currently have a customer list with names and email addresses?"
              name="customerListStatus"
              value={values.customerListStatus}
              options={[
                "Yes, in a spreadsheet",
                "Yes, in CRM/software",
                "Yes, but scattered",
                "No",
                "Not sure",
              ]}
              onChange={(value) => updateValue("customerListStatus", value)}
              required
            />
            <ToggleGroup
              label="Do you have permission to email those customers about their completed projects?"
              name="emailPermission"
              value={values.emailPermission}
              options={["Yes", "No", "Not sure"]}
              onChange={(value) => updateValue("emailPermission", value)}
              required
            />
            <TextArea
              label="Are there any customers or project types the agent should not contact?"
              value={values.doNotContact}
              onChange={(value) => updateValue("doNotContact", value)}
              placeholder="Leave blank if there are no restrictions."
            />
          </Section>

          <Section eyebrow="Growth" title="Where new work comes from">
            <CheckboxGroup
              label="How do you typically get new customers?"
              values={values.acquisitionChannels}
              options={acquisitionOptions}
              onChange={(nextValues) =>
                updateValue("acquisitionChannels", nextValues)
              }
            />
            {values.acquisitionChannels.includes("Other") && (
              <TextField
                label="Other customer source"
                value={values.acquisitionOther}
                onChange={(value) => updateValue("acquisitionOther", value)}
                placeholder="Tell us where else work comes from"
              />
            )}
            <TextArea
              label="What type of work do you want more of?"
              value={values.workWanted}
              onChange={(value) => updateValue("workWanted", value)}
              placeholder="Kitchen remodels, roofing, emergency repairs, commercial jobs..."
            />
            <CheckboxGroup
              label="What customer outcomes matter most to your business?"
              values={values.outcomes}
              options={outcomeOptions}
              onChange={(nextValues) => updateValue("outcomes", nextValues)}
            />
          </Section>

          <Section eyebrow="Survey" title="What customer follow-up should do">
            <CheckboxGroup
              label="What should the customer survey ask about?"
              values={values.surveyTopics}
              options={surveyTopicOptions}
              onChange={(nextValues) => updateValue("surveyTopics", nextValues)}
            />
            {/*
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Sender name"
                value={values.senderName}
                onChange={(value) => updateValue("senderName", value)}
                placeholder="Jane from Northside Renovations"
              />
              <TextField
                label="Company email/domain status"
                value={values.companyEmailStatus}
                onChange={(value) => updateValue("companyEmailStatus", value)}
                placeholder="We use Gmail, Google Workspace, Outlook..."
              />
            </div>
            */}
            <ToggleGroup
              label="Should customers be offered an incentive for completing the survey?"
              name="incentive"
              value={values.incentive}
              options={[
                "No incentive",
                "Discount on future work",
                "Gift card",
                "Other",
              ]}
              onChange={(value) => updateValue("incentive", value)}
            />
            {values.incentive === "Other" && (
              <TextField
                label="Other incentive"
                value={values.incentiveOther}
                onChange={(value) => updateValue("incentiveOther", value)}
                placeholder="Describe the incentive"
              />
            )}
            <CheckboxGroup
              label="What should happen when a customer leaves a positive response?"
              values={values.positiveFollowUp}
              options={positiveFollowUpOptions}
              onChange={(nextValues) =>
                updateValue("positiveFollowUp", nextValues)
              }
            />
            <CheckboxGroup
              label="What should happen when a customer leaves a negative response?"
              values={values.negativeFollowUp}
              options={negativeFollowUpOptions}
              onChange={(nextValues) =>
                updateValue("negativeFollowUp", nextValues)
              }
            />
          </Section>

          <div className="flex flex-col gap-3 border-t border-[#D5CEC6] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1A1A1A] px-8 py-3 text-sm font-bold text-[#F3EBE2] transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              {status === "sending"
                ? "Submitting..."
                : status === "sent"
                ? "Submitted"
                : "Submit Survey"}
            </button>
            {message && (
              <p
                className={`m-0 text-sm leading-relaxed ${
                  status === "error" ? "text-red-700" : "text-[#3D3D3D]"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </main>
    </PageShell>
  );
};

export default ContractorSurveyPage;
