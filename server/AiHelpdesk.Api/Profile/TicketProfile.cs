using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AutoMapper;

namespace AiHelpdesk.Api.TicketProfile
{
    public class TicketProfile : Profile
    {
        public TicketProfile()
        {
            CreateMap<CreateTicketDTO, Ticket>();

            CreateMap<UpdateTicketDTO, Ticket>();

            CreateMap<Ticket, GetAllTicketDTO>();

            CreateMap<Ticket, GetByIdTicketDTO>();
        }
    }
}