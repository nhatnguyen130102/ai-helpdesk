import api from "./axios";
import type { BaseResponse } from "./api-response";

export const apiClient = {
    async get<T>(
        url: string,
        params?: object
    ): Promise<BaseResponse<T>> {
        const response = await api.get<BaseResponse<T>>(url, {
            params,
        });

        return response.data;
    },

    async post<TRequest, TResponse>(
        url: string,
        data?: TRequest
    ): Promise<BaseResponse<TResponse>> {
        const response = await api.post<BaseResponse<TResponse>>(
            url,
            data
        );

        return response.data;
    },

    async put<TRequest, TResponse>(
        url: string,
        data: TRequest
    ): Promise<BaseResponse<TResponse>> {
        const response = await api.put<BaseResponse<TResponse>>(
            url,
            data
        );

        return response.data;
    },

    async delete<T>(
        url: string
    ): Promise<BaseResponse<T>> {
        const response = await api.delete<BaseResponse<T>>(url);

        return response.data;
    },
};