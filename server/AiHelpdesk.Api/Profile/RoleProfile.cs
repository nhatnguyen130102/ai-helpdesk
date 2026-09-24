using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AutoMapper;

namespace AiHelpdesk.Api.RoleProfile
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<CreateRoleDTO, Role>();

            CreateMap<UpdateRoleDTO, Role>();

            CreateMap<Role, GetAllRoleDTO>();

            CreateMap<Role, GetByIdRoleDTO>();
        }
    }
}