const SOLOSCOUT_SITE_URL = "https://soloscout.net";
import type { ScoutUser } from "../../../soloscout-site/types/auth.types";
import type { PublicProfile } from "../../../soloscout-site/types/profile.types";

type ParticipantNode = {
  id: string;
  x: number;
  y: number;
  score: number;
  new?: boolean;
  scoutUser: ScoutUser;
  publicProfile?: PublicProfile;
};

type ParticipantLink = {
  source: string;
  target: string;
  strength: number;
};

interface ParticipationProps {
  network: {
    activeParticipants: number;
    newParticipants: number;
    returningParticipants: number;
    totalConnectionStrength: number;
  };
  monthOrder: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  participationRows: ParticipantNode[];
}

function formatMonth(month: string) {
  const date = new Date(month);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function participantLabel(participant: ParticipantNode) {
  return (
    participant.publicProfile?.display_name ||
    participant.publicProfile?.first_name ||
    participant.scoutUser.username ||
    participant.scoutUser.user_account_id
  );
}

const participantSubtitle = (participant: ParticipantNode) =>
  participant.publicProfile?.profession ||
  participant.scoutUser.email ||
  "Soloscout member";

const getParticipantLink = (participant: ParticipantNode) => {
  const profileBase = `${SOLOSCOUT_SITE_URL}/user/public`;

  return participant.publicProfile
    ? `${profileBase}?userId=${encodeURIComponent(
        participant.scoutUser.user_account_id
      )}`
    : `${SOLOSCOUT_SITE_URL}/user/claim`;
};

type PosterState =
  | { status: "idle"; progress?: string | null; taskId?: string | null }
  | { status: "running"; progress: string; taskId?: string | null }
  | {
      status: "completed";
      imageUrl: string;
      taskId: string | null;
      progress?: string | null;
    }
  | { status: "error"; error: string };

const Participation = ({
  network,
  monthOrder,
  selectedMonth,
  setSelectedMonth,
  participationRows,
}: ParticipationProps) => {
  return (
    <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
            PARTICIPATION TABLE
          </p>
          <h2 className="text-3xl md:text-4xl font-normal text-[#1A1A1A] m-0">
            Monthly participation by Soloscout member
          </h2>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0 max-w-3xl">
            This table turns the MonthlyNetwork into an adoption surface: each
            participant links to a Soloscout profile or a claim path, so
            Headwinds can drive people into the SoloScout ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {monthOrder.map((month) => {
            const selected = selectedMonth === month;
            return (
              <button
                key={month}
                type="button"
                onClick={() => setSelectedMonth(month)}
                className={`px-3 py-1.5 rounded-full text-xs tracking-[2px] uppercase transition-colors ${
                  selected
                    ? "bg-[#1A1A1A] text-[#F3EBE2]"
                    : "bg-[#EAE3DA] text-[#6B6B6B] hover:bg-[#EDE5DC]"
                }`}
              >
                {formatMonth(month)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        <div className="bg-[#C3DED8] rounded-2xl px-5 py-4">
          <p className="text-2xl text-[#1A1A1A] m-0">
            {network.activeParticipants}
          </p>
          <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
            Active Participants
          </p>
        </div>
        <div className="bg-[#C4CFDE] rounded-2xl px-5 py-4">
          <p className="text-2xl text-[#1A1A1A] m-0">
            {network.newParticipants}
          </p>
          <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
            New This Month
          </p>
        </div>
        <div className="bg-[#D5DCBA] rounded-2xl px-5 py-4">
          <p className="text-2xl text-[#1A1A1A] m-0">
            {network.returningParticipants}
          </p>
          <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
            Returning
          </p>
        </div>
        <div className="bg-[#E8D5C4] rounded-2xl px-5 py-4">
          <p className="text-2xl text-[#1A1A1A] m-0">
            {network.totalConnectionStrength}
          </p>
          <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
            Connection Strength
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#D5CEC6] bg-[#F3EBE2]">
        <table className="w-full border-collapse">
          <thead className="bg-[#EAE3DA]">
            <tr>
              <th className="text-left px-4 py-3 text-[11px] font-medium tracking-[3px] uppercase text-[#6B6B6B]">
                Participant
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-medium tracking-[3px] uppercase text-[#6B6B6B]">
                Score
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-medium tracking-[3px] uppercase text-[#6B6B6B]">
                Status
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-medium tracking-[3px] uppercase text-[#6B6B6B]">
                Soloscout
              </th>
            </tr>
          </thead>
          <tbody>
            {participationRows.map((participant) => (
              <tr key={participant.id} className="border-t border-[#D5CEC6]">
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      {participantLabel(participant)}
                    </span>
                    <span className="text-xs text-[#6B6B6B]">
                      {participantSubtitle(participant)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-sm text-[#3D3D3D]">
                  {participant.score}
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="inline-flex rounded-full border border-[#D5CEC6] bg-[#F3EBE2] px-3 py-1 text-[11px] tracking-[2px] uppercase text-[#3D3D3D]">
                    {participant.new ? "New" : "Returning"}
                  </span>
                </td>
                <td className="px-4 py-4 align-top">
                  <a
                    href={getParticipantLink(participant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg bg-[#1A1A1A] px-3 py-2 text-sm text-[#F3EBE2] no-underline hover:bg-[#333333] transition-colors"
                  >
                    {participant.publicProfile
                      ? "Open Soloscout profile"
                      : "Claim on Soloscout"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participation;
