import type { BaseFilter } from "./common";

export interface CreateTicketDTO {
    Title: string,
    Category: string,
    Status: string,
    Priority: string,
    AssignedToId: number,
    CreatedById: number,
    Name: string,
    Description: string,
    IsActive: boolean,
}
export interface UpdateTicketDTO extends CreateTicketDTO {
    Id: number,
}
export interface GetAllTicketDTO extends UpdateTicketDTO {
    Code: string,
    CreatedDate: string,
    CretaedBy: string,
}
export interface GetByIdTicketDTO extends GetAllTicketDTO {
    UpdatedDate: string,
    UpdatedBy: string,
}
export interface FilterParamTicket extends BaseFilter {
    Category: string,
    Status: string,
    Priority: string,
    AssignedToId: number,
    CreatedById: number,
}

