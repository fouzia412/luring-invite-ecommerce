import React from "react";

const EnvelopeBackSVG: React.FC = () => {
  return (
    <svg
      viewBox="0 0 960 700"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="paperGradBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbf6ee" />
          <stop offset="100%" stopColor="#f3eadf" />
        </linearGradient>
        <filter id="softShadowBack">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Main Body Rect */}
      <rect
        x="30"
        y="100"
        width="900"
        height="500"
        rx="12"
        fill="url(#paperGradBack)"
        filter="url(#softShadowBack)"
      />
      {/* Gold Border */}
      <rect
        x="30"
        y="100"
        width="900"
        height="500"
        rx="12"
        fill="none"
        stroke="#b88a1b"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
};

export default EnvelopeBackSVG;