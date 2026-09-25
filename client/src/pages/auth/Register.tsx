import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useUiStore } from "../../stores/ui.store";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";
import { authService } from "../../services/auth/auth.service";
import type { RegisterRequest } from "../../types/auth";
import { Button } from "../../components/common/Button";

const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Full name is required"),
        phoneNumber: z
            .string()
            .min(1, "Phone number is required")
            .regex(
                /^(0|\+?84)(3|5|7|8|9)\d{8}$/,
                "Invalid phone number format"
            ),
        userName: z
            .string()
            .min(3, "Username must be at least 3 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const setGlobalLoading = useUiStore((state) => state.setGlobalLoading);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setGlobalLoading(true);

            const payload: RegisterRequest = {
                userName: data.userName,
                password: data.password,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                roleId: 1,
            };

            await authService.register(payload);

            toast.success("Account created successfully!", {
                description: "You can now sign in with your credentials.",
            });

            navigate("/login");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Registration failed. Please try again.";

            toast.error(message);
        } finally {
            setGlobalLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an Account"
            subtitle="Sign up to get started with your workspace"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Field: Full Name */}
                <div className="max-h-[40vh] overflow-y-auto pr-3 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                {...register("fullName")}
                                type="text"
                                placeholder="John Doe"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.fullName
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Field: Username */}
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                {...register("userName")}
                                type="text"
                                placeholder="Enter username"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.userName
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                        </div>
                        {errors.userName && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.userName.message}
                            </p>
                        )}
                    </div>

                    {/* Field: Email */}
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="name@example.com"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.email
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Field: Phone Number */}
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <input
                                {...register("phoneNumber")}
                                type="tel"
                                placeholder="+84901234567"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.phoneNumber
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Field: Password */}
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-10 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.password
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Field: Confirm Password */}
                    <div>
                        <label className="text-left block text-xs font-medium text-zinc-300 tracking-wider mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input
                                {...register("confirmPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full bg-zinc-900 border text-sm rounded-xl pl-10 pr-10 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 ${errors.confirmPassword
                                    ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                                    : "border-zinc-800 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-200 transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>


                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full mt-4"
                >
                    Create Account
                </Button>

                {/* Footer link to Login */}
                <p className="text-center text-xs text-zinc-400 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-zinc-200 hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}