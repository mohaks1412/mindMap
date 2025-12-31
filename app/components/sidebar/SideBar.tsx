'use client';

import { useMindmap } from '@/app/hooks/useMindmap';
import NodeHeader from './NodeHeader';
import NodeSummary from './NodeSummary';

export default function Sidebar() {
  const { selectedNode } = useMindmap();

  return (
    <div className="w-full h-full bg-bg backdrop-blur-xl flex flex-col transition-colors duration-300">
      {!selectedNode ? (
        <div className="flex-1 flex items-center justify-center text-fg-subtle">
          <div className="font-medium tracking-wide uppercase text-xs">
            Select a Node
          </div>
        </div>
      ) : (
        <>
          <NodeHeader node={selectedNode} />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <NodeSummary node={selectedNode} />
          </div>
        </>
      )}
    </div>
  );
}
