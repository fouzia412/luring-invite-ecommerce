import React from "react";

interface Props {
  flapRef: React.RefObject<SVGPolygonElement>;
  seamRef: React.RefObject<SVGPolylineElement>;
  flapShadowRef: React.RefObject<SVGPathElement>;
}

const EnvelopeFrontSVG: React.FC<Props> = ({ flapRef, seamRef, flapShadowRef }) => {
  return (
    <svg
      viewBox="0 0 960 700"
      className="w-full h-full overflow-visible"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b88a1b" />
          <stop offset="50%" stopColor="#ffe9a6" />
          <stop offset="100%" stopColor="#b67f1e" />
        </linearGradient>

        <filter id="flapBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        
        {/* Grain Texture for realism */}
        <filter id="paperGrain">
           <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
           <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.05 0" />
           <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </defs>

      {/* --- POCKET (Sides & Bottom) --- */}
      {/* These polygons sit ON TOP of the Card */}
      <g filter="url(#paperGrain)">
        {/* Left Flap */}
        <polygon points="30,100 480,380 30,600" fill="#efe6d8" opacity="0.98" />
        {/* Right Flap */}
        <polygon points="930,100 480,380 930,600" fill="#efe6d8" opacity="0.98" />
        {/* Bottom Flap */}
        <polygon points="30,600 480,380 930,600" fill="#f3eadf" opacity="0.98" />
      </g>

      {/* --- MOVING FLAP --- */}
      
      {/* Shadow underneath the flap */}
      <path
        ref={flapShadowRef}
        d="M40 120 L480 390 L920 120 Z"
        fill="#000"
        filter="url(#flapBlur)"
      />

      {/* The Flap Itself */}
      <polygon
        ref={flapRef}
        points="30,100 480,380 930,100" // Initial closed state
        fill="#fffaf2"
        filter="url(#paperGrain)"
      />

      {/* Gold Seam on the Flap */}
      <polyline
        ref={seamRef}
        points="30,100 480,380 930,100"
        fill="none"
        stroke="url(#goldFoil)"
        strokeWidth="3"
      />
    </svg>
  );
};

export default EnvelopeFrontSVG;