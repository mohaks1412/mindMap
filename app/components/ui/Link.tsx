
'use client';
import { useEffect, useRef } from 'react';

interface LinkProps {
  link: any;
  sourcePos: { x: number; y: number };
  targetPos: { x: number; y: number };
}

export default function Link({ link, sourcePos, targetPos }: LinkProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const pathD = `M ${sourcePos.x},${sourcePos.y} 
                 Q ${(sourcePos.x + targetPos.x) / 2},${(sourcePos.y + targetPos.y) / 2 - 40} 
                 ${targetPos.x},${targetPos.y}`;

  return (
    <path
      ref={pathRef}
      d={pathD}
      fill="none"
      stroke="url(#linkGradient)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.85"
      className="transition-all duration-300 hover:[stroke:url(#linkGradientHover)] hover:[stroke-width:5px] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:opacity-100 group-hover:[stroke-width:6px]"
      filter="drop-shadow(0 0 4px rgb(var(--color-accent) / 0.3))"
    />
  );
}