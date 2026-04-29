"use client";

import React from "react";

interface NotchSwitchProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

const NotchSwitch: React.FC<NotchSwitchProps> = ({
  options,
  active,
  onChange,
}) => (
  <div className="inline-flex items-center gap-1 bg-[#2A2A2A] rounded-full p-1">
    {options.map((opt) => {
      const isActive = opt === active;
      return (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`
            px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[2px] uppercase
            transition-all duration-200 cursor-pointer border-none outline-none
            ${
              isActive
                ? "bg-[#C3DED8] text-[#1A1A1A]"
                : "bg-transparent text-[#8A8A8A] hover:text-[#F3EBE2]"
            }
          `}
        >
          {opt}
        </button>
      );
    })}
  </div>
);

export default NotchSwitch;
