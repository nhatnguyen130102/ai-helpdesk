import type { GetAllTicketDTO, CreateTicketDTO, UpdateTicketDTO } from "../../types/ticket";
import { apiClient } from "../api/api-client";

export const ticketService = {
    getAll: () =>
        apiClient.get<GetAllTicketDTO[]>("/Ticket"),

    getById: (id: number) =>
        apiClient.get<GetAllTicketDTO>(`/Ticket/${id}`),

    create: (data: CreateTicketDTO) =>
        apiClient.post<CreateTicketDTO, GetAllTicketDTO>("/Ticket", data),

    update: (id: number, data: UpdateTicketDTO) =>
        apiClient.put<UpdateTicketDTO, GetAllTicketDTO>(`/Ticket/${id}`, data),

    delete: (id: number) =>
        apiClient.delete<boolean>(`/Ticket/${id}`),
};