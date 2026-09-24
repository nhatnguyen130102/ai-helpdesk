using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;

namespace AiHelpdesk.Api.Controllers
{
    public class TicketCommentController : BaseController<
    TicketComment,
    CreateTicketCommentDTO,
    UpdateTicketCommentDTO,
    GetAllTicketCommentDTO,
    GetByIdTicketCommentDTO,
    FilterParamTicketComment>
    {
        public TicketCommentController(
          ITicketCommentService ticketCommentService)
          : base(ticketCommentService)
        {
        }
    }
}