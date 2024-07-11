import { create } from 'zustand'

const useStore = create((set) => ({
    autocompleteOptions: [],
    setOptions: (options) => set((state) => ({ autocompleteOptions: [ ...options] })),
    updateOption: (option) => set((state) => {
        const oldValueIndex = state.autocompleteOptions.findIndex(item => item.id === option.id)
        state.autocompleteOptions[oldValueIndex] = { ...state.autocompleteOptions[oldValueIndex], ...option }
        return state
    }),
    removeAllOptions: () => set({ autocompleteOptions: [] }),
}))

export default useStore