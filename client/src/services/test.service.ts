import { apiClient } from "./api/api-client";

export const testService = {
    getRoles: () =>
        apiClient.get<any[]>("/Role"),
};