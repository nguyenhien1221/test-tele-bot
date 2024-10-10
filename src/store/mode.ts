import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useChangeMode = create(
  persist(
    (set) => ({
      mode: 'light',
      changeMode: (mode: any) => set({ mode: mode }),
    }),
    {
      name: 'mode', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
