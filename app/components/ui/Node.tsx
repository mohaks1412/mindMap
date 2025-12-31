'use client';
import { useState, useEffect } from 'react';
import { Node as NodeType } from '@/app/lib/types';

interface NodeProps {
  node: NodeType;
  position: { x: number; y: number };
  onClick: () => void;
  isExpanded: boolean;
  childrenVisible: string[];
  isSelected: boolean;
  isEditing: boolean;
  isNeighbor?: boolean;
  tempNodeData: { label: string; summary: string; description: string };
  updateTempData?: (data: { label: string; summary: string; description: string }) => void;
  confirmInlineEdit?: () => void;
  cancelInlineEdit?: () => void;
}

export default function Node({ 
  node, position, onClick, isExpanded, childrenVisible,
  isSelected, isEditing, isNeighbor = false,
  tempNodeData, updateTempData, confirmInlineEdit, cancelInlineEdit 
}: NodeProps) {
  
  const [showHover, setShowHover] = useState(false);
  
  const getTextWidth = (text: string): number => {
    return Math.max(text.length * 8.2 + 48, 140);
  };

  const nodeWidth = getTextWidth(node.label);
  const nodeHeight = 52;
  const radius = 12;

  const [localLabel, setLocalLabel] = useState('');
  const [localSummary, setLocalSummary] = useState('');
  const [localDescription, setLocalDescription] = useState('');

  useEffect(() => {
    if (isEditing) {
      setLocalLabel(tempNodeData.label);
      setLocalSummary(tempNodeData.summary);
      setLocalDescription(tempNodeData.description);
    }
  }, [isEditing, tempNodeData]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLocalLabel(newLabel);
    updateTempData?.({ label: newLabel, summary: localSummary, description: localDescription });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    setLocalSummary(newSummary);
    updateTempData?.({ label: localLabel, summary: newSummary, description: localDescription });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setLocalDescription(newDescription);
    updateTempData?.({ label: localLabel, summary: localSummary, description: newDescription });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && localLabel.trim()) {
      e.preventDefault();
      confirmInlineEdit?.();
    } else if (e.key === 'Escape') {
      cancelInlineEdit?.();
    }
  };

  const glowFilter = isSelected 
    ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]'
    : isNeighbor 
      ? 'drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] drop-shadow-[0_0_24px_rgba(255,165,0,0.4)]'
      : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]';

  const strokeColor = isSelected 
    ? "#ffffff" 
    : isNeighbor 
      ? "#FFD700" 
      : "rgba(255,255,255,0.4)";

  const strokeWidth = isSelected 
    ? 5 
    : isNeighbor 
      ? 4 
      : 2;

  return (
    <g 
      transform={`translate(${position.x}, ${position.y})`} 
      className={`cursor-pointer group transition-all duration-300 ${isSelected || isNeighbor ? 'animate-pulse' : ''}`} 
      onClick={onClick}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      {showHover && !isEditing && (
        <g transform="translate(0, -75)">
          <rect x={-110} y={-25} width={220} height={50} rx={10}
            fill="rgb(var(--color-bg-strong))" stroke="rgb(var(--color-border))" strokeWidth={1} className="drop-shadow-xl" />
          <text x={0} y={5} textAnchor="middle" fill="rgb(var(--color-fg))" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">
            {node.summary || 'No summary available'}
          </text>
          <path d="M 0 35 L -6 25 L 6 25 Z" fill="rgb(var(--color-bg-strong))" />
        </g>
      )}

      <ellipse cx={0} cy={0} rx={nodeWidth/2 + 8} ry={nodeHeight/2 + 8}
        fill="url(#nodeGlow)" opacity={isNeighbor ? 0.9 : 0.6}
        className="group-hover:opacity-100 transition-opacity duration-300" />
      
      <rect x={-nodeWidth/2} y={-nodeHeight/2} width={nodeWidth} height={nodeHeight}
        rx={radius} ry={radius}
        fill={isSelected ? node.color + 'CC' : node.color}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        className={`${glowFilter} group-hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${isSelected ? 'ring-4 ring-white/50' : isNeighbor ? 'ring-3 ring-yellow-400/50' : ''}`} />
      
      <text x={0} y={4} textAnchor="middle" fill="white" fontWeight="700" fontSize="14"
        fontFamily="Inter, -apple-system, sans-serif" className="select-none drop-shadow-sm">
        {node.label.length > 22 ? `${node.label.substring(0, 22)}...` : node.label}
      </text>

      {isEditing && (
        <g transform="translate(0, 80)">
          <rect x={-180} y={-220} width={360} height={420} rx={24}
            fill="rgb(var(--color-bg))" stroke="rgb(var(--color-border))" strokeWidth={1} className="drop-shadow-2xl" />

          <rect x={-180} y={-220} width={360} height={55} rx={24} fill="rgb(var(--color-bg-strong))" clipPath="inset(0 0 365 0)" />
          <text x={0} y={-185} textAnchor="middle" fill="rgb(var(--color-fg))" 
            fontSize="14" fontWeight="800" fontFamily="Inter, sans-serif" className="uppercase tracking-widest">
            Add Child Node
          </text>

          <g transform="translate(-160, -140)">
            <text x={0} y={-10} fill="rgb(var(--color-accent))" fontSize="10" fontWeight="700" className="uppercase tracking-wider">Title</text>
            <rect x={0} y={0} width={320} height={45} rx={12} fill="rgb(var(--color-bg-soft))" stroke="rgb(var(--color-border))" />
            <foreignObject x={5} y={5} width={310} height={35}>
              <input autoFocus value={localLabel} onChange={handleLabelChange} onKeyDown={handleKeyDown}
                className="w-full h-full bg-transparent border-0 text-fg text-sm focus:outline-none px-2 font-semibold" />
            </foreignObject>

            <g transform="translate(0, 75)">
              <text x={0} y={-10} fill="rgb(var(--color-fg-subtle))" fontSize="10" fontWeight="700" className="uppercase tracking-wider">Summary</text>
              <rect x={0} y={0} width={320} height={65} rx={12} fill="rgb(var(--color-bg-soft))" stroke="rgb(var(--color-border))" />
              <foreignObject x={5} y={5} width={310} height={55}>
                <textarea value={localSummary} onChange={handleSummaryChange} onKeyDown={handleKeyDown}
                  className="w-full h-full bg-transparent border-0 text-fg text-xs resize-none focus:outline-none px-2" />
              </foreignObject>
            </g>

            <g transform="translate(0, 170)">
              <text x={0} y={-10} fill="rgb(var(--color-fg-subtle))" fontSize="10" fontWeight="700" className="uppercase tracking-wider">Description</text>
              <rect x={0} y={0} width={320} height={85} rx={12} fill="rgb(var(--color-bg-soft))" stroke="rgb(var(--color-border))" />
              <foreignObject x={5} y={5} width={310} height={75}>
                <textarea value={localDescription} onChange={handleDescriptionChange} onKeyDown={handleKeyDown}
                  className="w-full h-full bg-transparent border-0 text-fg text-xs resize-none focus:outline-none px-2" />
              </foreignObject>
            </g>
          </g>

          <g transform="translate(0, 155)">
            <g onClick={confirmInlineEdit} className="cursor-pointer active:scale-95 transition-transform">
              <rect x={-160} y={-22} width={150} height={48} rx={14} fill="rgb(var(--color-accent))" />
              <text x={-85} y={6} textAnchor="middle" fill="rgb(var(--color-accent-fg))" fontSize="14" fontWeight="700">Confirm</text>
            </g>
            <g onClick={cancelInlineEdit} className="cursor-pointer active:scale-95 transition-transform">
              <rect x={10} y={-22} width={150} height={48} rx={14} fill="rgb(var(--color-bg-strong))" stroke="rgb(var(--color-border))" />
              <text x={85} y={6} textAnchor="middle" fill="rgb(var(--color-fg))" fontSize="14" fontWeight="600">Cancel</text>
            </g>
          </g>

          <path d="M 0 -220 L 0 -105" stroke="rgb(var(--color-border))" strokeWidth={1} strokeDasharray="4 4" />
        </g>
      )}
    </g>
  );
}
