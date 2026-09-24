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
    public class RoleService : BaseService<Role, CreateRoleDTO, UpdateRoleDTO, GetAllRoleDTO, GetByIdRoleDTO, FilterParamRole>, IRoleService
    {
        public RoleService(ApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        protected override IQueryable<Role> ApplyFilter(
            IQueryable<Role> query,
            FilterParamRole filter)
        {

            if (!string.IsNullOrWhiteSpace(filter.Keyword))
            {
                query = query.Where(x =>
                    x.Name.Contains(filter.Keyword));
            }

            if (filter.IsActive.HasValue)
            {
                query = query.Where(x =>
                x.IsActive == filter.IsActive.Value);
            }

            if (filter.FromDate.HasValue)
            {
                query = query.Where(x =>
                x.CreatedDate >= filter.FromDate.Value);
            }

            if (filter.ToDate.HasValue)
            {
                query = query.Where(x =>
                x.CreatedDate <= filter.ToDate.Value);
            }

            return query;
        }

    }
}