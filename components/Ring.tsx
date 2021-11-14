import * as React from "react";
export const Ring = (props: React.SVGProps<SVGSVGElement>) => (
  <svg className="prefix__progress-ring" height={250} width={250} {...props}>
    <linearGradient id="prefix__a" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#7E55D6" />
      <stop offset="100%" stopColor="#D655AD" />
    </linearGradient>
    <circle
      className="prefix__progress-ring__circle"
      strokeWidth={32}
      strokeLinecap="round"
      stroke="url(#prefix__a)"
      fill="transparent"
      r={109}
      cx={125}
      cy={125}
    />
  </svg>
);
