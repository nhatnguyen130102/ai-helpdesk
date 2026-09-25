import { apiClient } from "../api/api-client";
import { tokenStorage } from "../../utils/storage";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RefreshTokenRequest,
} from "../../types/auth";
import axios from "axios";

export const authService = {
    async login(
        data: LoginRequest
    ): Promise<LoginResponse> {
        try {
            const response = await apiClient.post<
                LoginRequest,
                LoginResponse
            >("/Auth/login", data);

            if (!response.success || !response.data) {
                tokenStorage.clearTokens();
                
                throw new Error(
                    response.message || "Login failed"
                );
            }

            tokenStorage.setTokens(
                response.data.accessToken,
                response.data.refreshToken
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message ||
                    "Login failed.";
                tokenStorage.clearTokens();
                throw new Error(message);
            }

            throw error;
        }
    },

    async register(
        data: RegisterRequest
    ): Promise<unknown> {
        const response = await apiClient.post<
            RegisterRequest,
            unknown
        >("/Auth/register", data);

        if (!response.success) {
            throw new Error(response.message || "Register failed");
        }

        return response.data;
    },

    async refresh(): Promise<LoginResponse> {
        const refreshToken = tokenStorage.getRefreshToken();

        if (!refreshToken) {
            throw new Error("Refresh token not found");
        }

        const data: RefreshTokenRequest = {
            refreshToken,
        };

        const response = await apiClient.post<
            RefreshTokenRequest,
            LoginResponse
        >("/Auth/refresh", data);

        if (!response.success || !response.data) {
            throw new Error(response.message || "Refresh token failed");
        }

        tokenStorage.setTokens(
            response.data.accessToken,
            response.data.refreshToken
        );

        return response.data;
    },

    async logout(): Promise<void> {
        const refreshToken = tokenStorage.getRefreshToken();

        if (refreshToken) {
            try {
                await apiClient.post<
                    RefreshTokenRequest,
                    boolean
                >("/Auth/logout", {
                    refreshToken,
                });
            } finally {
                tokenStorage.clearTokens();
            }
        } else {
            tokenStorage.clearTokens();
        }
    },

    isAuthenticated(): boolean {
        return !!tokenStorage.getAccessToken();
    },
};