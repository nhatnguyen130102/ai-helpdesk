import { create } from "zustand";

interface UiState {
    isGlobalLoading: boolean;

    setGlobalLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
    isGlobalLoading: false,

    setGlobalLoading: (loading) =>
        set({
            isGlobalLoading: loading,
        }),
}));