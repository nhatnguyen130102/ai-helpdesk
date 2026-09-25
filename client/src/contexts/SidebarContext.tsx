import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
    isPinned: boolean;
    isHovered: boolean;
    togglePin: () => void;
    setIsHovered: (hovered: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPinned, setIsPinned] = useState(true); // Mặc định: Ghim (Phóng to)
    const [isHovered, setIsHovered] = useState(false);

    const togglePin = () => setIsPinned((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isPinned, isHovered, togglePin, setIsHovered }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
};