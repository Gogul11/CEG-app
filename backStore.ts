import { create } from "zustand";

type BackStore = {
    back : boolean,
    setBack : (val : boolean) => void
}

export const useBackStore = create<BackStore>((set) => ({
    back : false,
    setBack : (val) => set({back : val})
}))