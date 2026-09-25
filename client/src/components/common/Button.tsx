import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn"; // Điều chỉnh đường dẫn dẫn tới hàm cn của bạn

export type ButtonVariant =
    | "primary"     // Trắng (như nút Create Account hiện tại)
    | "secondary"   // Dark zinc
    | "outline"     // Viền zinc
    | "ghost"       // Trong suốt
    | "danger"      // Đỏ / Destructive
    | "success";    // Xanh lá

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-white hover:bg-zinc-200 text-zinc-950 shadow-md hover:shadow-zinc-700/10",
    secondary:
        "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50",
    outline:
        "bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 focus:border-zinc-700",
    ghost:
        "bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100",
    danger:
        "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/20",
    success:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-5 py-3 text-base rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = "primary",
            size = "md",
            isLoading = false,
            disabled,
            leftIcon,
            rightIcon,
            type = "button",
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                type={type}
                disabled={isDisabled}
                className={cn(
                    // Base styles
                    "font-semibold inline-flex items-center justify-center transition-all duration-200 outline-none select-none",
                    "active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
                    // Dynamic variant & size styles
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{children}</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";