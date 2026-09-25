import { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Ticket as TicketIcon,
    UserCheck,
    Clock,
} from "lucide-react";

// Định nghĩa Interface cho Ticket
interface TicketItem {
    id: string;
    title: string;
    customer: {
        name: string;
        email: string;
        avatar?: string;
    };
    category: string;
    priority: "Urgent" | "High" | "Medium" | "Low";
    status: "Open" | "In Progress" | "Resolved";
    assignee: string;
    createdAt: string;
}

// Mock data mẫu
const initialTickets: TicketItem[] = [
    {
        id: "TK-1024",
        title: "Cannot access VPN server from home network",
        customer: { name: "Alex Morgan", email: "alex.m@company.com" },
        category: "Network",
        priority: "High",
        status: "Open",
        assignee: "Unassigned",
        createdAt: "10 mins ago",
    },
    {
        id: "TK-1023",
        title: "Email sync error on iOS Outlook App",
        customer: { name: "Sarah Jenkins", email: "sarah.j@company.com" },
        category: "Software",
        priority: "Medium",
        status: "In Progress",
        assignee: "John Doe",
        createdAt: "25 mins ago",
    },
    {
        id: "TK-1022",
        title: "Request for Figma Pro software license renewal",
        customer: { name: "David Chen", email: "david.c@company.com" },
        category: "Access",
        priority: "Low",
        status: "Resolved",
        assignee: "Emma Watson",
        createdAt: "1 hour ago",
    },
    {
        id: "TK-1021",
        title: "Database connection timeout in Staging cluster",
        customer: { name: "Michael Scott", email: "michael.s@company.com" },
        category: "DevOps",
        priority: "Urgent",
        status: "In Progress",
        assignee: "Tech Lead",
        createdAt: "2 hours ago",
    },
    {
        id: "TK-1020",
        title: "MacBook Pro M2 screen flickering on external display",
        customer: { name: "Jessica Alba", email: "jessica.a@company.com" },
        category: "Hardware",
        priority: "Medium",
        status: "Open",
        assignee: "Unassigned",
        createdAt: "3 hours ago",
    },
];

export default function TicketList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [priorityFilter, setPriorityFilter] = useState<string>("All");

    // Lọc danh sách Ticket
    const filteredTickets = initialTickets.filter((ticket) => {
        const matchesSearch =
            ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || ticket.status === statusFilter;

        const matchesPriority =
            priorityFilter === "All" || ticket.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className="space-y-6 text-zinc-100">

            {/* 1. Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                        <span>Tickets</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                            {filteredTickets.length} total
                        </span>
                    </h1>
                    <p className="mt-1 text-xs text-zinc-400">
                        Manage, route, and resolve customer support tickets.
                    </p>
                </div>

                {/* Action Button */}
                <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-95 w-fit"
                >
                    <Plus className="w-4 h-4" />
                    <span>Create Ticket</span>
                </button>
            </div>

            {/* 2. Filter & Toolbar Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 rounded-2xl border border-zinc-800/80 bg-zinc-950">

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by ID, title or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800/80 pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                </div>

                {/* Select Filters */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">

                    {/* Status Filter */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-xs">
                        <Filter className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-500">Status:</span>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer font-medium"
                        >
                            <option value="All" className="bg-zinc-900">All</option>
                            <option value="Open" className="bg-zinc-900">Open</option>
                            <option value="In Progress" className="bg-zinc-900">In Progress</option>
                            <option value="Resolved" className="bg-zinc-900">Resolved</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800/80 text-xs">
                        <span className="text-zinc-500">Priority:</span>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer font-medium"
                        >
                            <option value="All" className="bg-zinc-900">All</option>
                            <option value="Urgent" className="bg-zinc-900">Urgent</option>
                            <option value="High" className="bg-zinc-900">High</option>
                            <option value="Medium" className="bg-zinc-900">Medium</option>
                            <option value="Low" className="bg-zinc-900">Low</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* 3. Tickets Table Container */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-zinc-800 bg-zinc-900/40 text-zinc-400 uppercase tracking-wider text-[10px]">
                                <th className="py-3.5 px-4 font-semibold">ID</th>
                                <th className="py-3.5 px-4 font-semibold">Ticket Detail</th>
                                <th className="py-3.5 px-4 font-semibold">Customer</th>
                                <th className="py-3.5 px-4 font-semibold">Category</th>
                                <th className="py-3.5 px-4 font-semibold">Priority</th>
                                <th className="py-3.5 px-4 font-semibold">Status</th>
                                <th className="py-3.5 px-4 font-semibold">Assignee</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket) => (
                                    <tr
                                        key={ticket.id}
                                        className="hover:bg-zinc-900/50 transition-colors group"
                                    >
                                        {/* ID */}
                                        <td className="py-4 px-4 font-mono font-semibold text-indigo-400">
                                            {ticket.id}
                                        </td>

                                        {/* Title & Time */}
                                        <td className="py-4 px-4 max-w-xs">
                                            <p className="font-medium text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                                                {ticket.title}
                                            </p>
                                            <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{ticket.createdAt}</span>
                                            </p>
                                        </td>

                                        {/* Customer */}
                                        <td className="py-4 px-4">
                                            <p className="font-medium text-zinc-200 leading-tight">
                                                {ticket.customer.name}
                                            </p>
                                            <p className="text-[11px] text-zinc-500 truncate max-w-[120px]">
                                                {ticket.customer.email}
                                            </p>
                                        </td>

                                        {/* Category Badge */}
                                        <td className="py-4 px-4">
                                            <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                                                {ticket.category}
                                            </span>
                                        </td>

                                        {/* Priority Badge */}
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${ticket.priority === "Urgent" || ticket.priority === "High"
                                                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                    : ticket.priority === "Medium"
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        : "bg-zinc-800 text-zinc-400 border-zinc-700/50"
                                                    }`}
                                            >
                                                {ticket.priority}
                                            </span>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="py-4 px-4">
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
                                                        ? "bg-amber-400 animate-pulse"
                                                        : ticket.status === "In Progress"
                                                            ? "bg-blue-400"
                                                            : "bg-emerald-400"
                                                        }`}
                                                />
                                                {ticket.status}
                                            </span>
                                        </td>

                                        {/* Assignee */}
                                        <td className="py-4 px-4 text-zinc-400">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
                                                <span>{ticket.assignee}</span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                type="button"
                                                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                                                title="More options"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Empty State */
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-zinc-500">
                                        <TicketIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                                        <p className="text-xs font-medium">No tickets found</p>
                                        <p className="text-[11px] text-zinc-600 mt-0.5">
                                            Try adjusting your search terms or filters.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 4. Table Pagination Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500 bg-zinc-950">
                    <span>
                        Showing <strong className="text-zinc-300">1-{filteredTickets.length}</strong> of{" "}
                        <strong className="text-zinc-300">{filteredTickets.length}</strong> tickets
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            disabled
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-600 cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            disabled
                            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-600 cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}