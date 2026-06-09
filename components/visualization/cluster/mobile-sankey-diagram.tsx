

const MobileSankeyDiagram = () => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      SOLOSCOUT FUNNEL
    </span>
    <p>The <a href="https://soloscout.net" target="_blank"><span className="underline">soloscout</span></a> platform is a community for introspective cozy game designers and storytellers. Only a $1B market disguised as a hobby (valued at ~$973M in 2024 and projected to hit $1.5B by 2032).</p>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      From Attention to Loyalty
    </h2>
    <div className="relative w-full h-72 bg-[#E8E2DA] rounded-xl overflow-hidden flex items-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
        <path d="M130,60 C200,60 200,50 260,50" fill="none" stroke="#C3DED8" strokeWidth="60" opacity="0.3" />
        <path d="M130,140 C200,140 200,170 260,170" fill="none" stroke="#C3DED8" strokeWidth="35" opacity="0.3" />
        <path d="M360,50 C430,50 430,45 460,45" fill="none" stroke="#C4CFDE" strokeWidth="28" opacity="0.3" />
        <path d="M360,100 C420,100 420,130 460,130" fill="none" stroke="#E8D5C4" strokeWidth="48" opacity="0.25" />
        <path d="M360,200 C420,200 420,230 460,230" fill="none" stroke="#C5BEB6" strokeWidth="22" opacity="0.3" />
      </svg>
      <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-[100px] bg-[#C3DED8] rounded-lg flex flex-col items-center justify-center py-6 px-2" style={{ height: "70%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Visit</span>
        <span className="text-lg font-medium text-[#1A1A1A]">42.8K</span>
      </div>
      <div className="absolute left-[33%] top-[10%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "50%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Browse</span>
        <span className="text-lg font-medium text-[#1A1A1A]">28.1K</span>
      </div>
      <div className="absolute left-[33%] top-[65%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "28%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Wishlist</span>
        <span className="text-lg font-medium text-[#1A1A1A]">8.4K</span>
      </div>
      <div className="absolute right-[16%] top-[8%] w-[100px] bg-[#D5DCBA] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "22%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Waitlist</span>
        <span className="text-lg font-medium text-[#1A1A1A]">1.4K</span>
      </div>
      <div className="absolute right-[16%] top-[35%] w-[100px] bg-[#E8D5C4] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "38%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Bounce</span>
        <span className="text-lg font-medium text-[#1A1A1A]">14.7K</span>
      </div>
      <div className="absolute right-[16%] bottom-[5%] w-[100px] bg-[#C5BEB6] rounded-lg flex flex-col items-center justify-center py-2 px-2" style={{ height: "17%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Leave</span>
        <span className="text-lg font-medium text-[#1A1A1A]">19.7K</span>
      </div>
    </div>
  </div>
);

export default MobileSankeyDiagram;