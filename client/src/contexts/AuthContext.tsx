import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { authService } from "../services/auth/auth.service";
import { tokenStorage } from "../utils/storage";

interface AuthUser {
    userId: number;
    userName: string;
    fullName: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        userName: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!tokenStorage.getAccessToken();

    useEffect(() => {
        const accessToken = tokenStorage.getAccessToken();

        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        const storedUser = localStorage.getItem("auth_user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (
        userName: string,
        password: string
    ) => {
        const response = await authService.login({
            userName,
            password,
        });

        const authUser: AuthUser = {
            userId: response.userId,
            userName: response.userName,
            fullName: response.fullName,
        };

        setUser(authUser);

        localStorage.setItem(
            "auth_user",
            JSON.stringify(authUser)
        );
    };

    const logout = async () => {
        await authService.logout();

        setUser(null);
        localStorage.removeItem("auth_user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}