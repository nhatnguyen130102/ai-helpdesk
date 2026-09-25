import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User as UserIcon, Bell, ChevronDown, ShieldAlert } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully.");
            navigate("/login", { replace: true });
        } catch {
            toast.error("Logout failed.");
        }
    };

    // Tạo Avatar viết tắt (Initials) từ Tên hoặc Username
    const getInitials = () => {
        if (user?.fullName) {
            return user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        return user?.userName?.slice(0, 2).toUpperCase() || "AI";
    };

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 backdrop-blur-md text-zinc-100">

            {/* Trái: Page Title */}
            <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold tracking-wide text-white">
                    Dashboard
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live System
                </span>
            </div>

            {/* Phải: Notifications & User Profile */}
            <div className="flex items-center gap-3">

                {/* Nút thông báo */}
                <button
                    type="button"
                    className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition-colors"
                    title="Notifications"
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                </button>

                <div className="h-4 w-[1px] bg-zinc-800" />

                {/* User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-zinc-900/80 transition-colors border border-transparent hover:border-zinc-800"
                    >
                        {/* Avatar Circle */}
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 font-semibold text-xs text-indigo-300">
                            {getInitials()}
                        </div>

                        {/* User Info Text */}
                        <div className="text-left hidden md:block">
                            <p className="text-xs font-medium text-zinc-200 leading-none mb-1">
                                {user?.fullName || user?.userName || "User"}
                            </p>
                            <p className="text-[11px] text-zinc-500 leading-none">
                                @{user?.userName || "username"}
                            </p>
                        </div>

                        <ChevronDown
                            className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* Menu sổ xuống (Popover) */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">

                            {/* Profile Overview trong menu */}
                            <div className="px-4 py-3 border-b border-zinc-800/80">
                                <p className="text-xs font-medium text-white truncate">
                                    {user?.fullName || "User Account"}
                                </p>
                                <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                                    @{user?.userName}
                                </p>
                            </div>

                            {/* Action items */}
                            <div className="p-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        // navigate("/profile");
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
                                >
                                    <UserIcon className="w-4 h-4 text-zinc-400" />
                                    <span>Profile Settings</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors mt-0.5"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Log out</span>
                                </button>
                            </div>

                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}