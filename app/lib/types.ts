export interface RawJsonNode {
  label: string;
  summary?: string;
  children?: RawJsonNode[];
  description: string
}

export interface Node {
  id: string;
  label: string;
  summary: string;
  color: string;
  children: string[];
  description: string;
}

export interface Link {
  id: string;
  source: string;
  target: string;
}


export interface MindmapState {
  nodes: Node[];
  links: Link[];
  selectedNodeId: string | null;
  expandedNodes: string[];
  editMode: boolean;
  nodePositions: Record<string, {x: number, y: number}>;
  currentLevel: number;
  documentation: string;
  tempNodeData: {label: string, summary: string, description: string};
}

export interface UIState {
  zoomLevel: number;
  panX: number;
  panY: number;
  layout: 'radial' | 'force';
}

export type RootState = {
  mindmap: MindmapState;
  ui: UIState;
};

export interface NodeProps {
  node: Node;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  isSelected: boolean;
  isHovered?: boolean;
}

export interface LinkProps {
  link: Link;
  sourceNode: Node;
  targetNode: Node;
}
