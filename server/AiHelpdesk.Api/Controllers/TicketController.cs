
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;

namespace AiHelpdesk.Api.Controllers;

public class TicketController : BaseController<
    Ticket,
    CreateTicketDTO,
    UpdateTicketDTO,
    GetAllTicketDTO,
    GetByIdTicketDTO,
    FilterParamTicket>
{
    public TicketController(
        ITicketService ticketService)
        : base(ticketService)
    {
    }
}