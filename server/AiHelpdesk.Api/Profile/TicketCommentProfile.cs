using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AutoMapper;

namespace AiHelpdesk.Api.TicketCommentProfile
{
    public class TicketCommentProfile : Profile
    {
        public TicketCommentProfile()
        {
            CreateMap<CreateTicketCommentDTO, TicketComment>();

            CreateMap<UpdateTicketCommentDTO, TicketComment>();

            CreateMap<TicketComment, GetAllTicketCommentDTO>();

            CreateMap<TicketComment, GetByIdTicketCommentDTO>();
        }
    }
}