import { useUiStore } from "../../stores/ui.store";

export default function GlobalLoading() {
    const isLoading = useUiStore(
        (state) => state.isGlobalLoading
    );

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="rounded-lg bg-white px-6 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />

                    <span className="text-sm">
                        Processing...
                    </span>
                </div>
            </div>
        </div>
    );
}