import * as React from "react";

export const RADIUS = 109;
export const Ring = ({ offset }: { offset: number }) => {
  const center = 125;
  const circumference = 2 * Math.PI * RADIUS;
  return (
    <svg height={250} width={250} fill="#2A2A30">
      <linearGradient id="gradient" x1="100%" y1="100%" x2="70%" y2="40%">
        <stop offset="0%" stopColor="#CAD2F7" />
        <stop offset="100%" stopColor="#556cd6" />
      </linearGradient>
      <circle
        strokeWidth={32}
        strokeLinecap="round"
        stroke="url(#gradient)"
        r={RADIUS}
        cx={center}
        cy={center}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
