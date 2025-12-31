'use client';
import { 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Plus, 
  FileText,
  Download,
  X 
} from 'lucide-react';
import { useMindmap } from '@/app/hooks/useMindmap';
import { useCallback } from 'react';

interface CanvasProps {
  svgRef: React.RefObject<SVGSVGElement>;
}

export default function ActionBar({ svgRef }: CanvasProps) {
  const { 
    expandAll,
    collapseAll,
    resetView,
    drillDown,
    drillUp,
    generateDocumentation,
    selectedNodeId,           
    startInlineEdit,
    editMode,   
  } = useMindmap();

  const handleSvgDownload = useCallback(() => {
    expandAll();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const svgString = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(svg)}`;
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `mindmap-full-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }, [svgRef, expandAll]);

  const isEditing = editMode;
  const canAddChild = !!selectedNodeId;

  // Uniform button style
  const btnStyle = `
    px-3 py-1 text-sm flex items-center gap-1 rounded-lg
    bg-accent text-accent-fg font-medium shadow-sm hover:shadow-md
    transition-all duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <nav className="w-full flex justify-center items-center gap-2 py-1 bg-transparent">
      {/* View Controls */}
      <button className={btnStyle} onClick={expandAll} title="Expand All">
        <ChevronDown size={16} />
        <span>Expand</span>
      </button>
      <button className={btnStyle} onClick={collapseAll} title="Collapse All">
        <ChevronUp size={16} />
        <span>Collapse</span>
      </button>

      {/* Drill Controls */}
      <button className={btnStyle} onClick={drillDown} title="Drill Down">
        DRL ↓
      </button>
      <button className={btnStyle} onClick={drillUp} title="Drill Up">
        DRL ↑
      </button>

      {/* Fit View */}
      <button className={btnStyle} onClick={resetView} title="Fit View">
        <Maximize2 size={16} />
        <span>Fit</span>
      </button>

      {/* Add Node */}
      <button 
        onClick={startInlineEdit}
        disabled={!canAddChild}
        className={btnStyle}
        title={canAddChild ? "Add Node" : "Select node first"}
      >
        {isEditing ? <X size={16} /> : <Plus size={16} />}
        <span>{isEditing ? 'Cancel' : 'Add'}</span>
      </button>

      {/* Documentation */}
      <button className={btnStyle} onClick={generateDocumentation} title="Generate Documentation">
        <FileText size={16} />
        <span>Doc</span>
      </button>

      {/* Download SVG */}
      <button className={btnStyle} onClick={handleSvgDownload} title="Download SVG">
        <Download size={16} />
        <span>SVG</span>
      </button>

    </nav>
  );
}
