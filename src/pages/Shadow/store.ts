import { create } from 'zustand';

export const useStore = create((set, get) => ({
  h_shadow: 0,
  v_shadow: 0,
  blur: 0,
  spread: 0,
  color: '#1677ff',
  inset: false,
  opacity: 0,
  seth: (value: number) => set((state: any) => ({ h_shadow: value })),
  setv: (value: number) => set((state:any) => ({v_shadow: value})),
  setblur: (value: number) => set((state: number) => ({ blur: value })),
  setspread: (value: number) => set((state: number) => ({ spread: value })),
  setshadow: (value: number) => set((state: number) => ({ color: value })),
  setinset: (value: any) => set((state: any) => ({ inset: value })),
  setopac: (value: number) => set((state: number) => ({ opacity: value}))
}))