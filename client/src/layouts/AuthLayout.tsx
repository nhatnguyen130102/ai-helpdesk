import React from "react";
import { Bot, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    badge?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    badge = "AI Helpdesk Workspace",
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4 py-8 text-zinc-100 relative overflow-hidden">

            {/* Glow Effects trang trí nền */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Container */}
            <div className="w-full max-w-[30vw] bg-zinc-950/80 border border-zinc-800/80 rounded-2xl shadow-2xl p-8 backdrop-blur-xl relative z-10">

                {/* Header Section */}
                <div className="mb-8 text-center">
                    {/* Logo Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4 shadow-inner">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{badge}</span>
                    </div>

                    <div className="text-[25px] font-bold tracking-tight text-white">
                        {title}
                    </div>

                    {subtitle && (
                        <p className="text-zinc-400 text-[15px] mt-1.5 leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Form Content (truyền từ bên ngoài vào) */}
                <div>{children}</div>

                {/* Footer bảo mật nhỏ ở dưới */}
                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
                    <span>Encrypted & Secured by AI Helpdesk</span>
                </div>

            </div>
        </div>
    );
};