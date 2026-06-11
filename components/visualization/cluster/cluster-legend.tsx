
interface ClusterLegendProps {
  segments: {
    name: string;
    desc: string;
    pct: string;
    color: string;
  }[];
}

const ClusterLegend = ({ segments }: ClusterLegendProps) => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-5 w-full md:w-72 md:shrink-0">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      SEGMENTS
    </span>
    {segments.map((s) => (
      <div key={s.name} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: s.color }}
          />
          <span className="text-base font-medium text-[#1A1A1A]">
            {s.name}
          </span>
        </div>
        <span className="text-xs text-[#6B6B6B] leading-relaxed pl-5">
          {s.desc}
          <br />
          {s.pct} of base
        </span>
      </div>
    ))}
  </div>
);

export default ClusterLegend;