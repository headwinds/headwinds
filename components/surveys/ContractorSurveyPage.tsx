"use client";

import React, { useMemo, useState } from "react";
import PageShell from "@/components/layout/PageShell";

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
};

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

function ToggleGroup({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
      <legend className="text-sm font-medium text-[#1A1A1A]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
              value === option
                ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F3EBE2]"
                : "border-[#D5CEC6] bg-white text-[#3D3D3D] hover:border-[#1A1A1A]"
            }`}
          >
            <input
              className="sr-only"
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              required={required}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({
  label,
  values,
  options,
  onChange,
}: {
  label: string;
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
}) {
  const toggleValue = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }
    onChange([...values, option]);
  };

  return (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
      <legend className="text-sm font-medium text-[#1A1A1A]">{label}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex min-h-11 cursor-pointer items-center rounded-lg border px-4 py-2 text-sm transition-colors ${
              values.includes(option)
                ? "border-[#1A1A1A] bg-[#EAE3DA] text-[#1A1A1A]"
                : "border-[#D5CEC6] bg-white text-[#3D3D3D] hover:border-[#1A1A1A]"
            }`}
          >
            <input
              className="sr-only"
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggleValue(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url";
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#1A1A1A]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-lg border border-[#C5BEB6] bg-white px-4 text-sm font-normal text-[#1A1A1A] placeholder:text-[#8A8A8A] transition-colors focus:border-[#1A1A1A] focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#1A1A1A]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full resize-none rounded-lg border border-[#C5BEB6] bg-white px-4 py-3 text-sm font-normal leading-relaxed text-[#1A1A1A] placeholder:text-[#8A8A8A] transition-colors focus:border-[#1A1A1A] focus:outline-none"
      />
    </label>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5 border-t border-[#D5CEC6] pt-8 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-[11px] font-medium uppercase tracking-[3px] text-[#6B6B6B]">
          {eyebrow}
        </p>
        <h2 className="m-0 text-2xl font-normal leading-tight text-[#1A1A1A]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export default function ContractorSurveyPage({
  contractorId,
}: {
  contractorId: string;
}) {
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
      const response = await fetch("/api/surveys/contractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractorId, responses: values }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Unable to submit survey");
      }

      setStatus("sent");
      setMessage(
        data?.scoutSubmitted === false
          ? "Thanks. Your answers were captured, but Scout forwarding is not configured yet."
          : "Thanks. Your answers were submitted."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <PageShell>
      <main className="flex flex-col gap-1.5 lg:flex-row">
        <aside className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 lg:w-[360px] lg:shrink-0 flex flex-col gap-8 text-[#F5F4F2]">
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[11px] font-medium uppercase tracking-[3px] text-[#AAAAAA]">
              Contractor Intake
            </p>
            <h1 className="m-0 text-4xl font-normal leading-tight md:text-5xl">
              Customer follow-up survey
            </h1>
            <p className="m-0 text-sm leading-relaxed text-[#AAAAAA]">
              A few details about your business, customer list, and comfort level with agent-assisted outreach.
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

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-[#C3DED8] p-4 text-[#1A1A1A]">
              <p className="m-0 text-[10px] font-medium uppercase tracking-[2px]">
                Progress
              </p>
              <p className="m-0 mt-2 text-2xl font-normal">{completionCount}/12</p>
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
                placeholder="Jane Contractor"
                required
              />
              <TextField
                label="Company name"
                value={values.companyName}
                onChange={(value) => updateValue("companyName", value)}
                placeholder="Northside Renovations"
                required
              />
              <TextField
                label="Email"
                type="email"
                value={values.email}
                onChange={(value) => updateValue("email", value)}
                placeholder="jane@example.com"
                required
              />
              <TextField
                label="Reply-to email for customer messages"
                type="email"
                value={values.replyToEmail}
                onChange={(value) => updateValue("replyToEmail", value)}
                placeholder="hello@company.com"
              />
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
              onChange={(value) => updateValue("projectRecordingProcess", value)}
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
              options={["Monthly", "Quarterly", "Yearly", "Every 5 years", "Not at all"]}
              onChange={(value) => updateValue("clientContactCadence", value)}
              required
            />
          </Section>

          <Section eyebrow="Outreach" title="Agent comfort level">
            <ToggleGroup
              label="How would you feel about an agent contacting existing customers for a short survey?"
              name="existingCustomerAgentComfort"
              value={values.existingCustomerAgentComfort}
              options={["Comfortable", "Maybe with approval first", "Not comfortable", "Need more information"]}
              onChange={(value) => updateValue("existingCustomerAgentComfort", value)}
              required
            />
            <ToggleGroup
              label="How would you feel about an agent contacting new customers after a project is completed?"
              name="newCustomerAgentComfort"
              value={values.newCustomerAgentComfort}
              options={["Comfortable", "Maybe with approval first", "Not comfortable", "Need more information"]}
              onChange={(value) => updateValue("newCustomerAgentComfort", value)}
              required
            />
            <ToggleGroup
              label="Would you want to review and approve each email before the agent sends it?"
              name="emailApprovalPreference"
              value={values.emailApprovalPreference}
              options={["Yes, for every email", "Only for the first batch", "No, use an approved template"]}
              onChange={(value) => updateValue("emailApprovalPreference", value)}
              required
            />
          </Section>

          <Section eyebrow="Customers" title="Customer list readiness">
            <ToggleGroup
              label="Do you currently have a customer list with names and email addresses?"
              name="customerListStatus"
              value={values.customerListStatus}
              options={["Yes, in a spreadsheet", "Yes, in CRM/software", "Yes, but scattered", "No", "Not sure"]}
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
              onChange={(nextValues) => updateValue("acquisitionChannels", nextValues)}
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
            <ToggleGroup
              label="Should customers be offered an incentive for completing the survey?"
              name="incentive"
              value={values.incentive}
              options={["No incentive", "Discount on future work", "Gift card", "Other"]}
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
              onChange={(nextValues) => updateValue("positiveFollowUp", nextValues)}
            />
            <CheckboxGroup
              label="What should happen when a customer leaves a negative response?"
              values={values.negativeFollowUp}
              options={negativeFollowUpOptions}
              onChange={(nextValues) => updateValue("negativeFollowUp", nextValues)}
            />
          </Section>

          <div className="flex flex-col gap-3 border-t border-[#D5CEC6] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1A1A1A] px-8 py-3 text-sm font-bold text-[#F3EBE2] transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
            >
              {status === "sending" ? "Submitting..." : status === "sent" ? "Submitted" : "Submit Survey"}
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
}
