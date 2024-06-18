import { create } from "zustand";

export const useStore = create((set, get) => ({
  count: 1,
  counter2: 2,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
  setq: () => set((state: any) => ({ counter2: state.counter2 + 5 }))
}));