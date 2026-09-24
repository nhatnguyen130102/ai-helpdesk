using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;

namespace AiHelpdesk.Api.Controllers
{
    public class RoleController : BaseController<
        Role,
        CreateRoleDTO,
        UpdateRoleDTO,
        GetAllRoleDTO,
        GetByIdRoleDTO,
        FilterParamRole>
    {
        public RoleController(IRoleService service) : base(service)
        {
        }
    }
}