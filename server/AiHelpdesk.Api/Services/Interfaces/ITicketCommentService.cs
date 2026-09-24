using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;

namespace AiHelpdesk.Api.Services.Interfaces
{
    public interface ITicketCommentService : IBaseService<TicketComment, CreateTicketCommentDTO, UpdateTicketCommentDTO, GetAllTicketCommentDTO, GetByIdTicketCommentDTO, FilterParamTicketComment>
    {
        
    }
}