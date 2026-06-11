import { useState } from "react";


interface ClusterChartProps {
  engagementScore: number;
  clusterDots: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
    r: number; // radius in pixels
    color: string; // color code
  }[];
}   

const ClusterChart = ({
  engagementScore,
  clusterDots,
}: ClusterChartProps) => {
  const [showScore, setShowScore] = useState(false);

  return (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3 flex-1 min-w-0">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      USER SEGMENTATION
    </span>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      Behavioral Clusters
    </h2>
    <div className="relative w-full aspect-[2/1] bg-[#E8E2DA] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setShowScore((prev) => !prev)}
        className="absolute bottom-2 right-3 text-[10px] text-[#6B6B6B] tracking-wide underline decoration-transparent hover:decoration-[#6B6B6B]"
      >
        Engagement Score &rarr;
      </button>
      {showScore && (
        <div className="absolute bottom-8 right-3 bg-[#1A1A1A] text-[#F3EBE2] text-[10px] px-2 py-1 rounded-md tracking-wide">
          Score: {engagementScore}/100
        </div>
      )}
      <span className="absolute top-2 left-3 text-[10px] text-[#6B6B6B] tracking-wide">
        Revenue Potential &rarr;
      </span>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
      </svg>
      {clusterDots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70 transition-opacity hover:opacity-100"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.r * 2,
            height: d.r * 2,
            backgroundColor: d.color,
          }}
        />
      ))}
    </div>
  </div>
  );
};

export default ClusterChart;