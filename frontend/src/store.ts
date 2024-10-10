import { create } from "zustand";

interface StoreState {
    itemId: string;
    setItemId: (value: string) => void;
  }
  
  const useStore = create<StoreState>((set) => ({
    itemId: "",
    setItemId: (value) => set(() => ({ itemId: value })),
  }));
export default useStore;