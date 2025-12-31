'use client';
import { useMindmap } from '@/app/hooks/useMindmap';
import { Node } from '@/app/lib/types';
import { useEffect, useState } from 'react';

interface Props {
  node: Node;
}

export default function NodeSummary({ node }: Props) {
  const { 
    documentation, 
    selectedNodeId, 
    updateNode
  } = useMindmap();
  
  const [summary, setSummary] = useState<string>(node.summary);
  const [isEditingNode, setIsEditingNode] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label);
  const [editSummary, setEditSummary] = useState(node.summary);
  const [editDescription, setEditDescription] = useState(node.description || '');

  // ✅ FIXED: Single useEffect with priority logic
  useEffect(() => {
    if (selectedNodeId !== node.id) return;
    
    if (documentation) {
      setSummary(documentation); // 1. Documentation (highest)
    } else if (node.description) {
      setSummary(node.description); // 2. Description
    } else {
      setSummary(node.summary); // 3. Summary (fallback)
    }
    
    // Reset edit fields
    setEditLabel(node.label);
    setEditSummary(node.summary);
    setEditDescription(node.description || '');
  }, [node, selectedNodeId, documentation]);

  const isDocumentation = summary.length > 200 || summary.includes('\n- ') || summary.includes('•');
  const isSelectedNode = selectedNodeId === node.id;

  const handleEditToggle = () => {
    setIsEditingNode(!isEditingNode);
  };

  const handleSave = () => {
    if (editLabel.trim()) {
      updateNode({
        id: node.id,
        label: editLabel.trim(),
        summary: editSummary.trim(),
        description: editDescription.trim()
      });
      setIsEditingNode(false);
    }
  };

  const handleCancel = () => {
    setEditLabel(node.label);
    setEditSummary(node.summary);
    setEditDescription(node.description || '');
    setIsEditingNode(false);
  };

  if (!isSelectedNode) return null;

  return (
    <div className="flex-1 min-h-0 p-6 flex flex-col bg-transparent h-full">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <h4 className={`font-semibold text-xs uppercase tracking-widest ${
          isDocumentation ? 'text-accent' : 'text-fg-subtle'
        }`}>
          {isDocumentation ? 'Documentation' : 'Node Information'}
        </h4>
        
        {/* ✅ FIXED BUTTONS - Theme consistent */}
        <div className="flex items-center gap-2">
          {isEditingNode ? (
            <>
              <button
                onClick={handleSave}
                disabled={!editLabel.trim()}
                className="px-4 py-2 text-sm font-semibold bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-accent-fg rounded-xl transition-all duration-200 shadow-sm hover:shadow-md h-10 flex items-center justify-center"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-semibold bg-bg-soft/50 hover:bg-bg-soft text-fg-subtle hover:text-fg rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-border/50 h-10 flex items-center justify-center"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-fg-subtle hover:text-fg hover:bg-accent/10 rounded-xl transition-all duration-200 h-10"
              title="Edit node information"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M11 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h12c.68 0 1.28-.39 1.57-1l-3.68-7h-4v-2h4l3.68 7c.29.58.1 1.28-.47 1.57V20H4V6h7v2zm11-2l-2 2-5.4-5.4a.996.996 0 0 0-1.41 0L15 4.6V2h2v2.6l2-2V2h2v2.6z" fill="currentColor"/>
              </svg>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-2xl border border-border bg-bg-soft overflow-hidden shadow-sm">
        {isEditingNode ? (
          /* ✅ PROFESSIONAL EDIT FORM */
          <div className="h-full p-6 flex flex-col gap-6 overflow-hidden">
            {/* Label Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                Label <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-medium border border-border bg-bg-soft/50 hover:border-accent/30 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none rounded-xl transition-all duration-200 shadow-sm h-12"
                  placeholder="Enter node title"
                />
              </div>
            </div>

            {/* Summary Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                Summary
              </label>
              <div className="relative">
                <textarea
                  value={editSummary}
                  onChange={(e) => setEditSummary(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 text-sm font-medium border border-border bg-bg-soft/50 hover:border-emerald/30 focus:border-emerald focus:ring-2 focus:ring-emerald/20 focus:outline-none rounded-xl transition-all duration-200 shadow-sm resize-vertical min-h-[90px]"
                  placeholder="Brief summary (optional)"
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="flex-1 space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
                Description
              </label>
              <div className="relative flex-1 min-h-[120px]">
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full h-full px-4 py-3 text-sm font-medium border border-border bg-bg-soft/50 hover:border-amber/30 focus:border-amber focus:ring-2 focus:ring-amber/20 focus:outline-none rounded-xl transition-all duration-200 shadow-sm resize-vertical"
                  placeholder="Detailed description (optional)"
                />
              </div>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <div className="h-full overflow-y-auto p-6 custom-scrollbar">
            <div className={`whitespace-pre-wrap transition-all duration-200 h-full ${
              isDocumentation 
                ? 'font-mono text-[13px] leading-relaxed text-fg' 
                : 'text-sm leading-relaxed text-fg-muted'
            }`}>
              {summary || node.description || 'No description available'}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(var(--color-border));
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(var(--color-fg-subtle));
        }
      `}</style>
    </div>
  );
}
