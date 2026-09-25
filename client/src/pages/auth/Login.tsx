import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useUiStore } from "../../stores/ui.store";
import { toast } from "sonner";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Button } from "../../components/common/Button";

const loginSchema = z.object({
    userName: z
        .string()
        .min(1, "Username is required"),

    password: z
        .string()
        .min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const setGlobalLoading = useUiStore(
        (state) => state.setGlobalLoading
    );

    const { login, logout } = useAuth();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const goToRegister = () => {
        navigate("/register");
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.userName, data.password);
            setGlobalLoading(true);
            toast.success("Login successfully.", { description: "Welcome back <3" });

            const from =
                location.state?.from?.pathname ||
                "/dashboard";

            navigate(from, { replace: true });
        } catch (error) {
            logout();
            setValue("password", "");
            const message =
                error instanceof Error
                    ? error.message
                    : "Login failed.";

            toast.error(message);
        } finally {
            setGlobalLoading(false)
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to access your workspace"
        >

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
                        {/* Toggle show/hide password */}
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full mt-4"
                >
                    Login
                </Button>
                <Button
                    variant="secondary"
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full"
                    onClick={() => goToRegister()}
                >
                    Register
                </Button>
            </form>
        </AuthLayout>
    );
}