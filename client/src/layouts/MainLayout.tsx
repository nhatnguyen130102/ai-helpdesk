import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Header from "./Header";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";

function MainContent() {
    const { isPinned } = useSidebar();

    return (
        <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isPinned ? "pl-64" : "pl-[72px]"}`}>
            <Header />
            <main className="flex-1 p-6 bg-zinc-900 text-zinc-100">
                <Outlet />
            </main>
        </div>
    );
}

export default function MainLayout() {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-zinc-900">
                <Sidebar />
                <MainContent />
            </div>
        </SidebarProvider>
    );
}