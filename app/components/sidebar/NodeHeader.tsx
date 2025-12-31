'use client';
import { Node } from '@/app/lib/types';
import { useUi } from '@/app/hooks/useUi';
import{ ThemeToggle} from '@/app/components/ui/ThemeToggle'; // ✅ Use existing component

interface Props {
  node: Node;
}

export default function NodeHeader({ node }: Props) {
  return (
    <div 
      className="p-6 border-b backdrop-blur-md rounded-t-2xl transition-colors duration-300 flex justify-between items-start gap-4"
      style={{
        background: `linear-gradient(to right, rgb(var(--color-bg-strong) / 0.9), rgb(var(--color-bg-soft) / 0.9))`,
        borderColor: `rgb(var(--color-border) / 0.5)`
      }}
    >
      {/* Node Data */}
      <div className="flex-1 min-w-0">
        {/* Accent Line */}
        <div className="w-12 h-1 bg-accent rounded-full mb-3 opacity-80" 
             style={{ backgroundColor: `rgb(var(--color-accent))` }} />
        
        <h2 className="text-lg font-bold leading-tight line-clamp-1 text-fg">
          {node.label}
        </h2>
        
        <p className="mt-1 text-sm leading-relaxed line-clamp-2 text-fg-muted">
          {node.summary}
        </p>
      </div>

      {/* ✅ EXISTING THEME TOGGLE COMPONENT - Top right */}
      <div className="flex-shrink-0 self-start pt-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
