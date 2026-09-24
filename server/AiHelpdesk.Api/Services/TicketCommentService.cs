using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using AutoMapper;

namespace AiHelpdesk.Api.Services
{
    public class TicketCommentCommentService : BaseService<TicketComment, CreateTicketCommentDTO, UpdateTicketCommentDTO, GetAllTicketCommentDTO, GetByIdTicketCommentDTO, FilterParamTicketComment>, ITicketCommentService
    {
        public TicketCommentCommentService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService) : base(context, mapper, currentUserService)
        {
        }
    }
}