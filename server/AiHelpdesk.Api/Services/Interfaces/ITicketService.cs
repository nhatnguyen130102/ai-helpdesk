using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;

namespace AiHelpdesk.Api.Services.Interfaces;

public interface ITicketService : IBaseService<Ticket, CreateTicketDTO, UpdateTicketDTO, GetAllTicketDTO, GetByIdTicketDTO, FilterParamTicket>
{
    Task<List<Ticket>> GetByStatusAsync(string status);

    Task<List<Ticket>> GetByPriorityAsync(string priority);

    Task<bool> AssignAsync(int ticketId, int userId);

    Task<bool> ChangeStatusAsync(int ticketId, string status);
}