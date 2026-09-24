using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;

namespace AiHelpdesk.Api.Services.Interfaces
{
    public interface IRoleService : IBaseService<Role, CreateRoleDTO, UpdateRoleDTO, GetAllRoleDTO, GetByIdRoleDTO, FilterParamRole>
    {
        
    }
}