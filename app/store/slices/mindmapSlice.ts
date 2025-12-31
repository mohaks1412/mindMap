import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Link, MindmapState } from '@/app/lib/types';

const initialData: Node[] = [
  // LEVEL 0 - Indigo
  {
    id: 'vitamins',
    label: 'Vitamins',
    summary: 'Essential micronutrients',
    description: 'Organic compounds required in small amounts for normal growth and nutrition',
    color: '#4F46E5',
    children: ['human-body', 'vitamin-classification', 'sources'],
  },
  
  // LEVEL 1 - Blue
  {
    id: 'human-body',
    label: 'Human Body',
    summary: 'Role & functions',
    description: 'Critical physiological roles across multiple systems',
    color: '#3B82F6',
    children: ['functions', 'deficiency'],
  },
  {
    id: 'vitamin-classification',
    label: 'Classification',
    summary: 'Soluble vs fat-soluble',
    description: 'Divided by solubility properties affecting absorption/storage',
    color: '#3B82F6',
    children: ['water-soluble', 'fat-soluble'],
  },
  {
    id: 'sources',
    label: 'Sources',
    summary: 'Dietary & supplements',
    description: 'Natural foods vs manufactured supplements',
    color: '#3B82F6',
    children: ['food-sources', 'supplements'],
  },
  
  // LEVEL 2 - Emerald
  {
    id: 'functions',
    label: 'Functions',
    summary: 'Metabolism & immunity',
    description: 'Enzymatic cofactors, antioxidants, immune support',
    color: '#10B981',
    children: [],
  },
  {
    id: 'deficiency',
    label: 'Deficiency',
    summary: 'Health impacts',
    description: 'Specific diseases from prolonged insufficient intake',
    color: '#10B981',
    children: [],
  },
  {
    id: 'water-soluble',
    label: 'Water-Soluble',
    summary: 'B-complex + C',
    description: 'Excreted daily, require consistent intake',
    color: '#10B981',
    children: ['vitamin-b', 'vitamin-c'],
  },
  {
    id: 'fat-soluble',
    label: 'Fat-Soluble',
    summary: 'A, D, E, K',
    description: 'Stored in fatty tissues/liver, toxicity risk',
    color: '#10B981',
    children: ['vitamin-a', 'vitamin-d', 'vitamin-e', 'vitamin-k'],
  },
  {
    id: 'food-sources',
    label: 'Food Sources',
    summary: 'Natural sources',
    description: 'Bioavailability varies by food matrix',
    color: '#10B981',
    children: [],
  },
  {
    id: 'supplements',
    label: 'Supplements',
    summary: 'Synthetic vitamins',
    description: 'Variable absorption compared to food sources',
    color: '#10B981',
    children: [],
  },
  
  // LEVEL 3 - Amber
  {
    id: 'vitamin-b',
    label: 'Vitamin B Complex really long long long long long long text',
    summary: "this is about vitamin B",
    description: '8 B vitamins acting as coenzymes in metabolism',
    color: '#F59E0B',
    children: [],
  },
  {
    id: 'vitamin-c',
    label: 'Vitamin C',
    summary: 'Antioxidant',
    description: 'Ascorbic acid, collagen synthesis, immune function',
    color: '#F59E0B',
    children: [],
  },
  {
    id: 'vitamin-a',
    label: 'Vitamin A',
    summary: 'Vision & immunity',
    description: 'Retinoids for rhodopsin, epithelial maintenance',
    color: '#F59E0B',
    children: [],
  },
  {
    id: 'vitamin-d',
    label: 'Vitamin D',
    summary: 'Bone health',
    description: 'Calcium/phosphate homeostasis, synthesized via sunlight',
    color: '#F59E0B',
    children: [],
  },
  {
    id: 'vitamin-e',
    label: 'Vitamin E',
    summary: 'Antioxidant protection',
    description: 'Tocopherols protecting cell membranes from oxidation',
    color: '#F59E0B',
    children: [],
  },
  {
    id: 'vitamin-k',
    label: 'Vitamin K',
    summary: 'Blood clotting',
    description: 'Phylloquinone/menaquinone for gamma-carboxylation',
    color: '#F59E0B',
    children: [],
  },
];

const initialLinks: Link[] = [
  { id: 'l1', source: 'vitamins', target: 'human-body' },
  { id: 'l2', source: 'vitamins', target: 'vitamin-classification' },
  { id: 'l3', source: 'vitamins', target: 'sources' },
  { id: 'l4', source: 'human-body', target: 'functions' },
  { id: 'l5', source: 'human-body', target: 'deficiency' },
  { id: 'l6', source: 'vitamin-classification', target: 'water-soluble' },
  { id: 'l7', source: 'vitamin-classification', target: 'fat-soluble' },
  { id: 'l8', source: 'sources', target: 'food-sources' },
  { id: 'l9', source: 'sources', target: 'supplements' },
  { id: 'l10', source: 'water-soluble', target: 'vitamin-b' },
  { id: 'l11', source: 'water-soluble', target: 'vitamin-c' },
  { id: 'l12', source: 'fat-soluble', target: 'vitamin-a' },
  { id: 'l13', source: 'fat-soluble', target: 'vitamin-d' },
  { id: 'l14', source: 'fat-soluble', target: 'vitamin-e' },
  { id: 'l15', source: 'fat-soluble', target: 'vitamin-k' },
];

const initialState: MindmapState = {
  nodes: initialData,
  links: initialLinks,
  selectedNodeId: null,
  expandedNodes: [],
  editMode: false,
  nodePositions: {},
  currentLevel: 0,
  documentation: "",
  tempNodeData: { label: "", summary: "", description: "" }, // ✅ Added description
};

// Update tempNodeData payload type
export const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    setMindmapData: (state, action: PayloadAction<{ nodes: Node[]; links: Link[] } | null>) => {
      if (!action.payload) {
        state.nodes = [];
        state.links = [];
        state.expandedNodes = [];
        state.selectedNodeId = null;
        return;
      }
      state.nodes = action.payload.nodes;
      state.links = action.payload.links;
      state.expandedNodes = [];
      state.selectedNodeId = action.payload.nodes[0]?.id || null;
    },

    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setLinks: (state, action: PayloadAction<Link[]>) => {
      state.links = action.payload;
    },
    selectNode: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload;
    },
    toggleExpand: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.expandedNodes.includes(id)) {
        state.expandedNodes = state.expandedNodes.filter(n => n !== id);
      } else {
        state.expandedNodes.push(id);
      }
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
    },
    expandAll: (state) => {
      const maxDepth = getMaxDepth(state.nodes);
      state.currentLevel = maxDepth;
      updateLevel(state);
    },
    collapseAll: (state) => {
      state.currentLevel = 0;
      state.expandedNodes = [];
    },

    drillDown: (state) => {
      const maxDepth = getMaxDepth(state.nodes);
      state.currentLevel = Math.min(state.currentLevel as number + 1, maxDepth);
      updateLevel(state);
    },
    drillUp: (state) => {
      state.currentLevel = Math.max(state.currentLevel as number - 1, 0);
      updateLevel(state);
    },
    generateDocumentation: (state) => {
      const docs = generateMindmapDocs(state.nodes);
      state.documentation = docs;
    },

    startInlineEdit: (state) => {
      if (!state.selectedNodeId) return;
      state.editMode = true; // Enable editing
    },

    // ✅ Updated: Now handles label, summary, AND description
    updateTempData: (state, action: PayloadAction<{label: string, summary: string, description: string}>) => {
      state.tempNodeData = action.payload;
    },

    confirmInlineEdit: (state) => {
      const { label, summary, description } = state.tempNodeData;
      if (!label.trim() || !state.selectedNodeId) return;

      const parent = state.nodes.find(n => n.id === state.selectedNodeId!);
      if (!parent) return;

      const newNode: Node = {
        id: crypto.randomUUID(),
        label: label.trim(),
        summary: summary.trim() || "New node summary",
        description: description.trim() || "New node description",
        color: parent.color,
        children: [],
      };

      parent.children.push(newNode.id);
      state.nodes.push(newNode);

      if (!state.expandedNodes.includes(state.selectedNodeId!)) {
        state.expandedNodes.push(state.selectedNodeId!);
      }

      state.links.push({
        id: `link-${crypto.randomUUID()}`,
        source: state.selectedNodeId!,
        target: newNode.id,
      });

      state.tempNodeData = { label: "", summary: "", description: "" }; // ✅ Reset all 3 fields
      state.editMode = false;
    },

    cancelInlineEdit: (state) => {
      state.tempNodeData = { label: "", summary: "", description: "" };
      state.editMode = false;
    },
    updateNode: (state, action: PayloadAction<{ 
      id: string; 
      label: string; 
      summary: string; 
      description: string 
    }>) => {
      const { id, label, summary, description } = action.payload;
      
      // Update node data
      const nodeIndex = state.nodes.findIndex(n => n.id === id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          label: label.trim(),
          summary: summary.trim(),
          description: description.trim(),
        };
      }
      
      // Update selectedNodeId reference (if needed)
      if (state.selectedNodeId === id) {
        // No extra action needed - selector will pick up changes
      }
    }
  },
});

// Helper functions unchanged
function getMaxDepth(nodes: Node[]): number {
  let maxDepth = 0;
  
  function findDepth(nodeId: string, depth: number): void {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    maxDepth = Math.max(maxDepth, depth);
    node.children.forEach(childId => findDepth(childId, depth + 1));
  }
  
  const rootId = getRootNode(nodes);
  findDepth(rootId, 0);
  return maxDepth;
}

function generateMindmapDocs(nodes: Node[]): string {
  const rootId = getRootNode(nodes);
  
  function buildSummary(nodeId: string, depth: number = 0): string {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return '';
    
    const indent = '  '.repeat(depth);
    let summary = `${indent}**${node.label}**\n${indent}  Summary: ${node.summary}\n${indent}  Description: ${node.description}\n\n`;
    
    node.children.forEach(childId => {
      summary += buildSummary(childId, depth + 1);
    });
    
    return summary;
  }

  return `# Mindmap Documentation\n\n${buildSummary(rootId)}\n\n*Generated: ${new Date().toLocaleString()}*\n*Root: ${rootId}*\n*Total Nodes: ${nodes.length}*`;
}

function getRootNode(nodes: Node[]): string {
  const allTargets = new Set();
  nodes.forEach(node => node.children.forEach(childId => allTargets.add(childId)));
  return nodes.find(node => !allTargets.has(node.id))?.id || nodes[0]?.id;
}

function updateLevel(state: any) {
  state.expandedNodes = [];
  
  function expandUpToLevel(nodeId: string, depth: number): void {
    const node = state.nodes.find((n: Node) => n.id === nodeId);
    if (!node) return;
    
    if (depth < state.currentLevel) {
      state.expandedNodes.push(nodeId);
    }
    
    node.children.forEach((childId: string) => {
      expandUpToLevel(childId, depth + 1);
    });
  }
  
  const rootId = getRootNode(state.nodes);
  expandUpToLevel(rootId, 0);
}

export const { 
  setNodes, 
  setLinks, 
  selectNode, 
  toggleExpand, 
  toggleEditMode, 
  expandAll, 
  collapseAll,
  drillDown,
  drillUp,
  generateDocumentation,
  startInlineEdit,
  confirmInlineEdit,
  cancelInlineEdit,
  updateTempData,
  setMindmapData,
  updateNode
} = mindmapSlice.actions;

export default mindmapSlice.reducer;
