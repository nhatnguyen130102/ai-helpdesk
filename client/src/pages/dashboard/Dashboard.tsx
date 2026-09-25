
import {
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

// Mock data cho danh sách ticket gần đây
const recentTickets = [
    {
        id: "TK-1024",
        title: "Cannot access VPN server from home",
        customer: "Alex Morgan",
        priority: "High",
        status: "Open",
        category: "Network",
        updatedAt: "10 mins ago",
    },
    {
        id: "TK-1023",
        title: "Email sync error on Mobile app",
        customer: "Sarah Jenkins",
        priority: "Medium",
        status: "In Progress",
        category: "Software",
        updatedAt: "25 mins ago",
    },
    {
        id: "TK-1022",
        title: "Request for Figma Pro license",
        customer: "David Chen",
        priority: "Low",
        status: "Resolved",
        category: "Access",
        updatedAt: "1 hour ago",
    },
    {
        id: "TK-1021",
        title: "Database connection timeout in Staging",
        customer: "Michael Scott",
        priority: "Urgent",
        status: "In Progress",
        category: "DevOps",
        updatedAt: "2 hours ago",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-6 text-zinc-100">

            {/* 1. Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-xs text-zinc-400">
                        Overview of your AI Helpdesk system metrics and recent activities.
                    </p>
                </div>

                {/* Quick Action Button */}
                <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-95 w-fit"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Report</span>
                </button>
            </div>

            {/* 2. Stats Grid (4 Cards) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Card 1: Total Tickets */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-zinc-400">Total Tickets</p>
                        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                            <Ticket className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <p className="text-3xl font-bold text-white tracking-tight">24</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <TrendingUp className="w-3 h-3" />
                            +12%
                        </span>
                    </div>
                    <p className="mt-2 text-[11px] text-zinc-500">vs. last week</p>
                </div>

                {/* Card 2: Open */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-zinc-400">Open Tickets</p>
                        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <p className="text-3xl font-bold text-white tracking-tight">8</p>
                        <span className="text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Requires Action
                        </span>
                    </div>
                    <p className="mt-2 text-[11px] text-zinc-500">3 high priority</p>
                </div>

                {/* Card 3: In Progress */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-zinc-400">In Progress</p>
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <p className="text-3xl font-bold text-white tracking-tight">10</p>
                        <span className="text-[11px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                            Assigned
                        </span>
                    </div>
                    <p className="mt-2 text-[11px] text-zinc-500">Avg. handle time: 1.5h</p>
                </div>

                {/* Card 4: Resolved */}
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-zinc-400">Resolved</p>
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <p className="text-3xl font-bold text-white tracking-tight">6</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            94% CSAT
                        </span>
                    </div>
                    <p className="mt-2 text-[11px] text-zinc-500">Resolved today</p>
                </div>

            </div>

            {/* 3. Main Content Grid (Recent Tickets Table) */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 shadow-sm">

                {/* Table Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-sm font-semibold text-white">Recent Tickets</h2>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                            Latest support requests submitted across all channels.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        <span>View All</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[10px]">
                                <th className="pb-3 font-semibold">Ticket ID</th>
                                <th className="pb-3 font-semibold">Title</th>
                                <th className="pb-3 font-semibold">Customer</th>
                                <th className="pb-3 font-semibold">Priority</th>
                                <th className="pb-3 font-semibold">Status</th>
                                <th className="pb-3 font-semibold text-right">Updated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                            {recentTickets.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                                >
                                    <td className="py-3.5 font-mono font-medium text-zinc-400">
                                        {ticket.id}
                                    </td>
                                    <td className="py-3.5 font-medium text-white max-w-xs truncate">
                                        {ticket.title}
                                    </td>
                                    <td className="py-3.5 text-zinc-400">
                                        {ticket.customer}
                                    </td>
                                    <td className="py-3.5">
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-medium border ${ticket.priority === "Urgent" || ticket.priority === "High"
                                                ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                : ticket.priority === "Medium"
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    : "bg-zinc-800 text-zinc-400 border-zinc-700/50"
                                                }`}
                                        >
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="py-3.5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${ticket.status === "Open"
                                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                : ticket.status === "In Progress"
                                                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${ticket.status === "Open"
                                                    ? "bg-amber-400"
                                                    : ticket.status === "In Progress"
                                                        ? "bg-blue-400"
                                                        : "bg-emerald-400"
                                                    }`}
                                            />
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 text-right text-zinc-500 text-[11px]">
                                        {ticket.updatedAt}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
}