import { create } from 'zustand';

interface Item {
  id: string;
  name: string;
  item_id: string;
  parentGodownId: string;
}

interface TreeNode {
  id: string;
  name: string;
  godown_id: string;
  children?: TreeNode[];
  Item?: Item[];
}

function updateTreeById(id: string, updatedData: Partial<TreeNode>, treeData: TreeNode[]): TreeNode[] {
  return treeData.map(node => {
    if (node.id === id) {
      return { ...node, ...updatedData };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeById(id, updatedData, node.children),
      };
    }
    return node; 
  });
}

interface StoreState {
  treeData: TreeNode[];
  setTreeData: (data: TreeNode[]) => void;
  updateNode: (id: string, updatedData: Partial<TreeNode>) => void;
}

const usedataStore = create<StoreState>((set) => ({
  treeData: [],
  setTreeData: (data) => set({ treeData: data }),
  updateNode: (id, updatedData) =>
    set((state) => ({
      treeData: updateTreeById(id, updatedData, state.treeData),
    })),
}));

export default usedataStore;
