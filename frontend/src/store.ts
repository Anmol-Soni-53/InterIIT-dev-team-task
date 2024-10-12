import { create } from "zustand";

interface StoreState {
  itemId: string;
  parentGodownId: string;
  setItemId: (value: string) => void;
  setParentGodownId: (value: string) => void;
}

const useStore = create<StoreState>((set) => ({
  itemId: "",
  parentGodownId: "",
  setItemId: (value) => set(() => ({ itemId: value })),
  setParentGodownId: (value) => set(() => ({ parentGodownId: value })),
}));

export default useStore;
