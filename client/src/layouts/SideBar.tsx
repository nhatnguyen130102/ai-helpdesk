import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Ticket,
    Settings,
    HelpCircle,
    Bot,
    Pin,
    PinOff,
} from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";


const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Tickets", path: "/tickets", icon: Ticket, badge: 12 },
];

const secondaryMenuItems = [
    { label: "Settings", path: "/settings", icon: Settings },
    { label: "Support", path: "/support", icon: HelpCircle },
];

export default function Sidebar() {
    const { isPinned, isHovered, togglePin, setIsHovered } = useSidebar();

    // Sidebar mở rộng khi: Đã Ghim HOẶC Đang Hover
    const isExpanded = isPinned || isHovered;

    return (
        <aside
            onMouseEnter={() => !isPinned && setIsHovered(true)}
            onMouseLeave={() => !isPinned && setIsHovered(false)}
            className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-zinc-800/80 bg-zinc-950 text-zinc-100 transition-all duration-300 ease-in-out shadow-2xl ${isExpanded ? "w-64" : "w-[80px]"
                }`}
        >
            {/* TOP: Brand & Pin Button */}
            <div>
                <div className="flex h-16 items-center justify-between border-b border-zinc-800/80 px-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
                            <Bot className="h-5 w-5" />
                        </div>
                        {isExpanded && (
                            <div className="truncate transition-opacity duration-200">
                                <h4 className="text-sm font-bold text-white leading-tight">AI Helpdesk</h4>
                                <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Workspace</p>
                            </div>
                        )}
                    </div>

                    {/* Button Ghim / Bỏ Ghim (Chỉ hiện khi Expanded) */}
                    {isExpanded && (
                        <button
                            onClick={togglePin}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                            title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                        >
                            {isPinned ? <Pin className="w-4 h-4 text-indigo-400 fill-indigo-400/20" /> : <PinOff className="w-4 h-4" />}
                        </button>
                    )}
                </div>

                {/* NAVIGATION */}
                <div className="p-3 space-y-6">
                    <div>
                        {isExpanded && (
                            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Menu</p>
                        )}
                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `group relative flex items-center h-10 rounded-xl px-3 text-xs font-medium transition-all ${isActive
                                                ? "bg-zinc-900 text-white font-semibold border border-zinc-800/80"
                                                : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />

                                                {isExpanded && (
                                                    <div className="flex-1 flex items-center justify-between ml-3 overflow-hidden">
                                                        <span className="truncate">{item.label}</span>
                                                        {item.badge && (
                                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Active Indicator Line */}
                                                {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full" />}
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        {isExpanded && (
                            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">System</p>
                        )}
                        <nav className="space-y-1">
                            {secondaryMenuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center h-10 rounded-xl px-3 text-xs font-medium transition-all ${isActive ? "bg-zinc-900 text-white border border-zinc-800/80" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                                            }`
                                        }
                                    >
                                        <Icon className="h-5 w-5 shrink-0 text-zinc-500" />
                                        {isExpanded && <span className="ml-3 truncate">{item.label}</span>}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="p-3 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 px-2">
                    {isExpanded ? (
                        <>
                            <span>v2.4.0</span>
                            <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
                            </span>
                        </>
                    ) : (
                        <span className="h-2 w-2 mx-auto rounded-full bg-emerald-500" />
                    )}
                </div>
            </div>
        </aside>
    );
}