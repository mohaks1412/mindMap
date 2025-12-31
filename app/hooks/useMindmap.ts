// hooks/useMindmap.ts
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useEffect } from 'react';
import { 
  setNodes, setLinks, 
  selectNode, toggleExpand, 
  expandAll, collapseAll, 
  toggleEditMode, 
  drillDown,
  drillUp,
  generateDocumentation,
  startInlineEdit,
  updateTempData,
  cancelInlineEdit,
  confirmInlineEdit,
  updateNode
} from '@/app/store/slices/mindmapSlice';
import { resetView } from '@/app/store/slices/uiSlice';

export const useMindmap = () => {
  const dispatch = useAppDispatch();
  const { 
    nodes, 
    selectedNodeId, 
    expandedNodes, 
    editMode, 
    links, 
    currentLevel, 
    documentation, 
    tempNodeData 
  } = useAppSelector((state) => state.mindmap);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  return {
    // State
    nodes,
    selectedNode,
    selectedNodeId,
    expandedNodes,
    editMode,
    links,
    currentLevel,       
    documentation,
    tempNodeData,
    
    // Actions
    generateDocumentation: () => dispatch(generateDocumentation()),
    drillDown: () => dispatch(drillDown()),
    drillUp: () => dispatch(drillUp()),
    expandAll: () => dispatch(expandAll()),
    collapseAll: () => dispatch(collapseAll()),
    toggleEditMode: () => dispatch(toggleEditMode()),
    selectNode: (id: string) => dispatch(selectNode(id)),
    toggleExpand: (id: string) => dispatch(toggleExpand(id)),
    resetView: () => dispatch(resetView()),
    startInlineEdit: () => dispatch(startInlineEdit()),
    
    updateTempData: (data: {label: string, summary: string, description: string}) => 
      dispatch(updateTempData(data)),
    updateNode: (data: {id: string, label: string, summary: string, description: string})=> dispatch(updateNode(data)),
    cancelInlineEdit: () => dispatch(cancelInlineEdit()),
    confirmInlineEdit: () => dispatch(confirmInlineEdit()),
  };
};
