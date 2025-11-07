import { create } from "zustand"

interface Settings {
    data: object
    setData: (data: object) => void
}

const useSettings = create<Settings>((set) => ({
    data: [],
    setData: (payload) => set({ data: payload }),
}))

export default useSettings
