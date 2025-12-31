'use client';

import { useRef } from 'react';
import ActionBar from './components/ui/Actionbar';
import Sidebar from './components/sidebar/SideBar';
import Canvas from './components/mindmap/canvas';
import JsonTester from './components/ui/JsonTester';

export default function Home() {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="h-screen w-screen bg-bg relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--color-accent) / 0.15), transparent 70%)`,
        }}
      />

      {/* STRICT GRID */}
      <div
        className="
          relative z-10
          grid h-full w-full
          grid-rows-[auto_1fr_auto]
          grid-cols-[1fr_20vw]
          gap-6
          p-6
        "
      >
        {/* TOP */}
        <div className="col-span-2">
          <ActionBar svgRef={svgRef} />
        </div>

        {/* CANVAS (middle-left) */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg">
          <Canvas svgRef={svgRef} />
        </div>

        {/* SIDEBAR (middle-right ONLY) */}
        <div className="overflow-hidden rounded-2xl border border-border bg-bg">
          <Sidebar />
        </div>

        {/* BOTTOM */}
        <div className="col-span-2">
          <JsonTester />
        </div>
      </div>
    </div>
  );
}
