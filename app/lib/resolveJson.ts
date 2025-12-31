import { RawJsonNode, Node, Link } from "./types";

const LEVEL_COLORS = [
  '#4F46E5',  // Level 0 (root) - Indigo
  '#3B82F6',  // Level 1 - Blue  
  '#10B981',  // Level 2 - Emerald
  '#F59E0B',  // Level 3 - Amber
  '#8B5CF6',  // Level 4 - Violet
  '#EC4899',  // Level 5 - Pink
];

export function resolveJson(jsonData: RawJsonNode): { nodes: Node[]; links: Link[] } {
  const nodesMap = new Map<string, Node>();
  const links: Link[] = [];
  let nodeCounter = 0;

  // 🔄 Recursive parser
  function parseNode(rawNode: RawJsonNode, level: number = 0, parentId?: string): Node {
    const id = rawNode.label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const summary = rawNode.summary || `${rawNode.label} node`;
    const description = rawNode.description || '';

    // 🎨 Level-based color (all cousins same color!)
    const color = LEVEL_COLORS[Math.min(level, LEVEL_COLORS.length - 1)];

    const node: Node = {
      id: `${id}-${Date.now()}-${nodeCounter++}`, // ✅ UNIQUE ID with timestamp
      label: rawNode.label,
      summary: summary.trim(),
      description: description.trim(),
      color,
      children: []
    };

    nodesMap.set(node.id, node);

    // Create link to parent
    if (parentId) {
      links.push({
        id: `l${Date.now()}-${nodeCounter}`,
        source: parentId,
        target: node.id
      });
    }

    // Recurse children
    if (rawNode.children && Array.isArray(rawNode.children)) {
      rawNode.children.forEach((child: RawJsonNode) => {
        const childNode = parseNode(child, level + 1, node.id);
        node.children.push(childNode.id);
      });
    }

    return node;
  }

  // 🚀 Parse root
  parseNode(jsonData);

  return {
    nodes: Array.from(nodesMap.values()),
    links
  };
}

// 🔥 Redux-compatible version
export function resolveJsonForRedux(rawJson: RawJsonNode): { nodes: Node[]; links: Link[] } {
  return resolveJson(rawJson);
}

// 🔥 BONUS: Generate CS Fundamentals sample (matches your huge JSON)
export function generateSampleJson(): RawJsonNode {
  return {
    label: "Computer Science Fundamentals",
    summary: "Core concepts spanning algorithms, data structures, systems, and theory",
    description: "Comprehensive knowledge graph covering essential pillars of computer science education",
    children: [
      {
        label: "Algorithms & Data Structures",
        summary: "Efficient problem solving foundations",
        description: "Time/space complexity analysis and fundamental data structures",
        children: [
          {
            label: "Time Complexity",
            summary: "Big O notation analysis",
            description: "Asymptotic analysis measuring worst-case performance",
            children: [
              { label: "O(1) Constant", summary: "Fixed execution time", description: "Hash table lookup" },
              { label: "O(log n)", summary: "Binary search", description: "BST operations" },
              { label: "O(n log n)", summary: "Optimal sorting", description: "Merge/Quicksort" }
            ]
          }
        ]
      },
      {
        label: "Operating Systems",
        summary: "System software foundations",
        description: "Process management and memory allocation",
        children: [
          {
            label: "Process Management",
            summary: "Lifecycle & scheduling",
            description: "Context switching and CPU scheduling",
            children: [
              { label: "Threads", summary: "Lightweight processes", description: "Mutex/semaphore sync" },
              { label: "Scheduling", summary: "CPU allocation", description: "Round Robin, Priority" }
            ]
          }
        ]
      }
    ]
  };
}
