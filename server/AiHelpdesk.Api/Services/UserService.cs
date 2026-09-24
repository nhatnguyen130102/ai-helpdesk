using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AiHelpdesk.Api.Data;
using AiHelpdesk.Api.DTOs;
using AiHelpdesk.Api.Entities;
using AiHelpdesk.Api.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AiHelpdesk.Api.Services
{
    public class UserService
        : BaseService<User, CreateUserDTO, UpdateUserDTO, GetAllUserDTO, GetByIdUserDTO, FilterParamUser>, IUserService
    {
        public UserService(ApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService) : base(context, mapper, currentUserService)
        {
        }

        protected override IQueryable<User> ApplyFilter(
        IQueryable<User> query,
        FilterParamUser filter)
        {
            if (!string.IsNullOrWhiteSpace(filter.Email))
            {
                query = query.Where(x => x.Email.Contains(filter.Email));
            }

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                query = query.Where(x => x.Name.Contains(filter.Name));
            }

            if (!string.IsNullOrWhiteSpace(filter.FullName))
            {
                query = query.Where(x => x.FullName.Contains(filter.FullName));
            }

            if (!string.IsNullOrWhiteSpace(filter.PhoneNumber))
            {
                query = query.Where(x => x.Email.Contains(filter.PhoneNumber));
            }

            if (!string.IsNullOrWhiteSpace(filter.Keyword))
            {
                query = query.Where(x =>
                x.FullName.Contains(filter.Keyword) || x.Name.Contains(filter.Keyword));
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